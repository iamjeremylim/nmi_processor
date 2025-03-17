import React from "react";
import styled from "styled-components";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  variant: "primary";
  text: string;
}

const BaseButton = styled.button`
  border: 1px solid transparent;
  line-height: 1.5;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 400;
  border-radius: var(--radius-md);
  display: inline-block;
  color: var(--gray-500);
  background-color: transparent;
  padding: 0.35rem 0.75rem;
  white-space: nowrap;
  width: auto;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const variants = {
  primary: styled(BaseButton)`
    border-color: var(--gray-500);

    &:enabled:hover,
    &:enabled:focus-visible {
      color: var(--white);
      background-color: var(--gray-500);
      border-color: var(--gray-500);
    }
  `,
};

const Button = ({ text, variant, disabled, ...props }: ButtonProps) => {
  const StyledButton = variants[variant];

  return (
    <StyledButton disabled={disabled} {...props}>
      {text}
    </StyledButton>
  );
};

export default Button;
