import { combineReducers } from 'redux';
import { autoTableConstants } from '../../actions/component/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case autoTableConstants.AUTO_TABLE_MOUNT: {
      const { tableId } = action.payload;
      return { ...state, [tableId]: { id: tableId, totalCount: 0, displayedDataIds: new Map([]) } };
    }
    case autoTableConstants.AUTO_TABLE_UPDATE: {
      const {
        tableId, offset, dataIds, total_count,
      } = action.payload;
      if (state[tableId]) {
        // exists table
        return {
          ...state,
          [tableId]: {
            ...state[tableId],
            // update data ids in range [offset, offset + limit - 1]
            totalCount: total_count,
            displayedDataIds: dataIds.reduce((acc, item, index) => {
              acc.set(offset + index, item.id);
              return acc;
            }, state[tableId].displayedDataIds),
          },
        };
      }

      // not registered table
      return state;
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case autoTableConstants.AUTO_TABLE_MOUNT: {
      const { tableId } = action.payload;
      return [...new Set([...state], [tableId])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
