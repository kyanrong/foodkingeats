import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card, Title } from './addPage.sc';

class AddPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <Title>1. Add Place</Title>
          <span>
          name, address.street, address.unit, address.building, address.postal, isHalal
          </span>
        </Card>
        <Card>
          <Title>2. Add Visit</Title>
          <span>
            PlaceId, rating, isSponsored, dateOfUpload, youtubeUrl
          </span>
        </Card>
        <Card>
          <Title>3. Add Foods</Title>
          <span>
            PlaceId, VisitId, priceMin, priceMax, hasPriceRange, notes, currency
          </span>
        </Card>
      </React.Fragment>
    );
  }
}

AddPage.propTypes = {

};

export default connect(
  state => ({

  }),
  dispatch => ({

  })
)(AddPage);
