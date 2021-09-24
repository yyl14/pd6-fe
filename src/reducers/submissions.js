import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';
import { viewConstants } from '../actions/api/constant';

const verdictMapping = new Map([
  ['ACCEPTED', 'Accepted'],
  ['WRONG ANSWER', 'Wrong Answer'],
  ['MEMORY LIMIT EXCEED', 'Memory Limit Exceed'],
  ['TIME LIMIT EXCEED', 'Time Limit Exceed'],
  ['RUNTIME ERROR', 'Runtime Error'],
  ['COMPILE ERROR', 'Compile Error'],
  ['CONTACT MANAGER', 'Contact Manager'],
  ['FORBIDDEN ACTION', 'Forbidden Action'],
  ['SYSTEM ERROR', 'System Error'],
  [null, null],
]);

const byId = (state = {}, action) => {
  switch (action.type) {
    case viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_SUCCESS: {
      const { data } = action.payload;
      return data.submissions.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case viewConstants.BROWSE_MYSUBMISSION_SUCCESS: {
      const { data } = action.payload;
      return data.submissions.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state,
      );
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { submissionId, data } = action.payload;
      return {
        ...state,
        [Number(submissionId)]: { ...data, latestJudgmentId: null },
      };
    }
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, latestJudgmentId: null } }), state);
    }

    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, latestJudgmentId: null } }), state);
    }

    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.submission_id]: { ...state[action.payload.submission_id], latestJudgmentId: action.payload.id },
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.submission_id]: { ...state[action.payload.submission_id], latestJudgmentId: action.payload.id },
      };
    }
    case problemConstants.VIEW_MY_SUBMISSION_UNDER_PROBLEM_SUCCESS: {
      const { submissions } = action.payload;
      return submissions.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state,
      );
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.submissions.map((item) => item.id), ...state])];
    }
    case viewConstants.BROWSE_MYSUBMISSION_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.submissions.map((item) => item.id), ...state])];
    }
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.map((item) => item.id);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { submissionId } = action.payload;
      return state.includes(Number(submissionId)) ? state : state.concat([Number(submissionId)]);
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    case problemConstants.VIEW_MY_SUBMISSION_UNDER_PROBLEM_SUCCESS: {
      const { submissions } = action.payload;
      return [...new Set([...submissions.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
