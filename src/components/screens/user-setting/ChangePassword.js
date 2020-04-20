import React, { useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { showDialog } from "../../../store/actions/dialogActions";
import { changePassword } from "../../../store/actions/userActions";

const ChangePassword = (props) => {
  const [passwords, setPasswords] = useState({ password: null, newPassword: null, newPasswordConfirm: null });

  const inputHandler = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const saveHandler = () => {
    if (!passwords.password) {
      props.showDialog({ title: "خطا", text: "کلمه عبور فعلی معتبر نمی باشد." });
    } else if (!passwords.newPassword || !passwords.newPasswordConfirm) {
      props.showDialog({ title: "خطا", text: "کلمه عبور جدید یا تکرار آن معتبر نمی باشد." });
    } else if (passwords.newPassword !== passwords.newPasswordConfirm) {
      props.showDialog({ title: "خطا", text: "کلمات عبور جدید یکسان نمی باشند." });
    } else if (passwords.newPassword.length < 8) {
      props.showDialog({ title: "خطا", text: "کلمه عبور باید حداقل 8 کاراکتر باشد." });
    } else {
      props.changePassword(passwords.password, passwords.newPassword);
    }
  };

  return (
    <div>
      <div className="field-wrapper field-100">
        <label>کلمه عبور فعلی:</label>
        <Input placeholder="کلمه عبور فعلی" type="password" name="password" onChange={inputHandler} />
      </div>
      <div className="field-wrapper field-100">
        <label>کلمه عبور جدید:</label>
        <Input placeholder="کلمه عبور جدید" type="password" name="newPassword" onChange={inputHandler} />
      </div>
      <div className="field-wrapper field-100">
        <label>تکرار کلمه عبور جدید:</label>
        <Input placeholder="تکرار کلمه عبور جدید" type="password" name="newPasswordConfirm" onChange={inputHandler} />
      </div>
      <Button icon labelPosition="right" color="blue" onClick={saveHandler}>
        ثبت
        <Icon name="save" />
      </Button>
    </div>
  );
};

export default connect(null, { showDialog, changePassword })(ChangePassword);
