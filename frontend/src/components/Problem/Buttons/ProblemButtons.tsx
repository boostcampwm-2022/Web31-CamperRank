import React from "react";
import styled from "styled-components";

type ButtonProp = {
  name: string;
};

const ButtonWrapper = styled.button<ButtonProp>`
  width: 6rem;
  height: 80%;
  margin: 0.5rem;
  background: #ffffff;
  border: 2px solid
    ${(props) => (props.name === "제출" ? "#33C363" : "#888888")};
  box-shadow: ${(props) =>
    props.name === "제출"
      ? "0px 8px 24px rgba(51, 195, 99, 0.5);"
      : "0px 4px 1px rgba(0, 0, 0, 0.25);"};
  border-radius: 4px;
  &:hover {
    background: ${(props) => (props.name === "제출" ? "#DBF6E4" : "#eeeeee")};
  }
`;

const Button = ({ name }: ButtonProp) => {
  return <ButtonWrapper name={name}>{name}</ButtonWrapper>;
};

const ProblemButtons = () => {
  const buttonNames = ["초기화", "코드테스트", "제출"];
  return (
    <>
      {buttonNames.map((name, idx) => (
        <Button key={idx} name={name} />
      ))}
    </>
  );
};
export default ProblemButtons;
