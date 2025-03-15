import React from "react";
import styled from "styled-components";
import { Loader as LoaderIcon } from "react-feather";

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

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <div className="loader-icon">
        <LoaderIcon />
      </div>
      <span>Work in progress</span>
    </LoaderWrapper>
  );
};

export default Loader;
