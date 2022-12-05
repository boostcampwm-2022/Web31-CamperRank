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
      ideal: 1280,
    },
    height: {
      ideal: 720,
    },
  },
  audio: true,
};

export const Video = () => {
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { roomNumber } = useParams();
  const [myID, setMyID] = useState("");
  const [peers, setPeers] = useState<any>({});
  const peerVideosRef = useRef<Array<HTMLVideoElement>>([]);

  const myPeer = useMemo(() => new Peer(), []);
  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_SERVER_URL), []);

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
            //추가
            call.on("stream", (userVideoStream) => {
              setPeers({
                ...peers,
                ...{
                  [call.peer]: call,
                },
              });
            });
          });

          socket.on("user-connected", (userId) => {
            //추가
            const call = myPeer.call(userId, mediaStream);
            // const newIDX = Object.keys(peers).length;
            // const newVideoRef = peerVideosRef.current[newIDX];
            call.on("stream", (userVideoStream) => {
              setPeers({
                ...peers,
                ...{
                  [userId]: call,
                },
              });
            });
            call.on("close", () => {
              //삭제
              // // @ts-ignore
              // peerVideosRef.current = Object.values(peers).filter(
              //   // @ts-ignore
              //   (call) => call.peer !== userId
              // );
            });
          });
        });
    };

    try {
      const stream = openMediaDevices(Constraints);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        if (videoRef.current.srcObject) {
          if ("getTracks" in videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(function (track) {
              track.stop();
            });
          }
          videoRef.current.srcObject = null;
        }
      }
      socket.disconnect();
    };
  }, [videoRef]);

  useEffect(() => {
    socket.on("user-disconnected", (userId) => {
      if (!peers.hasOwnProperty(userId)) {
        return;
      }
      peers[userId].close();
      delete peers[userId];
      setPeers(peers);
    });

    myPeer.on("open", (id) => {
      setMyID(id);
      socket.emit("join-room", roomNumber, id);
    });
  }, []);

  useEffect(() => {
    Object.values(peers).forEach((call, idx) => {
      // @ts-ignore
      peerVideosRef.current[idx].srcObject = call.remoteStream;
    });
  }, [peers]);

  return (
    <VideoContainer>
      <UserVideoContainer ref={videoRef} autoPlay muted playsInline />
      {Object.entries(peers).map((user, idx) => (
        <UserVideoContainer
          autoPlay
          playsInline
          ref={(ele) => {
            if (ele) {
              peerVideosRef.current[idx] = ele;
            }
          }}
          key={idx}
        />
      ))}
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
