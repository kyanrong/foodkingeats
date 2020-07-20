import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { Card, FormLabel, FormWrapper, Title } from './AddPage.sc';

class AddVisitForm extends Component {
  render() {
    return (
      <Card>
        <Title>2. Add Visit</Title>
        <Form />
    </Card>
    );
  }
}

const Form = ({ handleInputChange }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <FormWrapper>
      {/* <FormGroup tag="fieldset">
        <FormLabel for="isSponsored">Sponsored?</FormLabel>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="isSponsored" />Yes
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="isSponsored" />No
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormLabel for="dateOfUpload">Date of Upload</FormLabel>
        <Controller as={Input} control={control} type="date" name="dateOfUpload" id="dateOfUpload"     
          placeholder="YYYY-MM-DD" />
      </FormGroup>
      <FormGroup>
        <FormLabel for="youtubeUrl">YouTube URL</FormLabel>
        <Controller as={Input} control={control} type="text" name="youtubeUrl" id="youtubeUrl"
          placeholder="What is the timestamped YouTube URL?" />
      </FormGroup>
      <FormGroup>
        <FormLabel for="rating">Rating</FormLabel>
        <Controller as={Input} control={control} type="number" name="rating" id="rating"
          placeholder="What is the given rating?" />
      </FormGroup>
      <Button type="submit" color="primary">Save</Button> */}
    </FormWrapper>
  );
};

export default AddVisitForm;
