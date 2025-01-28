// SignUp.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/slices/authSlice";
import "../styles/SignUp.scss";
import { useNavigate } from "react-router-dom";

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigateTo = useNavigate();

  const handleSignUp = (values) => {
    dispatch(signUp(values)).then(navigateTo("/login"));
  };

  return (
    <Container className="mt-4 signup-container">
      <Row className="justify-content-md-center align-items-center vh-100">
        <Col md={6}>
          <h2>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
