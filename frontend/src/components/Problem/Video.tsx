import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { Peer } from 'peerjs';
import { useNavigate, useParams } from 'react-router-dom';

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
  box-sizing: border-box;

  :last-child {
    margin-right: 0;
  }
`;

const DivWrapper = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 0.6rem;
  bottom: 0.9rem;
`;

const ControllButton = styled.div`
  cursor: pointer;
  width: 100%;
  display: block;
  font-size: 1rem;
  text-align: center;

  & + & {
    margin-top: 3px;
  }

  z-index: 2;
`;

//pointer-events:none;
const Text = styled.div`
  font-size: 0.8rem;
  color: #777777;
  position: absolute;
  bottom: -1rem;
  left: 0;
  text-align: center;
  width: 100%;
`

type ConstraintsType = {
  audio?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  video?: boolean | Object;
};

const videoSize = {
  width: {
    ideal: 1280,
  },
  height: {
    ideal: 720,
  },
};

const Constraints: ConstraintsType = {
  video: videoSize,
  audio: true,
};

export const Video = () => {
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { roomNumber } = useParams();
  const [myID, setMyID] = useState("");
  const [peers, setPeers] = useState<any>({});
  const [videoOn, setVideoOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [text, setText] = useState('');
  const [btnWork, setBtnWork] = useState(false);
  const peerVideosRef = useRef<Array<HTMLVideoElement>>([]);
  const navigate = useNavigate();

  const myPeer = useMemo(() => new Peer(), []);
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SOCKET_SERVER_URL, {
        secure: process.env.NODE_ENV !== "development",
      }),
    []
  );

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(Constraints).then((mediaStream) => {
      setVideoOn(true);
      setMicOn(true);
      setMyStream(mediaStream);
    });
  }, []);

  //call 받은 피어
  const callCallback = useCallback(
    (call: any) => {
      console.log(`callCallback`);
      console.log(`callerID: ${call.peer}`);
      call.answer(myStream); //송신자에게 stream 전달
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

  //기존 접속한 peer 여기로
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
    myPeer.on("open", (id) => {
      setMyID(id);
      console.log("roomnumber, id", roomNumber, id);
      socket.emit("join-room", roomNumber, id);
    });
  }, []);

  //video remoteStream
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

  const setTimeoutText = (text: string) => {
    setText(text);
    setTimeout(() => setText(""), 1500);
  };

  const sendStream = (updateConstraints: ConstraintsType) => {
    navigator.mediaDevices.getUserMedia(updateConstraints)
    .then((mediaStream) => {
      Object.keys(peers).forEach(elem => {
        myPeer.call(elem, mediaStream);
      })
      setMyStream(mediaStream);
    })
    .catch(err => {
      setMyStream(undefined)
      if (!myStream) return;
      Object.keys(peers).forEach(elem => {
        myPeer.call(elem, myStream);
      })
    })
    .finally(() => {
      setTimeout(() => {
        setBtnWork(false);
      }, 2000);
    })
  }

  const handleCameraButton = () => {
    if (btnWork) {
      setTimeoutText('잠시 기다려주세요');
      return;
    }
    setBtnWork(true);
    let updateConstraints: ConstraintsType = {};
    updateConstraints.video = !videoOn ? videoSize : false;
    updateConstraints.audio = micOn;
    setTimeoutText(`카메라 ${!videoOn ? 'ON' : 'OFF'}`)
    setVideoOn(!videoOn);
    sendStream(updateConstraints);
  }

  const handleMicButton = () => {
    if (btnWork) {
      setTimeoutText('잠시 기다려주세요');
      return;
    }
    setBtnWork(true);
    let updateConstraints: ConstraintsType = {};
    updateConstraints.video = videoOn ? videoSize : false;
    updateConstraints.audio = !micOn;
    setTimeoutText(`마이크 ${!micOn ? "ON" : "OFF"}`);
    setMicOn(!micOn);
    sendStream(updateConstraints);
  }

  return (
    <VideoContainer>
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
      <DivWrapper>
        <UserVideoContainer ref={videoRef} autoPlay muted playsInline />
        <ButtonContainer>
          <ControllButton onClick={handleMicButton}>
            {micOn ? "🔊" : "🔇"}
          </ControllButton>
          <ControllButton onClick={handleCameraButton}>
            {!videoOn ? "🔴" : "⬛️"}
          </ControllButton>
        </ButtonContainer>
        <Text>{text}</Text>
      </DivWrapper>
    </VideoContainer>
  );
};
