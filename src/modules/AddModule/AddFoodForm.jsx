import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { Card, FormLabel, FormWrapper, Title } from './AddPage.sc';

class AddFoodName extends Component {
  render() {
    return (
      <Card>
        <Title>3. Add Foods</Title>
        <Form />
      </Card>
    );
  }
}

const Form = ({ }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <FormWrapper>
      {/* <FormGroup>
        <FormLabel for="name">Name</FormLabel>
        <Controller as={Input} control={control} type="text" name="name" id="name"
          placeholder="What is the name of the food?" />
      </FormGroup>
      <FormGroup>
        <FormLabel for="currency">Currency</FormLabel>
        <Controller as={Input} control={control} type="text" name="currency" id="currency"
          placeholder="What is the currency?" />
      </FormGroup>
      <FormGroup>
        <FormLabel for="priceMin">Min. Price</FormLabel>
        <Controller as={Input} control={control} type="number" name="priceMin" id="priceMin"
          placeholder="What is the min price?" />
      </FormGroup>
      <FormGroup>
        <FormLabel for="priceMax">Max. Price</FormLabel>
        <Controller as={Input} control={control} type="number" name="priceMax" id="priceMax"
          placeholder="What is the max price?" />
      </FormGroup>
      <FormGroup tag="fieldset">
        <FormLabel for="hasPriceRange">Has Price Range?</FormLabel>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="hasPriceRange" />Yes
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="hasPriceRange" />No
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormLabel for="notes">Notes</FormLabel>
        <Controller as={Input} control={control} type="text" name="notes" id="notes"
          placeholder="Any additional info?" />
      </FormGroup>
      <Button type="submit" color="primary">Save</Button> */}
    </FormWrapper>
  );
};

export default AddFoodName;
