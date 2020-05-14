import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Overpass', sans-serif;
  font-size: 16px;
  margin: 0 auto;
  width: 95%;

  @media (min-width: 600px) {
    width: 55%;
  }

  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 1024px) {
    width: 75%;
  }

  @media (min-width: 1260px) {
    width: 50%;
  }
`;

export const Title = styled.h1`
  margin-top: 60px;
  font-family: 'Fredoka One', cursive;
  -webkit-text-fill-color: black;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  font-size: 40px;

  @media (min-width: 768px) {
    font-size: 50px;
  }

  @media (min-width: 1024px) {
    font-size: 60px;
  }
`;
