import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {io} from "socket.io-client";

const VideoContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const UserVideoContainer = styled.video`
  width: 18rem;
  height: 9.75rem;
  border: 3px inset;
  margin-right: 2rem;
  z-index: 999;
  box-sizing: border-box;

  :last-child {
    margin-right: 0;
  }
`;

const Constraints = {
  video: {
    width: {
      min: 1920
    },
    height: {
      min: 1080
    }
  }
}

export const Video = () => {
  const [userList] = useState(["testuser1", "testuser2", "testuser3"]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    socket.emit("hello", {data: "hello, socket.io"});
  }, []);

  useEffect(() => {
    const openMediaDevices = async (constraints: MediaStreamConstraints) => {
      return await navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        videoRef.current!.srcObject = mediaStream;
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

  return (
    <VideoContainer>
      {userList.map((user, idx) => (
        <UserVideoContainer ref={videoRef} muted autoPlay playsInline key={idx}/>
      ))}
    </VideoContainer>
  );
};

// export interface UserMediaConstraints {
//   video: boolean;
//   audio: boolean;
// }

export interface UserVideoType {
  key: number;
}

export const UserVideo = ({key: idx}: UserVideoType) => {
  return (
    <UserVideoContainer>
      <div>123</div>
    </UserVideoContainer>
  );
};
