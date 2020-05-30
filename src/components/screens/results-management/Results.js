import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Result from "./Result";

const Results = () => {
  useEffect(() => {
    document.title = `مدیریت نتایج`;
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={[`مدیریت نتایج`]} panels={[Result]} hash={["results"]} />
    </div>
  );
};

export default Results;
