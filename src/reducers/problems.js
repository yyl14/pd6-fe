import { combineReducers } from 'redux';
import { problemConstants, challengeConstants } from '../actions/myClass/constant';
import { commonConstants } from '../actions/common/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return data.problem.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            testcaseIds: [],
            assistingDataIds: [],
            score: state[data.id] ? state[data.id].score : '',
          },
        }),
        state,
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
          score: state[data.id] ? state[data.id].score : '',
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

    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS: {
      const { problems } = action.payload;
      return problems.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            testcaseIds: [],
            assistingDataIds: [],
          },
        }),
        state,
      );
    }

    case problemConstants.READ_PROBLEM_SCORE_SUCCESS: {
      const { data, problemId } = action.payload;
      return {
        ...state,
        [problemId]: {
          ...state[problemId],
          score: data.score,
        },
      };
    }

    case commonConstants.FETCH_PROBLEMS_SUCCESS: {
      const data = action.payload;
      return data.reduce(
        (acc, problem) => ({
          ...acc,
          [problem.id]: {
            ...problem,
          },
        }),
        state,
      );
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.problem.map((item) => item.id), ...state])];
    }
    case problemConstants.READ_PROBLEM_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);

    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS: {
      const { problems } = action.payload;
      return [...new Set([...problems.map((item) => item.id), ...state])];
    }

    case commonConstants.FETCH_PROBLEMS_SUCCESS: {
      const data = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
