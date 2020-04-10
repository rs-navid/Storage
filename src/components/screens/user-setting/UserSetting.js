import React from "react";
import { Tab } from "semantic-ui-react";

import ChangePassword from "./ChangePassword";
import ChangePeriod from "./ChangePeriod";

const panes = [
  {
    menuItem: "تغییر کلمه عبور",
    render: () => (
      <Tab.Pane>
        <ChangePassword />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "تغییر دوره",
    render: () => (
      <Tab.Pane>
        <ChangePeriod />
      </Tab.Pane>
    ),
  },
];

const UserSetting = () => {
  return (
    <div className="card">
      <Tab panes={panes} />
    </div>
  );
};

export default UserSetting;
