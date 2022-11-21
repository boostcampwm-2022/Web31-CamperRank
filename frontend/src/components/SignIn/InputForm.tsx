import {IDInputContainer, InputFormContainer, PasswordInputContainer} from "../../styles/SignIn.style";
import React, {useCallback, useMemo, useState} from "react";

export const InputForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const requestURL = useMemo(() => import.meta.env.VITE_SERVER_URL + "/api/signin", []);

  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password
      })

    }).then(response => response.json());

  }, [id, password, requestURL]);

  return (
    <InputFormContainer>
      <p>로그인</p>
      <IDInputContainer>
        <p>아이디</p>
        <input type={"text"} onChange={handleIdChange}/>
      </IDInputContainer>
      <PasswordInputContainer>
        <p>비밀번호</p>
        <input type={"password"} onChange={handlePasswordChange}/>
      </PasswordInputContainer>
      <button type={"submit"} onSubmit={handleSubmit}>로그인</button>
    </InputFormContainer>
  );
}