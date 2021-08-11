import { accountConstants } from '../../../actions/constant';

const initialState = {
  fetchInstitutes: false,
  fetchInstitute: false,
  addInstitute: false,
  editInstitute: false,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.FETCH_INSTITUTES_REQUEST: {
      return {
        ...state,
        fetchInstitutes: true,
      };
    }
    case accountConstants.FETCH_INSTITUTES_SUCCESS: {
      return {
        ...state,
        fetchInstitutes: false,
      };
    }
    case accountConstants.FETCH_INSTITUTES_FAIL: {
      return {
        ...state,
        fetchInstitutes: false,
      };
    }

    case accountConstants.FETCH_INSTITUTE_REQUEST: {
      return {
        ...state,
        fetchInstitute: true,
      };
    }
    case accountConstants.FETCH_INSTITUTE_SUCCESS: {
      return {
        ...state,
        fetchInstitute: false,
      };
    }
    case accountConstants.FETCH_INSTITUTE_FAIL: {
      return {
        ...state,
        fetchInstitute: false,
      };
    }

    case accountConstants.ADD_INSTITUTE_REQUEST: {
      return {
        ...state,
        addInstitute: true,
      };
    }
    case accountConstants.ADD_INSTITUTE_SUCCESS: {
      return {
        ...state,
        addInstitute: false,
      };
    }
    case accountConstants.ADD_INSTITUTE_FAIL: {
      return {
        ...state,
        addInstitute: false,
      };
    }

    case accountConstants.EDIT_INSTITUTE_REQUEST: {
      return {
        ...state,
        editInstitute: true,
      };
    }
    case accountConstants.EDIT_INSTITUTE_SUCCESS: {
      return {
        ...state,
        editInstitute: false,
      };
    }
    case accountConstants.EDIT_INSTITUTE_FAIL: {
      return {
        ...state,
        editInstitute: false,
      };
    }

    default: {
      return state;
    }
  }
}
