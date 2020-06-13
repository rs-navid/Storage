import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import RequestReport from "./RequestReport";

const RequestsReport = () => {
  useEffect(() => {
    document.title = `گزارش درخواست ها`;
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={[`گزارش درخواست ها`]} panels={[RequestReport]} hash={["requestsReport"]} />
    </div>
  );
};

export default RequestsReport;
