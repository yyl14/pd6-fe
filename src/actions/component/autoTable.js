import { autoTableConstants } from './constant';

export const customTableMount = (tableId) => (dispatch) => {
  dispatch({ type: autoTableConstants.AUTO_TABLE_MOUNT, payload: { tableId } });
};

export const somethingElse = 0;
