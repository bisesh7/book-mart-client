// Discover.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Badge,
  Spinner,
} from "react-bootstrap";
import "../styles/Discover.scss";
import { addToCart, decreaseQuantity } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

const Discover = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((state) => state.book);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const handleDecreaseQuantity = (bookId) => {
    dispatch(decreaseQuantity(bookId));
  };

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Container className="mt-4">
      <h2>Discover New Books</h2>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="text-danger mt-3">Error loading books: {error}</div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {currentBooks.map((book) => {
              const isInCart = cartItems.some((item) => item.id === book.id);
              return (
                <Col key={book.id} className="mb-4">
                  <Card className="h-100 d-flex flex-column">
                    <Card.Img
                      variant="top"
                      src={book.imageLinks.thumbnail}
                      alt={book.title}
                      className="book-image"
                    />
                    <Card.Body className="flex-grow-1">
                      <Card.Title className="mb-2">{book.title}</Card.Title>
                      <Card.Subtitle className="mb-3 text-muted">
                        {book.author}
                      </Card.Subtitle>
                      <p>Cost: ${book.cost}</p>
                      <Button
                        variant="primary"
                        className="mb-2 me-2"
                        hidden={!user}
                        onClick={() => handleAddToCart(book)}
                      >
                        {
                          <>
                            <span>Add to Cart</span>{" "}
                            <Badge bg="danger">
                              {
                                cartItems.find((item) => item.id === book.id)
                                  ?.quantity
                              }
                            </Badge>
                          </>
                        }
                      </Button>{" "}
                      {isInCart && (
                        <Button
                          variant="danger"
                          className="mb-2"
                          hidden={!user}
                          onClick={() => handleDecreaseQuantity(book.id)}
                        >
                          -
                        </Button>
                      )}
                      <Link
                        to={`/book/${book.id}`}
                        className={classNames({
                          "btn btn-secondary mb-2": true,
                          "ms-2": isInCart,
                        })}
                      >
                        Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <div className="d-flex justify-content-center">
            <Pagination>
              {[...Array(Math.ceil(books.length / itemsPerPage))].map(
                (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </div>
        </>
      )}
    </Container>
  );
};

export default Discover;
