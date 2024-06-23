import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Unit from "./Unit";

const Packs = () => {
  useEffect(() => {
    document.title = "مدیریت واحد های اندازه گیری";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت واحد های اندازه گیری"]} panels={[Unit]} hash={["units"]} />
    </div>
  );
};

export default Packs;
