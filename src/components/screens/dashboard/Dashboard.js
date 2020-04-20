import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Tab from "../../UI/tabular/Tabular";

import { getUserInfo } from "../../../store/actions/userActions";

const Dashboard = () => {
  useEffect(() => {
    document.title = "داشبورد";
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Tab tabs={["داشبورد"]} panels={[DashboardContent]} hash={["dashboard"]} />
    </div>
  );
};

let DashboardContent = (props) => {
  const [info, setInfo] = useState({ name: "", username: "", period: "" });

  // Component did mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    const results = await props.getUserInfo();
    if (results) {
      setInfo(results);
    }
  };

  return (
    <div className="dashboard-screen">
      <div className="field-wrapper field-50 right-50">
        <label>نام و نام خانوادگی:</label>
        <Input type="text" value={info.name} disabled />
      </div>
      <div className="field-wrapper field-50 left-50 label-sm">
        <label>نام کاربری:</label>
        <Input type="text" value={info.username} disabled />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>

      <div className="field-wrapper field-50 right-50">
        <label>نام دوره:</label>
        <Input type="text" value={info.period} disabled />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <Link to={{ pathname: "/usersetting" }}>
        <Button icon labelPosition="right" color="blue" size="small">
          تغییر کلمه عبور
          <Icon name="key" />
        </Button>
      </Link>
      <Link to={{ pathname: "/usersetting", hash: "#period" }}>
        <Button icon labelPosition="right" color="blue" size="small">
          تغییر دوره
          <Icon name="time" />
        </Button>
      </Link>
    </div>
  );
};

DashboardContent = connect(null, { getUserInfo })(DashboardContent);
export default Dashboard;
