import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import * as SimplePeer from "simple-peer";
import * as process from "process";
global.process = process;

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
  const [userList, setUserList] = useState([]);
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<
    string | SimplePeer.SignalData
  >("");
  const [callAccepted, setCallAccepted] = useState(false);

  const partnerVideo = useRef<HTMLVideoElement>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_SERVER_URL);

    const openMediaDevices = async (constraints: MediaStreamConstraints) => {
      return await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current!.srcObject = mediaStream;
          }
          setMyStream(mediaStream);

          socket.current.on("yourID", (id: string, users: any) => {
            console.log(1);
            setYourID(id);
            for (let socketID in users) {
              if (id === socketID) {
                continue;
              }
              callPeer(socketID);
            }
            setUsers(users);
          });
          socket.current.on("allUsers", (newUsers: any) => {
            console.log(2);
            setUsers(users);
          });

          socket.current.on("hey", (data: any) => {
            console.log(3);
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
            acceptCall();
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

  function callPeer(id: string) {
    const peer = new SimplePeer(/*{
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: myStream,
    }*/);

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on(
      "callAccepted",
      (signal: string | SimplePeer.SignalData) => {
        setCallAccepted(true);
        peer.signal(signal);
      }
    );
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current!.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <UserVideoContainer playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  return (
    <VideoContainer>
      {PartnerVideo}
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
