import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

const VideoContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const UserVideoContainer = styled.div`
  min-width: 15rem;
  height: 9rem;
  border: 3px inset;
  margin-right: 2rem;

  :last-child {
    margin-right: 0;
  }
`;

export const Video = () => {
  const [userList] = useState(["testuser1", "testuser2", "testuser3"]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    socket.emit("hello", { data: "hello, socket.io" });
  }, []);

  useEffect(() => {
    const openMediaDevices = async (constraints: UserMediaConstraints) => {
      return await navigator.mediaDevices.getUserMedia(constraints);
    };

    try {
      const stream = openMediaDevices({ video: true, audio: true });
      console.log("Got MediaStream:", stream);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }, []);

  return (
    <VideoContainer>
      {userList.map((user, idx) => (
        <UserVideo key={idx} />
      ))}
    </VideoContainer>
  );
};

export interface UserMediaConstraints {
  video: boolean;
  audio: boolean;
}

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
