import React from "react";
import { Input } from "semantic-ui-react";

const ContactSetting = () => {
  return (
    <div>
      <div className="field-wrapper field-50 right-50">
        <label>کلمه عبور فعلی:</label>
        <Input placeholder="کلمه عبور فعلی" type="password" name="password" />
      </div>
      <div className="field-wrapper field-50 left-50">
        <label>کلمه عبور فعلی:</label>
        <Input placeholder="کلمه عبور فعلی" type="password" name="password" />
      </div>
    </div>
  );
};

export default ContactSetting;
