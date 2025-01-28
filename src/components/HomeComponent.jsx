import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  setFeaturedBooks,
  setLatestBooks,
} from "../redux/slices/booksSlice";
import { Link } from "react-router-dom";
import "../styles/Login.scss";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks()).then(() => {
      dispatch(setFeaturedBooks());
      dispatch(setLatestBooks());
    });
  }, [dispatch]);

  const featuredBooks = useSelector((state) => state.book.featuredBooks);
  const latestBooks = useSelector((state) => state.book.latestBooks);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home-container">
      <section
        className="hero"
        style={{
          backgroundImage: `url('https://w0.peakpx.com/wallpaper/127/366/HD-wallpaper-books-on-bookshelf.jpg')`,
        }}
      >
        <Container className="welcome-text">
          <h1>Welcome to My Book Market</h1>
          <p>
            Your one-stop destination for discovering and exploring new books.
          </p>
          <Link to="/signup">
            <Button variant="primary" hidden={user}>
              Get Started
            </Button>
          </Link>
        </Container>
      </section>

      <section className="featured-section mt-3">
        <Container>
          <h2>Featured Books</h2>
          <Row className="featured-section-row">
            {featuredBooks.map((book) => (
              <Col key={book.id} md={4}>
                <Card className="h-100 d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={book.imageLinks.thumbnail}
                    alt={book.title}
                  />
                  <Card.Body className="flex-grow-1">
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="latest-releases-section mt-3 pb-4">
        <Container>
          <h2>Latest Releases</h2>
          <Row className="featured-section-row">
            {latestBooks.map((book) => (
              <Col key={book.id} md={4}>
                <Card className="h-100 d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={book.imageLinks.thumbnail}
                    alt={book.title}
                  />
                  <Card.Body className="flex-grow-1">
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
