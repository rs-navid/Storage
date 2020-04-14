import React, { useState, useEffect } from "react";
import { Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import lodash from "lodash";

import { getSetting, saveSetting } from "../../../store/actions/settingActions";

const ContactSetting = (props) => {
  const [contact, setContact] = useState({
    state: "",
    city: "",
    address: "",
    zipCode: "",
    phone: "",
    fax: "",
    web: "",
    email: "",
  });

  // Component did mount
  useEffect(() => {
    let isCancelled = false;
    const loadSetting = async () => {
      const result = await props.getSetting("contact");
      if (!isCancelled  && !lodash.isEmpty(result)) {
        setContact(result);
      }
    };

    loadSetting();

    // Component will unmount
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    props.saveSetting({ contact: contact });
  };

  return (
    <div>
      <Form>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>استان:</label>
          <Input placeholder="استان" type="text" name="state" value={contact.state} onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>شهر:</label>
          <Input placeholder="شهر" type="text" name="city" value={contact.city} onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-100 label-sm">
          <label>آدرس:</label>
          <TextArea placeholder="آدرس" name="address" value={contact.address} onChange={handleChange} />
        </div>
        <div className="field-wrapper field-100 label-sm">
          <label>کد پستی:</label>
          <Input
            type="text "
            placeholder="کد پستی"
            name="zipCode"
            value={contact.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>تلفن:</label>
          <Input placeholder="تلفن" type="text" name="phone" value={contact.phone} onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>فکس:</label>
          <Input placeholder="فکس" type="text" name="fax" value={contact.fax} onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>وب سایت:</label>
          <Input placeholder="وب سایت" type="text" name="web" value={contact.web} onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>ایمیل:</label>
          <Input placeholder="ایمیل" type="text" name="email" value={contact.email} onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <Button icon labelPosition="right" color="blue" onClick={handleSave}>
          ثبت
          <Icon name="save" />
        </Button>
      </Form>
    </div>
  );
};

export default connect(null, { getSetting, saveSetting })(ContactSetting);
