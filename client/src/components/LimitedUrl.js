import { useEffect, useState } from "react";

function LimitedUrl({ urlobj }) {
  const [rendering, setRendering] = useState(true);

  // After 60 secs of mounting the component, the content (<a>) will disappear
  useEffect(() => {
    setTimeout(() => {
      setRendering(false);
    }, 60000);
  }, []);

  return (
    <div id={urlobj._id}>
      {rendering && (
        <a exact="true" href={`${urlobj.redirecturl}`} target="_blank">
          {urlobj.shortenedurl}
        </a>
      )}
    </div>
  );
}

export default LimitedUrl;
