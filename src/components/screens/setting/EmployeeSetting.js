import React, { useState } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";

const EmployeeSetting = () => {
  const [employee, setEmployee] = useState({});

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>مدیر آزمایشگاه:</label>
        <Input placeholder="مدیر آزمایشگاه" type="text" name="manager" onChange={handleChange} />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>مدیر فنی آزمایشگاه:</label>
        <Input placeholder="مدیر فنی آزمایشگاه" type="text" name="technical" onChange={handleChange} />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>کارشناس آزمون شیمی:</label>
        <Input placeholder="کارشناس آزمون شیمی" type="text" name="chemist" onChange={handleChange} />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>کارشناس آزمون میکروبی:</label>
        <Input placeholder="کارشناس آزمون میکروبی" type="text" name="microbiologist" onChange={handleChange} />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>کارشناس آزمون سلولزی:</label>
        <Input placeholder="کارشناس آزمون سلولزی" type="text" name="cellulose" onChange={handleChange} />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>کارشناس آزمون بسته بندی:</label>
        <Input placeholder="کارشناس آزمون بسته بندی" type="text" name="packing" onChange={handleChange} />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50">
        <label>کارشناس آزمون محیط زیست:</label>
        <Input placeholder="کارشناس آزمون محیط زیست" type="text" name="environment" onChange={handleChange} />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <Button icon labelPosition="right" color="blue">
          ثبت
          <Icon name="save" />
        </Button>
    </Form>
  );
};

export default EmployeeSetting;
