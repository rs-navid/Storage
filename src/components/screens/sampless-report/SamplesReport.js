import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import SampleReport from "./SampleReport"

const SamplesReport = () => {
  useEffect(() => {
    document.title = `گزارش نمونه ها`;
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={[`گزارش نمونه ها`]} panels={[SampleReport]} hash={["samplesReport"]} />
    </div>
  );
};

export default SamplesReport;
