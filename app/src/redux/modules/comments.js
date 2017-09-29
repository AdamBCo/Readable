import * as CommentsAPI from '../../api/CommentsAPI';
import * as PostAPI from '../../api/PostAPI';

// Actions

const LOAD_POST = 'LOAD_POST'
const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

const LOAD_COMMENTS = 'LOAD_COMMENTS'
const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

const POST_COMMENT = 'POST_COMMENT'
const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS'
const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE'

const UPDATE_COMMENT = 'UPDATE_COMMENT'
const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'
const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE'

const DELETE_COMMENT = 'DELETE_COMMENT'
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'

const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
const UP_VOTE_COMMENT_SUCCESS = 'UP_VOTE_COMMENT_SUCCESS'
const UP_VOTE_COMMENT_FAILURE = 'UP_VOTE_COMMENT_FAILURE'

const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
const DOWN_VOTE_COMMENT_SUCCESS = 'DOWN_VOTE_COMMENT_SUCCESS'
const DOWN_VOTE_COMMENT_FAILURE = 'DOWN_VOTE_COMMENT_FAILURE'

const initialState = {
  loaded: false,
  title: "",
  body: ""
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type)
  {
    case LOAD_COMMENTS:
      return {
        ...state,
        loading: true
      }
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        comments: action.result,
        error: null
      }
    case LOAD_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        comments: null,
        error: action.error
      }

    case POST_COMMENT: {
      return {
        ...state,
        loading: true
      }
    }

    case POST_COMMENT_SUCCESS: {

      var comments = state.comments.slice();
      comments.push(action.result);

      return {
        ...state,
        loading: false,
        loaded: true,
        comments,
        error: null
      }
    }

    case POST_COMMENT_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        comments: null,
        error: action.error
      }
    }

    case UP_VOTE_COMMENT:
      return {
        ...state,
        loading: true
      }

    case UP_VOTE_COMMENT_SUCCESS: {

      let comments = state.comments.map((comment) => {
        if (comment.id === action.result.id) {
          comment.voteScore = comment.voteScore + 1;
          return comment;
        } else {
          return comment;
        }
      });

      return {
        ...state,
        loading: false,
        comments
      }
    }

    case UP_VOTE_COMMENT_FAILURE:
      return {
        ...state
      }

    case DOWN_VOTE_COMMENT:
      return {
        ...state
      }

    case DOWN_VOTE_COMMENT_SUCCESS: {

      let comments = state.comments.map((comment) => {
        if (comment.id === action.result.id) {
            comment.voteScore = comment.voteScore - 1;
            return comment;
          } else {
            return comment;
          }
        });

        return {
          ...state,
          loading: false,
          comments
        }
      }

    case DOWN_VOTE_COMMENT_FAILURE:
      return {
        ...state
      }

    case DELETE_COMMENT:

      var comments = state.comments.filter((comment) =>{
        return comment.id !== action.id;
      });

      return {
        ...state,
        comments,
        loading: true
      }

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }


    case LOAD_POST:
      return {
        ...state,
        comments,
        loading: true
      }

    case LOAD_POST_SUCCESS:

      return {
        ...state,
        title: action.result.title,
        body: action.result.body,
        loading: false,
        loaded: true,
        error: null
      }
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }

    case UPDATE_COMMENT: {

      let comments = state.comment.map((comment) => {
        if (comment.id === action.id) {
          comment.body = action.body;
          return comment;
        } else {
          return comment;
        }
      });

      return {
        ...state,
        comments,
        loading: true
      }
    }

    case UPDATE_COMMENT_SUCCESS: {

      return {
      ...state
      }

    }

    case UPDATE_COMMENT_FAILURE: {
      return {
        ...state
      }
    }
    default:
      return state
  }
};

export function fetchComments(id) {
  return {
    types: [LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE],
    promise: CommentsAPI.fetchComments(id)
  }
}

export function postComment(comment) {
  return {
    types: [POST_COMMENT, POST_COMMENT_SUCCESS, POST_COMMENT_FAILURE],
    promise: CommentsAPI.postComment(comment)
  }
}

export function deleteComment(id) {
  return {
    id,
    types: [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE],
    promise: CommentsAPI.deleteComment(id)
  }
}

export function upVoteComment(id) {
  return {
    types: [UP_VOTE_COMMENT, UP_VOTE_COMMENT_SUCCESS, UP_VOTE_COMMENT_FAILURE],
    promise: CommentsAPI.upVoteComment(id)
  }
}

export function downVoteComment(id) {
  return {
    types: [DOWN_VOTE_COMMENT, DOWN_VOTE_COMMENT_SUCCESS, DOWN_VOTE_COMMENT_FAILURE],
    promise: CommentsAPI.downVoteComment(id)
  }
}

export function loadPost(id) {
  return {
    types: [LOAD_POST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE],
    promise: PostAPI.loadPostWithID(id)
  }
}

export function updateComment(id, body) {

  const types = [UPDATE_COMMENT, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE]
  const promise = CommentsAPI.updateComment(id, body)

  return {
    types,
    id,
    body,
    promise
  }
}
