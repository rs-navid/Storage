import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import Exam from "./Exam";

const Clients = () => {
  useEffect(() => {
    document.title = "مدیریت آزمون ها";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت آزمون ها"]} panels={[Exam]} hash={["exams"]} />
    </div>
  );
};

export default Clients;
