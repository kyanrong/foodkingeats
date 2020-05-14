import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import AddFoodForm from './AddFoodForm';
import AddPlaceForm from './AddPlaceForm';
import AddVisitForm from './AddVisitForm';

class AddPage extends Component {
  render() {
    return (
      <React.Fragment>
        <AddPlaceForm />
        <AddVisitForm />
        <AddFoodForm />
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
