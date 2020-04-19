import React, { useEffect } from "react";

import Tab from "../../UI/tabular/Tabular";
import User from "./User";

const Users = () => {
  useEffect(() => {
    document.title = "مدیریت کاربران";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["مدیریت کاربران"]} panels={[User]} hash={["user"]} />
    </div>
  );
};

export default Users;
