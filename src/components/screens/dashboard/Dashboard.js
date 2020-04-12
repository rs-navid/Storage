import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "داشبورد";
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
