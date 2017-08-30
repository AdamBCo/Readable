import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { isLoaded, loadCategories } from '../redux/modules/categories';
import { Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Categories extends Component {

  componentWillMount() {
    const { isDataLoaded, loadData } = this.props;

    if (!isDataLoaded) {
      loadData()
    }
  }

  render() {

    const { isDataLoaded, categories } = this.props;

    if (!categories) {
      return <p>Your search has 0 results.</p>
    }

    return (
      <Segment loading={!isDataLoaded}>
        <Menu fluid vertical>
          <Menu.Item name="Home"/>

          {categories.map((category) => (

            <Menu.Item key={category.name}>
              <Link to={`/${category.name}`}>{category.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  error: state.categories.error,
  loading: state.categories.loading,
  isDataLoaded: isLoaded(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {dispatch(loadCategories())}
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
