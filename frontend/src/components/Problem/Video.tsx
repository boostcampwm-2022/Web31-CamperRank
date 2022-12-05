import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { Peer } from "peerjs";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();

  const myPeer = useMemo(() => new Peer(), []);
  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_SERVER_URL), []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(Constraints).then((mediaStream) => {
      setMyStream(mediaStream);
    });
  }, []);

  const callCallback = useCallback(
    (call: any) => {
      console.log(`callCallback`);
      console.log(`callerID: ${call.peer}`);
      call.answer(myStream);
      call.on("stream", () => {
        setPeers({
          ...peers,
          ...{
            [call.peer]: call,
          },
        });
      });
      call.on("close", () => {
        console.log("call close rcv");
        console.log(`closeID: ${call.peer}`);
      });
    },
    [myStream, peers]
  );

  const connectCallback = useCallback(
    (userId: string) => {
      console.log(`connectCallback`);
      console.log(`newUserID: ${userId}`);
      if (!myStream) {
        return;
      }
      const call = myPeer.call(userId, myStream);
      call.on("stream", () => {
        setPeers({
          ...peers,
          ...{
            [userId]: call,
          },
        });
      });

      call.on("close", () => {
        console.log("call close rcv");
        console.log(`closeID: ${userId}`);
      });
    },
    [myStream, peers]
  );

  const disconnectCallback = useCallback(
    (userId: string) => {
      console.log("disconnectCallback");
      console.log(`disconnID: ${userId}`);
      if (!peers[userId]) {
        return;
      }
      peers[userId].close();
      const temp = { ...peers };
      delete temp[userId];
      setPeers(temp);
    },
    [peers]
  );

  useEffect(() => {
    if (!myStream) {
      return;
    }
    if (videoRef.current) {
      videoRef.current!.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (!myStream) {
      return;
    }
    myPeer.on("call", callCallback);
    socket.on("user-connected", connectCallback);
    return () => {
      myPeer.off("call", callCallback);
      socket.off("user-connected", connectCallback);
    };
  }, [myStream, callCallback]); //내부도 해제해야 하는지 확인 필요

  useEffect(() => {
    socket.on("user-disconnected", disconnectCallback);
    return () => {
      socket.off("user-disconnected", disconnectCallback);
    };
  }, [disconnectCallback]);

  useEffect(() => {
    console.log(myPeer);
    myPeer.on("open", (id) => {
      setMyID(id);
      console.log(roomNumber);
      socket.emit("join-room", roomNumber, id);
      console.log(`myID: ${id}`);
    });
  }, []);

  useEffect(() => {
    Object.values(peers).forEach((call, idx) => {
      // @ts-ignore
      peerVideosRef.current[idx].srcObject = call.remoteStream;
    });
  }, [peers]);

  useEffect(() => {
    socket.on("full", () => {
      alert("방이 꽉 찼습니다.");
      navigate("/");
    });
  }, []);

  useEffect(() => {
    return () => {
      myPeer.destroy();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      myStream?.getTracks().forEach((ele) => ele.stop());
    };
  }, [myStream]);

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
