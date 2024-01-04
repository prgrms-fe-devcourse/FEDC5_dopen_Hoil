import { createSlice } from '@reduxjs/toolkit';

interface MyModalState {
  isOpen: boolean;
}

const initialState: MyModalState = {
  isOpen: false,
};

export const myModalSlice = createSlice({
  name: 'myModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = myModalSlice.actions;

export default myModalSlice.reducer;
