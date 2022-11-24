import {IDInputContainer, InputFormContainer, PasswordInputContainer} from "../../styles/SignIn.style";
import React, {useCallback, useMemo, useState, useRef} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../../recoils/userState";

export const InputForm = () => {
  const [isLoading, setLoading] = useState(false);
  const id = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const requestURL = useMemo(() => import.meta.env.VITE_SERVER_URL + "/auth/signin", []);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  let {state} = useLocation();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    state = state ?? -1;
    console.log(state);
    setLoading(true);
    fetch(requestURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: id.current!.value,
        password: password.current!.value
      })
    }).then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.msg === 'success') {
          localStorage.setItem('camperRankToken', data.accessToken);
          setUser({
            token: data.accessToken,
            isLoggedIn: true,
            ID: data.userId
          });
          navigate(state);
          return;
        }
        alert('로그인에 실패하였습니다.');
      }).catch((e) => {
      setLoading(false);
      console.log(e);
    });
  }, [id, password, requestURL]);

  return (
    <InputFormContainer onSubmit={handleSubmit}>
      <p>로그인</p>
      <IDInputContainer>
        <p>아이디</p>
        <input type={"text"} ref={id}/>
      </IDInputContainer>
      <PasswordInputContainer>
        <p>비밀번호</p>
        <input type={"password"} ref={password}/>
      </PasswordInputContainer>
      {isLoading ? <span>sending...</span> : <button type={"submit"}>로그인</button>}
    </InputFormContainer>
  );
}