import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Pack from "./Pack";

const Packs = () => {
  useEffect(() => {
    document.title = "مدیریت بسته بندی ها";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت بسته بندی ها"]} panels={[Pack]} hash={["packs"]} />
    </div>
  );
};

export default Packs;
