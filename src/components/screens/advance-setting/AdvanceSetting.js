import React, { useEffect } from "react";
import Tab from "../../UI/tabular/Tabular";

import Info from "./Info";


const Setting = () => {
  useEffect(() => {
    document.title = "تنظیمات پیشرفته";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab
        tabs={["تنظیمات پیشرفته"]}
        panels={[Info]}
        hash={["advance"]}
      />
    </div>
  );
};

export default Setting;
