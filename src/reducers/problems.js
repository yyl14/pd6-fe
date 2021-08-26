import { combineReducers } from 'redux';
import { problemConstants, submissionConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return data.problem.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item } }), {},
      );
    }
    case problemConstants.READ_PROBLEM_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        [data.id]: {
          ...data,
          testcaseIds: [],
          assistingDataIds: [],
        },
      };
    }
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS: {
      const { problemId, testcases } = action.payload;
      const testcaseIds = testcases.map((item) => item.id);
      return {
        ...state,
        [problemId]: {
          ...state[problemId],
          testcaseIds,
        },
      };
    }
    case problemConstants.BROWSE_ASSISTING_DATA_SUCCESS: {
      const { problemId, assistingData } = action.payload;
      const assistingDataIds = assistingData.map((item) => item.id);
      return {
        ...state,
        [problemId]: {
          ...state[problemId],
          assistingDataIds,
        },
      };
    }
    case problemConstants.EDIT_PROBLEM_SUCCESS: {
      const { problemId, content } = action.payload;
      return {
        ...state,
        [problemId]: {
          ...state[problemId],
          title: content.title,
          full_score: content.full_score,
          description: content.description,
          io_description: content.io_description,
          source: content.source,
          hint: content.hint,
        },
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { problems } = action.payload;
      // console.log(accounts);
      return problems.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [], gradeIds: [] } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return data.problem.map((item) => item.id);
    }
    case problemConstants.READ_PROBLEM_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      return [...new Set([...action.payload.problems.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
