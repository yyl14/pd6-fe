import { accountConstants } from "../../../actions/constant";

const initialState = {
  fetchInstitutes: null,
  fetchInstitute: null,
  addInstitute: null,
  editInstitute: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.FETCH_INSTITUTES_SUCCESS: {
      return {
        ...state,
        fetchInstitutes: null,
      }
    }
    case accountConstants.FETCH_INSTITUTES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        fetchInstitutes: error,
      }
    }

    case accountConstants.FETCH_INSTITUTE_SUCCESS: {
      return {
        ...state,
        fetchInstitute: null,
      }
    }
    case accountConstants.FETCH_INSTITUTE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        fetchInstitute: error,
      }
    }

    case accountConstants.ADD_INSTITUTE_SUCCESS: {
      return {
        ...state,
        addInstitute: null,
      }
    }
    case accountConstants.ADD_INSTITUTE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        addInstitute: error,
      }
    }

    case accountConstants.EDIT_INSTITUTE_SUCCESS: {
      return {
        ...state,
        editInstitute: null,
      }
    }
    case accountConstants.EDIT_INSTITUTE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        editInstitute: error,
      }
    }

    default: {
      return state;
    }
  }
}
