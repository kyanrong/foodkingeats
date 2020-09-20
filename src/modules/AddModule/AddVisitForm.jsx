import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { connect } from 'react-redux';

import { addVisit } from '../../Actions';
import { getAddLoading, getAddSuccess } from '../../Selectors';

import { Card, FormLabel, FormWrapper, Title } from './AddPage.sc';

class AddVisitForm extends Component {
  handleSubmit(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);

    const data = {
      'isSponsored': false,
      'dateOfUpload': null,
      'youtubeUrl': null,
      'rating': null,
    };

    for (let [key, value] of form.entries()) {
      if (key === 'isSponsored') {
        value = value === 'yes';
      }
      if (key === 'rating' && value && value.length) {
        value = Number(value);
      }
      data[key] = value || value.length ? value : data[key];
    }

    this.props.addVisit(data);
  }

  render() {
    const { loading, success } = this.props;
    return (
      <Card>
        <Title>2. Add Visit</Title>
        <FormWrapper onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup tag="fieldset">
            <FormLabel for="isHalal">Sponsored?</FormLabel>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="isSponsored" id="isSponsored" value="yes" />
                Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="isSponsored" id="isNotSponsored" value="no" />
                No
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel for="dateOfUpload">Date of Upload</FormLabel>
            <Input type="date" name="dateOfUpload" id="dateOfUpload" placeholder="YYYY-MM-DD" />
          </FormGroup>
          <FormGroup>
            <FormLabel for="youtubeUrl">YouTube URL</FormLabel>
            <Input type="url" name="youtubeUrl" id="youtubeUrl" placeholder="What is the timestamped YouTube URL?" />
          </FormGroup>
          <FormGroup>
            <FormLabel for="rating">Rating</FormLabel>
            <Input type="number" step="0.1" name="rating" id="rating" placeholder="What was the given rating?" />
          </FormGroup>
          <Button type="submit"
            color={success ? 'success' : 'primary'}
            disabled={loading || success}>
            {loading
              ? (<span>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  &nbsp;&nbsp;
                </span>)
              : null}
            {success ? 'Successfully saved!' : 'Save'}
          </Button>
        </FormWrapper>
    </Card>
    );
  }
}

export default connect(
  state => ({
    loading: getAddLoading(state),
    success: getAddSuccess(state),
  }),
  dispatch => ({
    addVisit: data => dispatch(addVisit(data)),
  })
)(AddVisitForm);
