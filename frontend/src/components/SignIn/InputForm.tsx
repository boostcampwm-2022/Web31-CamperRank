import {IDInputContainer, InputFormContainer, PasswordInputContainer} from "../../styles/SignIn.style";
import React, {useCallback, useState} from "react";
import * as events from "events";

export const InputForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    console.log(456);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(123);
  }, []);

  const handleSubmit = useCallback(() => {

  }, []);

  return (
    <InputFormContainer>
      <p>로그인</p>
      <IDInputContainer>
        <p>아이디</p>
        <input type={"text"}/>
      </IDInputContainer>
      <PasswordInputContainer>
        <p>비밀번호</p>
        <input type={"password"}/>
      </PasswordInputContainer>
      <button type={"submit"} onSubmit={handleSubmit}>로그인</button>
    </InputFormContainer>
  );
}