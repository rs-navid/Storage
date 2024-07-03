import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Object from "./Object";

const Objects = () => {
  useEffect(() => {
    document.title = "مدیریت کالاها";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت کالاها"]} panels={[Object]} hash={["objects"]} />
    </div>
  );
};

export default Objects;
