import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { editorState } from '../../recoils';
import { useRecoilState } from 'recoil';
import { SelectButton } from '../../assets/icons';
// import { useParams } from 'react-router-dom';

type SelectorProp = {
  onClickModalElement: (str: string) => void;
};

type ModalProp = {
  onClickElement: (str: string) => void;
  onClickModalElement: (str: string) => void;
};

const SelectorWrapper = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 5rem;
  height: 1.3rem;
  border: 2px solid #cbcbcb;
  border-radius: 0.3rem;
  background: #fff;
  text-align: center;
  font-size: 0.7rem;
  line-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  cursor: pointer;

  &:hover {
    border: 2px solid #ababab;
  }
`;

const ModalButton = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  position: relative;
`;

const ModalWrapper = styled.div`
  width: 5rem;
  height: fit-content;
  position: absolute;
  top: 1.2rem;
  border: 2px solid #cbcbcb;
  background: rgba(256, 256, 256, 0.8);
  border-radius: 0.3rem;
  z-index: 1;
`;

const ModalElement = styled.div`
  font-size: 0.7rem;
  cursor: pointer;
  width: 100%;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  &:hover {
    background: rgba(240, 240, 240, 0.8);
  }
`;

const Modal = ({ onClickElement, onClickModalElement }: ModalProp) => {
  const handleClickElement = (str: string) => {
    onClickModalElement(str);
    onClickElement(str);
  };
  return (
    <>
      <ModalWrapper>
        <ModalElement onClick={() => handleClickElement('JavaScript')}>
          JavaScript
        </ModalElement>
        <ModalElement onClick={() => handleClickElement('Python')}>
          Python
        </ModalElement>
      </ModalWrapper>
    </>
  );
};

const LanguageSelector = ({ onClickModalElement }: SelectorProp) => {
  const [editor, setEditor] = useRecoilState(editorState);
  const [open, setOpen] = useState(false);
  //const [socket] = useRecoilState(socketState);
  const selectorRef = useRef<HTMLDivElement>(null);
  // const { version } = useParams();
  // const [isMultiVersion] = useState(version === 'multi');
  // const { roomNumber } = isMultiVersion ? useParams() : { roomNumber: null };
  const [language, setLanguage] = useState(editor.language);
  const handleClickOutside = ({ target }: any) => {
    if (!selectorRef.current || !selectorRef.current.contains(target)) {
      setOpen(false);
    }
  };

  const handleClickWrapper = () => setOpen(!open);

  const handleModalElement = (language: string) => {
    // if (socket) {
    //   socket.emit(
    //     'change-language',
    //     roomNumber,
    //     JSON.stringify(editor),
    //     language,
    //   );
    // }
    setEditor({ ...editor, language });
  };

  useEffect(() => {
    setLanguage(editor.language);
  }, [editor]);

  // const saveCode = (code: string, language: string) => {
  //   localStorage.setItem(language, code);
  // };

  // const changeLanguageCallback = (code: string, lang: string) => {
  //   if (!code) return;
  //   const { text, language } = JSON.parse(code);
  //   saveCode(text, language);
  //   setEditor({ ...editor, language: lang });
  // };

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on('change-language', changeLanguageCallback);
  //   return () => {
  //     socket.off('change-language', changeLanguageCallback);
  //   };
  // }, [socket]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <SelectorWrapper ref={selectorRef} onClick={handleClickWrapper}>
      {language ? language : 'Language'}
      <ModalButton src={SelectButton} alt={'언어 설정 드롭다운 이미지'} />
      {open && (
        <Modal
          onClickElement={handleModalElement}
          onClickModalElement={onClickModalElement}
        />
      )}
    </SelectorWrapper>
  );
};

export default LanguageSelector;
