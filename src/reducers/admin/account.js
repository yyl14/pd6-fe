import { accountConstants } from '../../actions/constant';

const initialState = {
  institute: {
    institutes: [],
    error: null,
    loading: false,
  },

  account: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
  },
};

export default function account(state = initialState, action) {
  switch (action.type) {
    // institute
    case accountConstants.FETCH_INSTITUTE_REQUEST:
      return {
        ...state,
        institute: { ...state.institute, loading: true },
      };
    case accountConstants.FETCH_INSTITUTE_SUCCESS:
      return {
        ...state,
        institute: { institutes: action.payload, error: null, loading: false },
      };
    case accountConstants.FETCH_INSTITUTE_FAIL:
      return {
        ...state,
        institute: { ...state.institute, error: action.error, loading: false },
      };
    case accountConstants.ADD_INSTITUTE_SUCCESS:
      return {
        ...state,
        institute: { institutes: [...state.institute.institutes, action.payload], error: action.error, loading: false },
      };
    case accountConstants.ADD_INSTITUTE_FAIL:
      return {
        ...state,
        institute: { ...state.institute, error: action.error, loading: false },
      };

      // account

    default:
      return state;
  }
}
