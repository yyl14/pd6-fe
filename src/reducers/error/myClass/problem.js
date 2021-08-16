import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  readProblem: null,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
    case problemConstants.READ_PROBLEM_FAIL:
      return {
        ...state,
        readProblem: action.errors,
      };
    default: {
      return state;
    }
  }
}
