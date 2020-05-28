import React, { useEffect, useState } from "react";

import Tab from "../../UI/tabular/Tabular";
import Result from "./Result";
import qs from "query-string";
import { withRouter } from "react-router-dom";

const Results = (props) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    let query = qs.parse(props.location.search);
    setTitle(query.title);
    document.title = `نتایج ${query.title}`;
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={[`نتایج ${title}`]} panels={[Result]} hash={["results"]} />
    </div>
  );
};

export default withRouter(Results);
