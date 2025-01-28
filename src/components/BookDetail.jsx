// BookDetail.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../redux/slices/cartSlice";
import { fetchBookById } from "../redux/slices/booksSlice";
import "../styles/BookDetail.scss";

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.book);
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === id);
  const cartItem = cartItems.find((item) => item.id === id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchBookById(id));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title: book.volumeInfo.title,
        imageUrl: book.volumeInfo.imageLinks?.large,
        cost: Math.floor(Math.random() * 50) + 1, // Add a random cost for the book
      })
    );
  };

  const handleDecreaseQuantity = () => {
    if (cartItem?.quantity === 1) {
      // If the quantity is 1, remove the item from the cart
      dispatch(removeFromCart(id));
    } else {
      // Otherwise, decrease the quantity
      dispatch(decreaseQuantity(id));
    }
  };

  if (!book) {
    // Loading state or book not found
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <p className="text-danger">Error loading book: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4 book-detail-container">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={book.volumeInfo.imageLinks?.large}
              alt={book.volumeInfo.title}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{book.volumeInfo.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {book.volumeInfo.authors.map((x, i) => {
                  if (i !== x.length - 1) {
                    return <span>{x} </span>;
                  } else {
                    return <span>{x},</span>;
                  }
                })}
              </Card.Subtitle>
              <Card.Text
                style={{ overflowY: "auto", maxHeight: "458px" }}
                dangerouslySetInnerHTML={{
                  __html: book.volumeInfo.description,
                }}
              />
              <Button
                variant="primary"
                className="mt-auto"
                onClick={handleAddToCart}
              >
                {isInCart ? (
                  <>
                    <span>Added to Cart</span>{" "}
                    <Badge bg="danger">{cartItem?.quantity}</Badge>
                  </>
                ) : (
                  "Add to Cart"
                )}
              </Button>{" "}
              {isInCart && (
                <Button
                  variant="danger"
                  className="mt-auto"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetail;
