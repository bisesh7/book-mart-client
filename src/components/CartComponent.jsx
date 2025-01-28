// Cart.js
import React from "react";
import { Container, ListGroup, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/slices/cartSlice";
import "../styles/Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const calculateTotalCost = () => {
    return cartItems.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  };

  return (
    <Container className="mt-4 cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ListGroup className="cart-list">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.title}</strong> - ${item.cost} each
                  <br />
                  Quantity: {item.quantity}
                </div>
                <div className="cart-item-actions">
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </Button>{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="cart-total">
            <hr />
            <p className="d-flex justify-content-end">
              Total Cost:
              <Badge bg="success" className="ms-2">
                ${calculateTotalCost().toFixed(2)}
              </Badge>
            </p>
            <div className="d-flex justify-content-center">
              <Button variant="primary">Checkout</Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
