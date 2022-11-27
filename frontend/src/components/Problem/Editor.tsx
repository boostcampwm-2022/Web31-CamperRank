import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import ReservedWords from "../../utils/ReservedWords";

const EditorWrapper = styled.div`
  display: flex;
  height: calc(100% - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
`

const CodeEditor = styled.div`
  border: 2px double #888888;
  border-radius: 3px;
  background: #F5FDF8;
  width: 95%;
  padding: 0.3rem;
  font-size: 0.9rem;
  outline: none;
  min-height: 100%;
  height: fit-content;
  &:focus {
    border: 2px double #888888;
  }
`

const CodePrinter = styled.div`
  position: absolute;
  width: 92%;
  margin-left: 2.5rem;
  font-size: 0.9rem;
  border: 1px solid black;
  z-index: 2;
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
    if (code === '') return;
    const removedCode = code.replaceAll('\n\n', '\n');
    setLine(countEscape(removedCode));
    let editorHTML = editorRef.current?.innerHTML;
    ReservedWords.map(elem => {
      editorHTML = editorHTML?.replaceAll(elem, `<h1>${elem}</h1>`);
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
      </EditorWrapper>
      
    </>
  );
}

export default Editor;