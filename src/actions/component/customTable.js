import { customTableConstant } from './constant';

export const customTableMount = (tableId) => (dispatch) => {
  dispatch({ type: customTableConstant.CUSTOM_TABLE_MOUNT, payload: { tableId } });
};

export const somethingElse = 0;
