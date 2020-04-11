import React from "react";
import Tab from "../../UI/tabular/Tabular";

import ChangePassword from "./ChangePassword";
import ChangePeriod from "./ChangePeriod";

const UserSetting = () => {
  return (
    <div>
      <Tab tabs={["تغییر کلمه عبور", "تغییر دوره",]} panels={[ChangePassword, ChangePeriod]} />
    </div>
  );
};

export default UserSetting;
