import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Storage from "./Storage";

const Storages = () => {
  useEffect(() => {
    document.title = "موجودی انبار";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["موجودی انبار"]} panels={[Storage]} hash={["storages"]} />
    </div>
  );
};

export default Storages;
