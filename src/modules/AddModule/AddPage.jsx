import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { getShowFoodForm, getShowVisitForm } from '../../Selectors';

import AddFoodForm from './AddFoodForm';
import AddPlaceForm from './AddPlaceForm';
import AddVisitForm from './AddVisitForm';

class AddPage extends Component {
  render() {
    const { showFoodForm, showVisitForm } = this.props;
    return (
      <React.Fragment>
        <AddPlaceForm />
        {showVisitForm ? <AddVisitForm /> : null }
        {showFoodForm ? <AddFoodForm /> : null }
      </React.Fragment>
    );
  }
}

AddPage.propTypes = {

};

export default connect(
  state => ({
    showFoodForm: getShowFoodForm(state),
    showVisitForm: getShowVisitForm(state),
  }),
  dispatch => ({

  })
)(AddPage);
