import TextField from '@material/react-text-field';
import styled from 'styled-components';

export const Searchbox = styled(TextField)`
  width: 100%;
`;

export const CardsWrapper = styled.div`
  width: 100%;
  margin-top: 35px;
  margin-bottom: 45px;
`;

export const EmptyCard = styled.div`
  background-color: #f4f4f4;
  padding: 25px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;
