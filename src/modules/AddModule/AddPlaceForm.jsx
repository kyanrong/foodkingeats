import React, { Component } from 'react';

import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { Button, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { connect } from 'react-redux';

import { addPlace, fetchPlaces, selectPlaceId, setShowVisitForm, unsetShowVisitForm } from '../../Actions';
import { getAddLoading, getAddSuccess, getPlacesOptions } from '../../Selectors';

import { Card, FormLabel, FormWrapper, Title } from './AddPage.sc';

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
    if (input && input.length) {
      this.props.fetchOptions(input);
    }
  }

  handleOnSelect(value) {
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

  handleSubmit(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);

    const data = {
      'name': null,
      'street': null,
      'building': null,
      'unit': null,
      'postal': null,
      'isHalal': false,
    };

    for (let [key, value] of form.entries()) { 
      if (key === 'name') {
        value = value.split('new-')[1];
      } else if (key === 'isHalal') {
        value = value === 'yes';
      }
      data[key] = value || value.length ? value : data[key];
     }

     this.props.addPlace(data);
  }

  render() {
    const { loading, options, success } = this.props;
    const { showRestOfForm } = this.state;

    return (
      <Card>
        <Title>1. Add Place</Title>
          <FormWrapper onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <CreatableSelect name="name"
                id="name"
                placeholder="Type to search for a place..."
                isSearchable={true}
                options={options}
                onChange={this.handleOnSelect.bind(this)}
                onInputChange={this.handleInputChange.bind(this)}
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
                    <Input type="text" name="street" id="street" placeholder="What is the street name?" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel for="unit">Unit</FormLabel>
                    <Input type="text" name="unit" id="unit" placeholder="What is the unit number (#xx-xx)?" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel for="building">Building</FormLabel>
                    <Input type="text" name="building" id="building" placeholder="What is the building name?" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel for="street">Postal Code</FormLabel>
                    <Input type="text" name="postal" id="postal" placeholder="What is the postal code?" />
                  </FormGroup>
                  <FormGroup tag="fieldset">
                    <FormLabel for="isHalal">Halal?</FormLabel>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="isHalal" id="isHalal" value="yes" />
                        Yes
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="isHalal" id="isNotHalal" value="no" />
                        No
                      </Label>
                    </FormGroup>
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
                </React.Fragment>)
              : null}
          </FormWrapper>
      </Card>
    );
  }
}



export default connect(
  state => ({
    options: getPlacesOptions(state),
    loading: getAddLoading(state),
    success: getAddSuccess(state),
  }),
  dispatch => ({
    addPlace: data => dispatch(addPlace(data)),
    fetchOptions: terms => dispatch(fetchPlaces(terms)),
    selectPlaceId: id => dispatch(selectPlaceId(id)),
    setShowVisitForm: () => dispatch(setShowVisitForm()),
    unsetShowVisitForm: () => dispatch(unsetShowVisitForm()),
  })
)(AddPlaceForm);
