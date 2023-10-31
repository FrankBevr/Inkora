import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'

// Now we are mocking logic
const { create: actualCreate } = await vi.importActual('zustand')

// initialise variable to hold the reset functions
const storeResetFns = new Set();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (createState) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};


// Reset all stores after each test run
beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});
