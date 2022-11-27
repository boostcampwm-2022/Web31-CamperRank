import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import ReservedWords from "../../utils/ReservedWords";

const EditorWrapper = styled.div`
  display: flex;
  height: calc(100% - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`

const Code = styled.div`
  width: 95%;
  padding: 0.3rem;
  font-size: 0.9rem;
  outline: none;
  min-height: 100%;
  height: fit-content;
  border: 2px double #888888;
  border-radius: 3px;
`;

const CodeEditor = styled(Code)`
  &:focus {
    border: 2px double #888888;
  }
  z-index: 1;
  opacity: 0.5;
`

const CodePrinter = styled(Code)`
  font-weight: 500;
  position: absolute;
  right: 0;
  span {
    color: red;
  }
`

const Title = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.5rem;
  margin-left: 1rem;
`;

const LineWrapper = styled.div`
  flex-grow: 1;
  padding-top: 0.4rem;
  text-align: right;
  p {
    font-size: 0.9rem;
    color: #888888;
    margin-right: 0.5rem;
  }
`

const Editor = () => {
  const [code, setCode] = useState('');
  const [line, setLine] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const printerRef = useRef<HTMLDivElement>(null);
  const countEscape = (str: string) => {
    let count = 0;
    let hasChar = false;
    for (let char of str) {
      if (char === '\n') count++;
      else hasChar = true;
    }
    if (hasChar) count++;
    return count;
  }
  
  useEffect(() => {
    if (code === '') {
      if (printerRef && printerRef.current) {
        printerRef.current.innerHTML = '';
      }
    }
    const removedCode = code.replaceAll('\n\n', '\n');
    setLine(countEscape(removedCode));
    let editorHTML = editorRef.current?.innerHTML;
    ReservedWords.map(elem => {
      editorHTML = editorHTML?.replace(new RegExp(`\\b${elem}\\b`, 'g'), `<span>${elem}</span>`);
    });
    if (editorHTML && printerRef && printerRef.current) {
      printerRef.current.innerHTML = editorHTML;
    }
  }, [code]);

  return (
    <>
      <Title>Solution</Title>
      <EditorWrapper>
        <LineWrapper>
          {
            Array.apply(null, new Array(line)).map((e, idx) => <p key={idx}>{idx + 1}</p>)
          }
        </LineWrapper>
        <CodeEditor
          contentEditable={true}
          suppressContentEditableWarning={true}
          ref={editorRef}
          onInput={(e: React.KeyboardEvent<HTMLDivElement>) => {
            const target = e.target as HTMLDivElement;
            setCode(target.innerText);}}
        >
        </CodeEditor>
        <CodePrinter ref={printerRef}></CodePrinter>
      </EditorWrapper>
      
    </>
  );
}

export default Editor;