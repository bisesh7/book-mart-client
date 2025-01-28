import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/Login.scss"; // Add your custom styles
import { login } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();

  const handleLogin = (values) => {
    dispatch(login(values)).then((res) => {
      console.log(res);
      if (!res.error) {
        navigateTo("/");
      } else {
        console.log(error);
      }
    });
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          {error && <Alert variant="danger">{error}</Alert>}
          <h2>Login</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* Formik form fields go here */}
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Field
                    type="email"
                    name="username"
                    as={Form.Control}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Field
                    type="password"
                    name="password"
                    as={Form.Control}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
          <div className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
