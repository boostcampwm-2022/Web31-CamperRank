import styled from "styled-components";
import {ReactComponent as Copy} from "../../assets/copy-icon.svg";
import {useCallback, useRef} from "react";

interface props {
  isShowing: boolean
}

const Wrapper = styled.div`
  position: absolute;
  left: 4rem;
  transform: translateY(-100%);
  background-color: rgb(255, 255, 255);
  width: 40rem;
  height: 6rem;
  z-index: 99;
  border: 1px solid;
  border-radius: 8px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  p {
    margin: 0.5rem 1rem;
    font-weight: 600;
    font-family: Noto Sans KR, sans-serif;
    font-size: 1rem;
  }
`;

const URLWrapper = styled.div`
  width: 40rem;
  margin-left: 1rem;
  height: calc(100% - 37px);
  display: flex;
  justify-content: space-between;
`;

const URLContainer = styled.div`
  width: 85%;
  height: 75%;
  border: 0;
  border-radius: 16px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  display: flex;
  align-items: center;
  font-weight: 500;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const CopyButton = styled.button`
  margin-right: 2rem;
  width: 8%;
  height: 80%;
  cursor: pointer;
  background: #ffffff;
  border: 2px solid #33C363;
  box-shadow: 0px 8px 24px rgb(51 195 99 / 50%);
  border-radius: 4px;
  padding-top: 0.25rem;

  :active {
    background: #DBF6E4;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
  
  :hover {
    background: #DBF6E4;
  }
`;

export const InviteModal = ({isShowing}: props) => {
  const url = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(()=>{
    navigator.clipboard.writeText(url.current!.innerText);
  }, [url.current]);

  return isShowing ? (
    <Wrapper>
      <p>초대 URL</p>
      <URLWrapper>
        <URLContainer ref={url}>
          {`${window.location.href}`}
        </URLContainer>
        <CopyButton onClick={handleCopy}>
          <Copy width={"2rem"}/>
        </CopyButton>
      </URLWrapper>
    </Wrapper>
  ) : null;
}