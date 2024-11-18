import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bookmark {
  id: string; // ID unik gambar/video
  url: string; // URL gambar/video
  user: string; // Nama user yang mengunggah
  tags: string; // Tag gambar/video
}

interface BookmarkState {
  bookmarks: Bookmark[]; // Daftar bookmark
}

const initialState: BookmarkState = {
  bookmarks: [], // Awalnya kosong
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      const exists = state.bookmarks.some(
        (bookmark) => bookmark.id === action.payload.id
      );
      if (!exists) {
        state.bookmarks.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
