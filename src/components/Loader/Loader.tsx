import React from "react";
import styled from "styled-components";
import FeatherIcon from "feather-icons-react";

const LoaderWrapper = styled.div`
  display: flex;
  gap: var(--spacing-2);
  color: var(--gray-500);

  .loader-icon {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface LoaderProps {
  text?: string;
}

const Loader = ({ text = "Work in progress" }: LoaderProps) => {
  return (
    <LoaderWrapper>
      <div className="loader-icon" data-testid="loader">
        <FeatherIcon icon="loader" />
      </div>
      <span>{text}</span>
    </LoaderWrapper>
  );
};

export default Loader;
