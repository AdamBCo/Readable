import * as CategoriesAPI from '../../api/CategoriesAPI';

// Actions
const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

const initialState = {
  loaded: false
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type)
  {
    case LOAD_CATEGORIES:
      return {
        ...state,
        loading: true
      }
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.result.categories,
        error: null
      }
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        categories: null,
        error: action.error
      }
    default:
      return state
  }
};

export function isLoaded(globalState) {
  return globalState.categories && globalState.categories.loaded;
}

export function loadCategories() {
  return {
    types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE],
    promise: CategoriesAPI.fetchCategories()
  }
}
