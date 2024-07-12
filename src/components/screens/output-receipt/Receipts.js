import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Receipt from "./Receipt";

const Receipts = () => {
  useEffect(() => {
    document.title = "رسید خروج کالا";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["رسید خروج کالا"]} panels={[Receipt]} hash={["receipts"]} />
    </div>
  );
};

export default Receipts;
