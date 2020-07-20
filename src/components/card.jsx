import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

import {
  ContentWrapper,
  FoodBottom,
  FoodCard,
  FoodContent,
  FoodContentLeft,
  FoodContentRight,
  FoodsAndVisitsWrapper,
  Left,
  PriceWrapper,
  Right,
  SponsoredLabel,
  RatingIcon,
  Title,
  Wrapper,
  YoutubeIcon,
} from './Card.sc';

const Card = ({ foodsAndVisits, place }) => (
  <Wrapper key={place.id}>
    <ContentWrapper>
      <Left>
        <Title>{place.name}</Title>
        <FoodsAndVisitsWrapper>
          {foodsAndVisits.map(x => <Food key={x.food.id} food={x.food} visit={x.visit} />)}
        </FoodsAndVisitsWrapper>
      </Left>
      <Right>
        <div>
          {place.street} {place.unit}
          {place.street || place.unit ? <br /> : null}
          {place.building}
          {place.building ? <br /> : null}
          {place.postal}
          {place.postal ? <br /> : null}
        </div>
        {place.isHalal
          ? <img src={require('../assets/halal.png')} height="50px" />
          : null}
      </Right>
    </ContentWrapper>
  </Wrapper>
);

Card.propTypes = {
  foodsAndVisits: PropTypes.array,
  place: PropTypes.object,
};

const Food = ({ food, visit }) => {
  const hasHalf = visit.rating % 1 !== 0;
  const rating = Math.floor(visit.rating);

  return (
    <FoodCard>
      <FoodContent>
        <FoodContentLeft>
          {food.name}
          <Price food={food} />
        </FoodContentLeft>
        <FoodContentRight>
          {visit.isSponsored ? <SponsoredLabel>Sponsored</SponsoredLabel> : null}
          {Array.from(Array(rating)).map((x, idx) => <RatingIcon key={idx} icon={faStar} />)}
          {hasHalf ? <RatingIcon icon={faStarHalf} /> : null}
        </FoodContentRight>
      </FoodContent>
      <FoodBottom>
        <div>
          <FontAwesomeIcon icon={faCalendarDay} />&nbsp;&nbsp;{visit.dateOfUpload.split('T')[0]}
        </div>
        <div>
          <a href={visit.youtubeUrl} target="_blank"><YoutubeIcon icon={faYoutube} /></a>
        </div>
      </FoodBottom>
    </FoodCard>
  );
};

Food.propTypes = {
  food: PropTypes.object,
  visit: PropTypes.object,
};

const Price = ({ food }) => (
  <PriceWrapper>
    {food.currency}
    {food.priceMin && food.priceMax ? ` ${food.priceMin} - ${food.priceMax} ` : null}
    {food.priceMin && !food.priceMax && food.hasPriceRange ? ` ${food.priceMin} onwards ` : null}
    {food.priceMin && !food.priceMax && !food.hasPriceRange ? ` ${food.priceMin} ` : null}
    {food.notes ? <span><br />{food.notes}</span> : null}
  </PriceWrapper>
);

Price.propTypes = {
  food: PropTypes.object,
};

export default Card;
