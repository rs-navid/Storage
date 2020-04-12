import React, { useEffect } from "react";
import Tab from "../../UI/tabular/Tabular";

import ContactSetting from "./ContactSetting";
import EmployeeSetting from "./EmployeeSetting";
import FormSetting from "./FormSetting";
import TaxSetting from "./TaxSetting";

const Setting = () => {
  useEffect(() => {
    document.title = "تنظیمات";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab
        tabs={["تنظیمات آزمایشگاه", "تنظیمات پرسنل", "تنظیمات فرم ها", "تنظیمات مالیات"]}
        panels={[ContactSetting, EmployeeSetting, FormSetting, TaxSetting]}
        hash={["contact", "employee", "forms", "tax"]}
      />
    </div>
  );
};

export default Setting;
