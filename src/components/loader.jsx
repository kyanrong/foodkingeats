import React from 'react';

import styled from 'styled-components';

const Loader = () => (
  <Icon />
);

const Icon = styled.div`
  margin: 0 auto;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #543864;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Loader;
