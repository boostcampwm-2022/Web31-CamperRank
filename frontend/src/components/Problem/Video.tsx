import React, {useState} from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const UserVideo = styled.div`
  min-width: 15rem;
  height: 9rem;
  border: 3px inset;
  margin-right: 2rem;
  
  :last-child{
    margin-right: 0;
  }
`;

export const Video = () => {
  const [userList] = useState(["testuser1", "testuser2", "testuser3"]);

  return (
    <VideoContainer>
      {
        userList.map(() => (<UserVideo/>))
      }
    </VideoContainer>
  );
};
