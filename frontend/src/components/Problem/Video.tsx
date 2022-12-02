import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {io} from "socket.io-client";

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
      exact: 1280
    },
    height: {
      exact: 720
    }
  },
  audio: true
}

export const Video = () => {
  const [userList, addUser] = useState([]);
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
      <UserVideoContainer ref={videoRef} muted autoPlay playsInline/>
      {userList.map((user, idx) => (
        <UserVideoContainer autoPlay playsInline key={idx}/>
      ))}
    </VideoContainer>
  );
};

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
