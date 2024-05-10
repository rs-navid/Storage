import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Storage from "./Storage";

const Storages = () => {
  useEffect(() => {
    document.title = "مدیریت انبارها";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت انبارها"]} panels={[Storage]} hash={["storages"]} />
    </div>
  );
};

export default Storages;
