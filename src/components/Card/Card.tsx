import React from "react";
import styled from "styled-components";
import FeatherIcon, { type FeatherIconName } from "feather-icons-react";

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: 1rem;
  color: var(--gray-500);
  border: 1px var(--gray-200) solid;
  border-radius: var(--radius-md);
  box-shadow: 2px 4px 8px hsl(0deg 0% 0% / 0.2);

  .icon {
    flex: 0 0 5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cta-button {
    margin-left: auto;
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    color: inherit;
  }

  .cta-button:hover {
    color: var(--gray-700);
  }
`;

interface CardProps {
  icon: FeatherIconName;
  description: string;
  cta: {
    href?: string;
    onClick?: () => void;
    icon: FeatherIconName;
  };
}

const Card = ({ icon, description, cta }: CardProps) => {
  const CTA = typeof cta.href === "string" ? "a" : "button";

  return (
    <CardWrapper>
      <div className="icon">
        <FeatherIcon icon={icon} />
      </div>
      <div className="description">
        <span>{description}</span>
      </div>
      <CTA
        href={cta.href}
        className="cta-button"
        onClick={cta.onClick}
        aria-label="cta button"
        target="_blank"
      >
        <FeatherIcon icon={cta.icon} />
      </CTA>
    </CardWrapper>
  );
};

export default Card;
