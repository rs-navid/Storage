import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Invoice from "./Invoice";

const Invoices = () => {
  useEffect(() => {
    document.title = `مدیریت صورت حساب ها`;
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={[`مدیریت صورت حساب ها`]} panels={[Invoice]} hash={["invoices"]} />
    </div>
  );
};

export default Invoices;
