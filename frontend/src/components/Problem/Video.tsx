import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { Peer } from "peerjs";
import { useParams } from "react-router-dom";

const VideoContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const UserVideoContainer = styled.video`
  min-width: 16rem;
  min-height: 9rem;
  max-width: 16rem;
  max-height: 9rem;
  border: 3px inset;
  margin-right: 2rem;
  box-sizing: border-box;

  :last-child {
    margin-right: 0;
  }
`;

const Constraints = {
  video: {
    width: {
      exact: 1280,
    },
    height: {
      exact: 720,
    },
  },
};

export const Video = () => {
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { roomNumber } = useParams();

  const myPeer = useMemo(() => new Peer(), []);
  const peers: any = useMemo(() => {
    return {};
  }, []);
  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_SERVER_URL), []);

  // function connectToNewUser(userId, stream) {
  //   const call = myPeer.call(userId, stream);
  //   const video = document.createElement("video");
  //   call.on("stream", (userVideoStream) => {
  //     addVideoStream(video, userVideoStream);
  //   });
  //   call.on("close", () => {
  //     video.remove();
  //   });
  //
  //   peers[userId] = call;
  // }

  // function addVideoStream(video, stream) {
  //   video.srcObject = stream;
  //   video.addEventListener("loadedmetadata", () => {
  //     video.play();
  //   });
  //   videoGrid.append(video);
  // }

  useEffect(() => {
    const openMediaDevices = async (constraints: MediaStreamConstraints) => {
      return await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current!.srcObject = mediaStream;
          }
          setMyStream(mediaStream);

          myPeer.on("call", (call) => {
            call.answer(mediaStream);
            // const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
              // addVideoStream(video, userVideoStream);
            });
          });

          socket.on("user-connected", (userId) => {
            // connectToNewUser(userId, mediaStream);
          });
        });
    };

    try {
      const stream = openMediaDevices(Constraints);
      console.log("Got MediaStream:", stream);
    } catch (error) {
      // alert('비디오를 불러오는 데 문제가 생겼습니다. 다시 접속해주세요');
      console.error("Error accessing media devices.", error);
    }
  }, []);

  useEffect(() => {
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });

    myPeer.on("open", (id) => {
      console.log("voice chat on!");
      socket.emit("join-room", roomNumber, id);
    });
  }, []);

  return (
    <VideoContainer>
      <UserVideoContainer ref={videoRef} autoPlay playsInline />
      {/*{userList.map((user, idx) => (*/}
      {/*  <UserVideoContainer autoPlay playsInline key={idx} />*/}
      {/*))}*/}
    </VideoContainer>
  );
};

export interface UserVideoType {
  key: number;
}

export const UserVideo = ({ key: idx }: UserVideoType) => {
  return (
    <UserVideoContainer>
      <div>123</div>
    </UserVideoContainer>
  );
};
