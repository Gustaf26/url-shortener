import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Form, Button } from "react-bootstrap";

const UrlsForm = ({ setUrlsList }) => {
  const [timeLimited, setTimeLimited] = useState(false);
  const urlValue = useRef();

  const submitUrl = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/record", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        url: urlValue.current.value,
        time_limit: timeLimited ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        //The global urls list is updated with the result / response of the post request
        setUrlsList((prev) => [...prev, res]);
        urlValue.current.value = "";
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="my-urls-container" className="form-container container">
      <Form
        className="signup-form"
        id="my-urls-form"
        onSubmit={(e) => submitUrl(e)}
      >
        <p>Enter a valid url</p>
        <Form.Group>
          <Form.Control
            className="name-input mb-4"
            type="text"
            placeholder="url name"
            name="name"
            ref={urlValue}
          ></Form.Control>
          <Form.Check
            type="checkbox"
            label="Time-limited url"
            className="d-flex justify-content-center mb-4 p-3"
            // This attribute will deter if the url is temporary or constant
            onChange={() => setTimeLimited(!timeLimited)}
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
