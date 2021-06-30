import {} from '../actions/constant';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function auth(state = initialState, payload) {
  switch (payload.type) {
    default:
      return state;
  }
}
