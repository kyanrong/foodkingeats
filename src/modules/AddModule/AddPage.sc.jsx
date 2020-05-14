import { Label } from 'reactstrap';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: #f4f4f4;
  padding: 25px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 15px;
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0;
  font-weight: bold;
`;

export const FormLabel = styled(Label)`
  margin: 0;
  text-transform: uppercase;
  font-size: 12px;
`;

export const FormWrapper = styled.form`
  margin-top: 15px;
`;