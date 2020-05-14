import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #f4f4f4;
  padding: 25px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 15px;
`;

export const Title = styled.h2`
  margin: 0;
  font-weight: bold;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Left = styled.div`
  min-width: 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    min-width: 75%;
    max-width: 75%;
  }
`;

export const Right = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 15px;

  @media (min-width: 768px) {
    text-align: right;
    margin-top: 0;
  }
`;

export const FoodCard = styled.div`
  border: 1px solid #543864;
  border-radius: 4px;
  max-width: 100%;
  min-width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    max-width: 48%;
    min-width: 48%;
  }
`;

export const FoodContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FoodsAndVisitsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

export const SponsoredLabel = styled.div`
  border: 2px solid #543864;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const PriceWrapper = styled.div`
  font-size: 12px;
`;

export const FoodContentLeft = styled.div`
  margin-right: 0;
  max-width: 100%;
  margin-top: 8px;

  @media (min-width: 768px) {
    margin-right: 8px;
    margin-top: 0;
    max-width: 80%;
  }
`;

export const FoodContentRight = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
  }
`;

export const FoodBottom = styled.div`
  padding: 10px 20px;
  border-top: 1px solid #543864;
  margin-top: 20px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const YoutubeIcon = styled(FontAwesomeIcon)`
  color: #FF0000;
`;

export const RatingIcon = styled(FontAwesomeIcon)`
  color: #ffd31d;
`;
