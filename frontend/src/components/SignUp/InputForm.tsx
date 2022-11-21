import { useState, useRef, useEffect, isValidElement } from "react";
import {
  ButtonContainer,
  CheckButton,
  IDInputContainer,
  InputFormContainer,
  PasswordInputContainer,
  LightContainer,
} from "../../styles/SignUp.style";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";

export const InputForm = () => {
  const id = useInput("");
  const pw = useInput("");
  const pwCheck = useInput("");
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const [isIdRight, setIdRight] = useState(false);
  const [isPwRight, setPwRight] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const navigate = useNavigate();
  const idValid = (str: string) => {
    return /[a-z0-9]{6,}/g.test(str);
  };
  const pwValid = (str: string) => {
    return /[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}/g.test(
      str
    );
  };
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && ref.current) {
      e.preventDefault();
      ref.current.focus();
    }
  };
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    id.onReset();
    pw.onReset();
    pwCheck.onReset();
    setIdRight(false);
    setPwRight(false);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!idValid(id.value)) {
      alert("아이디를 다시 입력해주세요");
      setIdRight(false);
    } else if (!idCheck) {
      alert("아이디의 중복을 확인해주세요");
    } else if (!pwValid(pw.value) || pw.value !== pwCheck.value) {
      alert("비밀번호를 다시 입력해주세요");
      setIdRight(true);
      setPwRight(false);
    } else {
      setIdRight(true);
      setPwRight(true);
      //http://localhost:3000/api/users
      fetch("ip:port", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId: id,
          password: pw,
        }),
      })
        .then((response) => {
          alert("로그인페이지로 이동합니다");
          navigate("/signin");
        })
        .catch(() => {
          alert("회원가입에 실패하였습니다");
          navigate("");
        });
    }
  };
  const handleIdCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!id.value) alert("아이디를 입력해주세요");
    else {
      fetch(`ip:port/users?userId=${id.value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200) {
            alert("아이디를 사용하실 수 있습니다");
            setIdRight(true);
            setIdCheck(true);
          } else alert("아이디를 사용하실 수 없습니다");
        });
    }
  };
  return (
    <InputFormContainer>
      <p>회원가입</p>
      <IDInputContainer>
        <p>아이디</p>
        <input
          type={"text"}
          placeholder={"영어/숫자 6자 이상"}
          {...id}
          ref={idRef}
          onKeyPress={(e) => {
            handleKeyPress(e, pwRef);
          }}
        />
        <LightContainer style={{ marginRight: "8rem" }}>
          {isIdRight ? "🔴" : "🟢"}
        </LightContainer>
        <CheckButton type={"button"} onClick={handleIdCheck}>
          중복확인
        </CheckButton>
      </IDInputContainer>
      <PasswordInputContainer>
        <p>비밀번호</p>
        <input
          type={"password"}
          placeholder={"영어/숫자/특수문자 8자 이상"}
          {...pw}
          ref={pwRef}
          onKeyPress={(e) => {
            handleKeyPress(e, pwCheckRef);
          }}
        />
        <LightContainer>{isPwRight ? "🔴" : "🟢"}</LightContainer>
      </PasswordInputContainer>
      <PasswordInputContainer>
        <p>비밀번호 확인</p>
        <input
          type={"password"}
          placeholder={"영어/숫자/특수문자 8자 이상"}
          {...pwCheck}
          ref={pwCheckRef}
        />
        <LightContainer>{isPwRight ? "🔴" : "🟢"}</LightContainer>
      </PasswordInputContainer>
      <ButtonContainer>
        <button type={"reset"} onClick={handleClear}>
          초기화
        </button>
        <button type={"submit"} onClick={handleSubmit}>
          회원가입
        </button>
      </ButtonContainer>
    </InputFormContainer>
  );
};
