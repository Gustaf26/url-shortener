import React, { useState } from "react";

const urlContext = React.createContext();

const UrlContext = () => {
  const [urlsList, setUrlsList] = useState([]);

  return (
    <div>
      <urlContext.Consumer
        value={{ urlsList: urlsList, setUrlsList: setUrlsList }}
      ></urlContext.Consumer>
    </div>
  );
};

export default UrlContext;
