import React, { useState } from "react";
import { Form, Input, TextArea, Button, Icon } from "semantic-ui-react";

const ContactSetting = () => {
  const [contact, setContact] = useState({});

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Form>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>استان:</label>
          <Input placeholder="استان" type="text" name="state" onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>شهر:</label>
          <Input placeholder="شهر" type="text" name="city" onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-100 label-sm">
          <label>آدرس:</label>
          <TextArea placeholder="آدرس" name="address" onChange={handleChange} />
        </div>
        <div className="field-wrapper field-100 label-sm">
          <label>کد پستی:</label>
          <Input type="text " placeholder="کد پستی" name="zipCode" onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>تلفن:</label>
          <Input placeholder="تلفن" type="text" name="phone" onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>فکس:</label>
          <Input placeholder="فکس" type="text" name="fax" onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>وب سایت:</label>
          <Input placeholder="وب سایت" type="text" name="web" onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>ایمیل:</label>
          <Input placeholder="ایمیل" type="text" name="email" onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <Button icon labelPosition="right" color="blue">
          ثبت
          <Icon name="save" />
        </Button>
      </Form>
    </div>
  );
};

export default ContactSetting;
