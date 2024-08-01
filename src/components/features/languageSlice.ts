import { createSlice } from '@reduxjs/toolkit';

const initialLocale = 'en'

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    locale: initialLocale,
  },
  reducers: {
    setLanguage(state, action) {
      state.locale = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
