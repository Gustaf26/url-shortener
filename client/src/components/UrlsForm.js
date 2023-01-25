import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Form, Button } from "react-bootstrap";

const UrlsForm = () => {
  return (
    <div id="my-urls-container" className="form-container container">
      <Form className="signup-form" id="my-urls-form">
        <p>Enter a valid url</p>
        <Form.Group>
          <Form.Control
            className="name-input mb-4"
            type="text"
            placeholder="url name"
            name="name"
          ></Form.Control>
          <Form.Check
            type="checkbox"
            label="Time-limited url"
            className="d-flex justify-content-center mb-4 p-3"
          />
          <Button className="submit-button" value="submit" type="submit">
            submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default UrlsForm;
