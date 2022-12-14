import { useEffect, useRef, useState } from 'react';
import {
  AnchorLogo,
  ButtonContainer,
  CheckButton,
  GreenMark,
  IDInputContainer,
  InputFormContainer,
  LightContainer,
  PasswordInputContainer,
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
    if (!isIdRight || !idCheck) alert('???????????? ?????????????????????');
    else if (!isPwRight) alert('??????????????? ?????? ??????????????????');
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
          alert('??????????????? ?????????????????????. ????????? ???????????? ???????????????.');
          navigate('/signin');
        })
        .catch(() => {
          alert('??????????????? ?????????????????????');
          navigate('');
        });
    }
  };
  const handleIdCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!idValid(id.value)) alert('????????? ???????????? ??????????????????');
    else {
      fetch(`${URL}/users?loginId=${id.value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.foundStatus === 1000) {
            throw new Error();
          } else if (res.foundStatus === 1001) {
            alert('???????????? ???????????? ??? ????????????');
            setIdCheck(true);
            setCheckedId(id.value);
            if (pwRef.current) pwRef.current.focus();
          }
        })
        .catch((err) => {
          alert('???????????? ???????????? ??? ????????????');
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
          <p>?????????</p>
          <input
            type={'text'}
            placeholder={'??????/?????? 6??? ??????'}
            {...id}
            ref={idRef}
            onKeyPress={(e) => {
              handleKeyPress(e, pwRef);
            }}
          />
          <LightContainer style={{ marginRight: '8rem' }}>
            {isIdRight ? '????' : '????'}
          </LightContainer>
          <CheckButton type={'button'} onClick={handleIdCheck}>
            ????????????
          </CheckButton>
        </IDInputContainer>
        <PasswordInputContainer>
          <p>????????????</p>
          <input
            type={'password'}
            placeholder={'??????/??????/???????????? 8??? ??????'}
            {...pw}
            ref={pwRef}
            onKeyPress={(e) => {
              handleKeyPress(e, pwCheckRef);
            }}
          />
          <LightContainer>{isPwRight ? '????' : '????'}</LightContainer>
        </PasswordInputContainer>
        <PasswordInputContainer>
          <p>???????????? ??????</p>
          <input
            type={'password'}
            placeholder={'??????/??????/???????????? 8??? ??????'}
            {...pwCheck}
            ref={pwCheckRef}
          />
          <LightContainer>{isPwRight ? '????' : '????'}</LightContainer>
        </PasswordInputContainer>
        <ButtonContainer>
          <button type={'reset'} onClick={handleClear}>
            ?????????
          </button>
          <button type={'submit'} onClick={handleSubmit}>
            ????????????
          </button>
        </ButtonContainer>
      </InputFormContainer>
    </>
  );
};
