import axios from "axios";

const baseUrl = "http://localhost:5000";

const getBooks = () => axios.get(`${baseUrl}/books`);
const getBooksById = (id) => axios.get(`${baseUrl}/books/${id}`);
const createBook = (data) => axios.post(`${baseUrl}/books`, data);
const updateBook = (id, data) => axios.put(`${baseUrl}/books/${id}`, data);
const deleteBook = (id) => axios.delete(`${baseUrl}/books/${id}`);
const searchBooks = (title) =>
  axios.get(`${baseUrl}/books?title_like=${title}`);

const register = (userData) => axios.post(`${baseUrl}/users`, userData);

export {
  getBooks,
  getBooksById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  register,
};
