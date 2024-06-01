import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  createBook,
  fetchBookById,
  updateBook,
} from "../features/books/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const book = useSelector((state) => state.books.book);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
    image: "",
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (id !== "0") {
      dispatch(fetchBookById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (book && id !== "0") {
      setFormData({
        id: book.id || "",
        title: book.title || "",
        description: book.description || "",
        price: book.price || "",
        author: book.author || "",
        image: book.image || "",
      });
    }
  }, [book, id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        if (id === "0") {
          await dispatch(createBook(formData)).unwrap();
        } else {
          await dispatch(updateBook({ id, data: formData })).unwrap();
        }
        navigator("/books");
      } catch (error) {
        console.error("Error saving book:", error);
      }
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="container"
    >
      <Row className="my-3">
        <Form.Group as={Col} md="6" controlId="validationID">
          <Form.Label>Book Id</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Book ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            minLength={4}
            readOnly={id !== "0"} // Make ID read-only for updates
          />
          <Form.Control.Feedback type="invalid">
            Please provide a book ID.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="my-3">
        <Form.Group as={Col} md="6" controlId="validationTitle">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Book Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            minLength={4}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a book title with more than 3 characters.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationDescription">
          <Form.Label>Book Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            placeholder="Book Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            minLength={16}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a description with more than 15 characters.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationPrice">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Book Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={1}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a price greater than 0.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide an author name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            required
            type="url"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid URL for the book image.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">{id > 0 ? "Update Book" : "Add Book"}</Button>
    </Form>
  );
}

export default BookForm;
