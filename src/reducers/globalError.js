import { userConstants } from '../actions/constant';

const initialState = {
  errors: {},
};

export default function globalError(state = initialState, payload) {
  switch (payload.type) {
    case userConstants.API_CALL_ERROR:
      return {
        errors: payload.errors,
      };
    default:
      return state;
  }
}
