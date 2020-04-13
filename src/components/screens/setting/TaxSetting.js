import React, { useState } from "react";
import { Form, Input, TextArea, Button, Icon } from "semantic-ui-react";

const TaxSetting = () => {
  const [tax, setTax] = useState({});

  const handleChange = (e) => {
    setTax({
      ...tax,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="field-wrapper field-100 label-sm">
        <label>مالیات:</label>
        <Input type="number " placeholder="مالیات" name="tax" onChange={handleChange} />
      </div>
      <Button icon labelPosition="right" color="blue">
        ثبت
        <Icon name="save" />
      </Button>
    </div>
  );
};

export default TaxSetting;
