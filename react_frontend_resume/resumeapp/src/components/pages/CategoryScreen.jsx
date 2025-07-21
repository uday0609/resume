// src/components/CategoryScreen.js
import React from 'react';
import { Button, ListGroup, Container, Row, Col, Alert } from 'react-bootstrap';
import { ChatDots, CreditCard, Gear, PersonCircle } from 'react-bootstrap-icons';

const categories = [
  { name: 'General', icon: <ChatDots size={20} className="me-2" /> },
  { name: 'Billing', icon: <CreditCard size={20} className="me-2" /> },
  { name: 'Technical', icon: <Gear size={20} className="me-2" /> },
  { name: 'Account', icon: <PersonCircle size={20} className="me-2" /> },
];

const CategoryScreen = ({ onSelect }) => {
  return (
    <Container className="mt-2">
      <Alert variant="info" className="text-center">
        <h5 className="mb-1">Welcome!</h5>
        <p className="mb-0">Select a category below to find quick answers to your questions.</p>
      </Alert>

      <ListGroup>
        {categories.map((cat) => (
          <ListGroup.Item key={cat.name} className="p-0 border-0 mb-3">
            <Button
              variant="outline-primary"
              onClick={() => onSelect(cat.name)}
              className="w-100 d-flex align-items-center justify-content-start py-3 px-4 shadow-sm"
            >
              {cat.icon}
              <span className="fw-semibold">{cat.name}</span>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default CategoryScreen;
