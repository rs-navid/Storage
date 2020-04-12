import React, { useEffect } from "react";
import Tab from "../../UI/tabular/Tabular";

import ChangePassword from "./ChangePassword";
import ChangePeriod from "./ChangePeriod";

const UserSetting = () => {
  useEffect(() => {
    document.title = "تنظیمات کاربر";
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Tab
        tabs={["تغییر کلمه عبور", "تغییر دوره"]}
        panels={[ChangePassword, ChangePeriod]}
        hash={["password", "period"]}
      />
    </div>
  );
};

export default UserSetting;
