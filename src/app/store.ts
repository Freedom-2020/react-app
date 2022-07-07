import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import agentReducer from '../page/AgentSlice';
import formEdit from '../page/Form/FormEditSlice'

export const store = configureStore({
  reducer: {
    agent: agentReducer,
    formEdit: formEdit
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
