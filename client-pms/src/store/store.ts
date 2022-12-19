import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query'

import {pmsApi} from "../service/root";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pmsApi.reducerPath]: pmsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pmsApi.middleware),
});

setupListeners(store.dispatch)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
