import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  }
);

export const createBook = createAsyncThunk("books/createBook", async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, data }) => {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
  return id;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.book = action.payload;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        state.books[index] = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
