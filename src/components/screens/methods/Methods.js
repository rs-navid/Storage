import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Method from "./Method";

const Methods = () => {
  useEffect(() => {
    document.title = "مدیریت روش های آزمون";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت روش های آزمون"]} panels={[Method]} hash={["method"]} />
    </div>
  );
};

export default Methods;
