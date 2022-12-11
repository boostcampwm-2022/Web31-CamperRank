import { useEffect, useRef, useState } from 'react';
import {
  ButtonContainer,
  CheckButton,
  IDInputContainer,
  InputFormContainer,
  LightContainer,
  PasswordInputContainer,
  AnchorLogo,
  GreenMark,
} from '../../styles/SignUp.style';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';

const URL = import.meta.env.VITE_SERVER_URL;

export const SignupInputForm = () => {
  const id = useInput('');
  const pw = useInput('');
  const pwCheck = useInput('');
  const [isIdRight, setIdRight] = useState(false);
  const [isPwRight, setPwRight] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [checkedId, setCheckedId] = useState('');
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { value } = id;
    if (idValid(value) && idCheck && checkedId === id.value) {
      setIdRight(true);
    } else setIdRight(false);
  }, [id]);

  useEffect(() => {
    const { value } = pw;
    if (pwValid(value)) setPwRight(true);
  }, [pw]);

  useEffect(() => {
    const { value } = pwCheck;
    if (!pwValid(value) || value === '' || value !== pw.value)
      setPwRight(false);
    else setPwRight(true);
  });

  const idValid = (str: string) => {
    return /\w{6,20}/g.test(str);
  };

  const pwValid = (str: string) => {
    // eslint-disable-next-line no-useless-escape
    return /[\w\[\]\/?.,;:|*~`!^\-_+<>@$%&\\]{8,}/g.test(str);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLElement>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && ref.current) {
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
    setIdCheck(false);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isIdRight || !idCheck) alert('아이디를 확인해해주세요');
    else if (!isPwRight) alert('비밀번호를 다시 입력해주세요');
    else {
      //useFetch
      fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: id.value,
          password: pw.value,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === 400) throw new Error();
          alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
          navigate('/signin');
        })
        .catch(() => {
          alert('회원가입에 실패하였습니다');
          navigate('');
        });
    }
  };
  const handleIdCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!idValid(id.value)) alert('올바른 아이디를 입력해주세요');
    else {
      fetch(`${URL}/users?loginId=${id.value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode !== 404) throw new Error();
          alert('아이디를 사용하실 수 있습니다');
          setIdCheck(true);
          setCheckedId(id.value);
          if (pwRef.current) pwRef.current.focus();
        })
        .catch((err) => {
          alert('아이디를 사용하실 수 없습니다');
          setIdCheck(false);
          setIdRight(false);
        });
    }
  };
  return (
    <>
      <AnchorLogo to={'/'}>
        Signup for
        <br />
        Camper<GreenMark>Rank</GreenMark>
      </AnchorLogo>
      <InputFormContainer>
        <IDInputContainer>
          <p>아이디</p>
          <input
            type={'text'}
            placeholder={'영어/숫자 6자 이상'}
            {...id}
            ref={idRef}
            onKeyPress={(e) => {
              handleKeyPress(e, pwRef);
            }}
          />
          <LightContainer style={{ marginRight: '8rem' }}>
            {isIdRight ? '🔴' : '🟢'}
          </LightContainer>
          <CheckButton type={'button'} onClick={handleIdCheck}>
            중복확인
          </CheckButton>
        </IDInputContainer>
        <PasswordInputContainer>
          <p>비밀번호</p>
          <input
            type={'password'}
            placeholder={'영어/숫자/특수문자 8자 이상'}
            {...pw}
            ref={pwRef}
            onKeyPress={(e) => {
              handleKeyPress(e, pwCheckRef);
            }}
          />
          <LightContainer>{isPwRight ? '🔴' : '🟢'}</LightContainer>
        </PasswordInputContainer>
        <PasswordInputContainer>
          <p>비밀번호 확인</p>
          <input
            type={'password'}
            placeholder={'영어/숫자/특수문자 8자 이상'}
            {...pwCheck}
            ref={pwCheckRef}
          />
          <LightContainer>{isPwRight ? '🔴' : '🟢'}</LightContainer>
        </PasswordInputContainer>
        <ButtonContainer>
          <button type={'reset'} onClick={handleClear}>
            초기화
          </button>
          <button type={'submit'} onClick={handleSubmit}>
            회원가입
          </button>
        </ButtonContainer>
      </InputFormContainer>
    </>
  );
};
