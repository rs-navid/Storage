import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Request from "./Request";

const Requests = () => {
  useEffect(() => {
    document.title = "مدیریت درخواست ها";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت درخواست ها"]} panels={[Request]} hash={["requests"]} />
    </div>
  );
};

export default Requests;
