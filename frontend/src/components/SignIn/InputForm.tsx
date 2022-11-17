import {IDInputContainer, InputFormContainer, PasswordInputContainer} from "../../styles/SignIn.style";

export const InputForm = () => {
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
      <button type={"submit"}>로그인</button>
    </InputFormContainer>
  );
}