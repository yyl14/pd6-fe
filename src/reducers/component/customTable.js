import { combineReducers } from 'redux';
import { customTableConstant } from '../../actions/component/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case customTableConstant.CUSTOM_TABLE_MOUNT: {
      const { tableId } = action.payload;
      return { ...state, [tableId]: { id: tableId, displayedDataIds: new Map([]) } };
    }
    case customTableConstant.CUSTOM_TABLE_UPDATE: {
      const {
        tableId, offset, limit, data, total_count,
      } = action.payload;
      if (tableId === state.id) {
        return {
          ...state,
          [tableId]: {
            ...state[tableId],
            // update data ids in range [offset, offset + limit - 1]
            totalCount: total_count,
            displayedDataIds: data.reduce((acc, item, index) => {
              acc.set(offset + index, item.id);
              return acc;
            }, state[tableId].displayedDataIds),
          },
        };
      }

      // not own action
      return state;
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case customTableConstant.CUSTOM_TABLE_MOUNT: {
      const { tableId } = action.payload;
      return [...new Set([...state], [tableId])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
