import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchPlaces, selectPlaceId, setShowVisitForm, unsetShowVisitForm } from '../../Actions';
import { getPlacesOptions } from '../../Selectors';

import { Card, FormLabel, FormWrapper, Title } from './AddPage.sc';

const Form = ({ handleInputChange, handleOnSelect, options, showRestOfForm }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel for="name">Name</FormLabel>
        <Controller as={CreatableSelect}
          control={control}
          name="name"
          id="name"
          placeholder="Type to search for a place..."
          isSearchable={true}
          options={options}
          onChange={handleOnSelect}
          onInputChange={handleInputChange}
          getNewOptionData={inputValue => ({
            id: `new-${inputValue}`,
            name: inputValue,
          })}
          getOptionLabel={option =>
            option.id.includes('new') ? (
              <span>
                [New Label] <strong>{option.name}</strong>
              </span>
            ) : (
              option.name
            )
          }
          getOptionValue={option => option.id}
          isValidNewOption={inputValue => inputValue.length}
          createOptionPosition="first" />
      </FormGroup>
      {showRestOfForm
        ? (<React.Fragment>
            <FormGroup>
              <FormLabel for="street">Street</FormLabel>
              <Controller as={Input} control={control} type="text" name="street" id="street"
                placeholder="What is the street name?" />
            </FormGroup>
            <FormGroup>
              <FormLabel for="unit">Unit</FormLabel>
              <Controller as={Input} control={control} type="text" name="unit" id="unit"
                placeholder="What is the unit number?" />
            </FormGroup>
            <FormGroup>
              <FormLabel for="building">Building</FormLabel>
              <Controller as={Input} control={control} type="text" name="building" id="building"
                placeholder="What is the building name?" />
            </FormGroup>
            <FormGroup>
              <FormLabel for="street">Postal Code</FormLabel>
              <Controller as={Input} control={control} type="text" name="postal" id="postal"
                placeholder="What is the postal code?" />
            </FormGroup>
            <FormGroup tag="fieldset">
              <FormLabel for="isHalal">Halal?</FormLabel>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="isHalal" />Yes
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="isHalal" />No
                </Label>
              </FormGroup>
            </FormGroup>
            <Button type="submit" color="primary">Save</Button>
          </React.Fragment>)
        : null}
      </FormWrapper>
  );
};

class AddPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: undefined,
      showRestOfForm: false,
    };
  }

  handleInputChange(input) {
    this.setState({
      inputValue: input,
    });
    this.props.fetchOptions(input);
  }

  handleOnSelect(arr) {
    const value = arr[0];
    if (value.id.includes('new')) {
      this.setState({
        showRestOfForm: true,
      });
      this.props.selectPlaceId(null);
      this.props.unsetShowVisitForm();
    } else {
      this.setState({
        showRestOfForm: false,
      });
      this.props.selectPlaceId(value.id);
      this.props.setShowVisitForm();
    }
  }

  render() {
    const { options } = this.props;
    const { showRestOfForm } = this.state;

    return (
      <Card>
        <Title>1. Add Place</Title>
        <Form handleInputChange={this.handleInputChange.bind(this)}
        options={options}
        handleOnSelect={this.handleOnSelect.bind(this)}
        showRestOfForm={showRestOfForm} />
      </Card>
    );
  }
}



export default connect(
  state => ({
    options: getPlacesOptions(state),
  }),
  dispatch => ({
    fetchOptions: terms => dispatch(fetchPlaces(terms)),
    selectPlaceId: id => dispatch(selectPlaceId(id)),
    setShowVisitForm: () => dispatch(setShowVisitForm()),
    unsetShowVisitForm: () => dispatch(unsetShowVisitForm()),
  })
)(AddPlaceForm);
