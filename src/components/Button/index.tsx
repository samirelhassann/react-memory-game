import React from "react";
import * as C from "./styles";

interface Props {
  label: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Component = ({
  label,
  icon,
  onClick: onClickAction,
}: Props): JSX.Element => {
  return (
    <C.Container onClick={onClickAction}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon} />
        </C.IconArea>
      )}
      <C.Label>{label}</C.Label>
    </C.Container>
  );
};

export default Component;
