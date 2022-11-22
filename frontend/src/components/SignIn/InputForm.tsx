import {IDInputContainer, InputFormContainer, PasswordInputContainer} from "../../styles/SignIn.style";
import React, {useCallback, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

export const InputForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const requestURL = useMemo(() => import.meta.env.VITE_SERVER_URL + "/api/signin", []);
  const navigate = useNavigate();

  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(requestURL);
    fetch(requestURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password
      })
    }).then(res => {
      if (res.ok) {
        navigate('/');
      } else {
        res.json().then(data => {
          alert("로그인에 실패하였습니다.");
        })
      }
    })
  }, [id, password, requestURL]);

  return (
    <InputFormContainer onSubmit={handleSubmit}>
      <p>로그인</p>
      <IDInputContainer>
        <p>아이디</p>
        <input type={"text"} onChange={handleIdChange}/>
      </IDInputContainer>
      <PasswordInputContainer>
        <p>비밀번호</p>
        <input type={"password"} onChange={handlePasswordChange}/>
      </PasswordInputContainer>
      <button type={"submit"}>로그인</button>
    </InputFormContainer>
  );
}