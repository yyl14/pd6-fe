import { commonConstants } from '../../../actions/common/constant';

const initialState = {
  fetchInstitutes: null,
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_START: {
      return {
        ...state,
        fetchInstitutes: null,
      };
    }
    case commonConstants.GET_INSTITUTE_SUCCESS: {
      return {
        ...state,
        fetchInstitutes: null,
      };
    }
    case commonConstants.GET_INSTITUTE_FAIL: {
      return {
        ...state,
        fetchInstitutes: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
