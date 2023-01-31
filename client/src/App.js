import logo from "./assets/logo.png";
import LimitedUrl from "./components/LimitedUrl";
import { useState, useEffect } from "react";

import "./App.css";
// I use some bootstrap for easy styling
import "bootstrap/dist/css/bootstrap.min.css";
import UrlsForm from "./components/UrlsForm";

// In order to run this app (the frontend) you need to install the dependencies with npm install
// in this folder

// Once that is done, just run the app writing "npm start" in the terminal
function App() {
  const [urlsList, setUrlsList] = useState([]);
  const [limitedUrls, setLimitedUrls] = useState([]);

  // This effect will filter the urls that have a time limit
  useEffect(() => {
    if (urlsList.length > 0) {
      let filteredUrls = urlsList.filter((urlobj) => urlobj.timelimit > 0);
      setLimitedUrls(filteredUrls);
    }
  }, [urlsList]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <UrlsForm urlsList={urlsList} setUrlsList={setUrlsList} />

      {/* The links without time limit will show in this container */}
      <div id="unlimited-container">
        <h5>Icke-temporära links: </h5>
        {urlsList.length > 0
          ? urlsList.map((urlobj) => {
              if (!urlobj.timelimit > 0) {
                return (
                  <div id={urlobj._id}>
                    <a
                      exact="true"
                      href={`${urlobj.redirecturl}`}
                      target="_blank"
                    >
                      {urlobj.shortenedurl}
                    </a>
                  </div>
                );
              }
            })
          : null}
      </div>
      {/* The links with time limit will have an own component that renders for 60 secs */}
      <div id="limited-container">
        <h5>Temporära links -bara 60 sek: </h5>
        {limitedUrls.length > 0
          ? limitedUrls.map((urlobj) => {
              if (urlobj.timelimit > 0) {
                return <LimitedUrl urlobj={urlobj}></LimitedUrl>;
              }
            })
          : null}
      </div>
    </div>
  );
}

export default App;
