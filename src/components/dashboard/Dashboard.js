import React, { useState } from "react";

import Header from "../UI/header/Header";
import Sidebar from "../UI/sidebar/Sidebar";

const Dashboard = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  return (
    <div>
      <Header onClick={setActiveSidebar} />
      <Sidebar active={activeSidebar} onClick={setActiveSidebar} />
      Dashboard
    </div>
  );
};

export default Dashboard;
