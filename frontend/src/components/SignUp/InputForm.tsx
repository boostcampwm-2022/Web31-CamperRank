import {
  ButtonContainer,
  CheckButton,
  IDInputContainer,
  InputFormContainer,
  PasswordInputContainer
} from "../../styles/SignUp.style";

export const InputForm = () => {
  return (
    <InputFormContainer>
      <p>회원가입</p>
      <IDInputContainer>
        <p>아이디</p>
        <input type={"text"}/>
        <CheckButton type={"button"}>중복확인</CheckButton>
      </IDInputContainer>
      <PasswordInputContainer>
        <p>비밀번호</p>
        <input type={"password"}/>
      </PasswordInputContainer>
      <PasswordInputContainer>
        <p>비밀번호 확인</p>
        <input type={"password"}/>
      </PasswordInputContainer>
      <ButtonContainer>
        <button type={"submit"}>초기화</button>
        <button type={"submit"}>회원가입</button>
      </ButtonContainer>
    </InputFormContainer>
  );
}