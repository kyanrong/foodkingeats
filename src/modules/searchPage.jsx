import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@material/react-text-field';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSearchResults } from '../actions';
import '../assets/text-field.css';
import { Card, Loader } from '../components';
import { getFoods, getLoading, getSearchResults, getPlaces, getVisits, getSuccess } from '../selectors';

import { CardsWrapper, EmptyCard, Searchbox } from './searchPage.sc';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: undefined,
    };
  }

  onInputChange(ev) {
    this.setState({
      searchTerms: ev.currentTarget.value,
    });
  }

  onKeyDown(ev) {
    if (ev.key === 'Enter') {
      this.props.fetchSearchResults(this.state.searchTerms);
    }
  }

  resetInput() {
    this.setState({
      searchTerms: undefined,
    });
  }

  render() {
    const { searchTerms } = this.state;
    const { foods, loading, places, success, results, visits } = this.props;

    return (
      <React.Fragment>
        <Searchbox label='Type to search' outlined={true}>
          <Input value={searchTerms}
            onChange={this.onInputChange.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
            onFocus={this.resetInput.bind(this)} />
        </Searchbox>
        <CardsWrapper>
          {loading ? <Loader /> : null}
          {success && results.length
            ? results.map(x => <Card key={x.placeId}
                place={places[x.placeId]}
                foodsAndVisits={x.foodsAndVisits.map(i => ({
                  food: foods[i.foodId],
                  visit: visits[i.visitId]
                }))} />)
            : null}
          {success & !results.length
            ? <EmptyCard>No results found <FontAwesomeIcon icon={faHeartBroken} /></EmptyCard>
            : null}
        </CardsWrapper>
      </React.Fragment>
    );
  }
}

SearchPage.propTypes = {
  loading: PropTypes.bool,
  success: PropTypes.bool,

  fetchSearchResults: PropTypes.func,

  foods: PropTypes.object,
  places: PropTypes.object,
  visits: PropTypes.object,
};

export default connect(
  state => ({
    foods: getFoods(state),
    loading: getLoading(state),
    places: getPlaces(state),
    results: getSearchResults(state),
    success: getSuccess(state),
    visits: getVisits(state),
  }),
  dispatch => ({
    fetchSearchResults: terms => dispatch(fetchSearchResults(terms)),
  })
)(SearchPage);
