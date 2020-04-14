import React, { useEffect } from "react";
import Tab from "../../UI/tabular/Tabular";

import Period from './Period'

const Periods = () => {
  useEffect(() => {
    document.title = "مدیریت دوره ها";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت دوره ها"]} panels={[Period]} hash={["period"]} />
    </div>
  );
};

export default Periods;
