import styled from "styled-components";

type ContainerProps = {
  showBackGround: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.showBackGround ? "#1550ff" : "#E2E3E3"};
  height: 100px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type IconProps = {
  isShown: boolean;
};

export const Icon = styled.img<IconProps>`
  width: 40px;
  height: 40px;
  opacity: ${(props) => (props.isShown ? "1" : "0.7")};
`;
