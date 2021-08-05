import { publicConstants } from '../actions/constant';

const initialState = {
  institutes: {
    byId: {},
    allIds: [],
  },
  error: null,
  loading: false,
};

export default function publicState(state = initialState, action) {
  switch (action.type) {
    case publicConstants.GET_INSTITUTE_START:
      return {
        ...state,
        loading: true,
      };
    case publicConstants.GET_INSTITUTE_SUCCESS:
      return {

        error: null,
        loading: false,
      };
    case publicConstants.GET_INSTITUTE_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}
