// src/store/store.js

import { createStore } from 'redux'; // Import createStore from redux

// Define your initial state and reducer functions
const initialState = {
  // Define your initial state properties here
};

const reducer = (state = initialState, action) => {
  // Define your reducer logic here
  return state;
};

// Create the Redux store
const store = createStore(reducer);

export default store;
