import React from "react";
import { Form } from "react-bootstrap";
import '../../src/styles.css'

const SearchBar = ({ onSearchChange }) => {
  return (
    <Form.Group className="mt-4">
      <Form.Label>Search:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type to search..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default SearchBar;