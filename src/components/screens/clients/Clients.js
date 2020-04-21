import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Client from "./Client";

const Clients = () => {
  useEffect(() => {
    document.title = "مدیریت مشتریان";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت مشتریان"]} panels={[Client]} hash={["client"]} />
    </div>
  );
};

export default Clients;
