import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import lodash from "lodash";

import { getSetting, saveSetting } from "../../../store/actions/settingActions";

const EmployeeSetting = (props) => {
  const [employee, setEmployee] = useState({
    manager: "",
    technical: "",
    chemist: "",
    microbiologist: "",
    cellulose: "",
    packing: "",
    environment: "",
  });

  // Component did mount
  useEffect(() => {
    const loadSetting = async () => {
      const result = await props.getSetting("employee");

      if (!lodash.isEmpty(result)) {
        setEmployee(result);
      }
    };

    loadSetting();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    props.saveSetting({ employee: employee });
  };

  return (
    <Form>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>مدیر آزمایشگاه:</label>
        <Input
          placeholder="مدیر آزمایشگاه"
          type="text"
          name="manager"
          value={employee.manager}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>مدیر فنی آزمایشگاه:</label>
        <Input
          placeholder="مدیر فنی آزمایشگاه"
          type="text"
          name="technical"
          value={employee.technical}
          onChange={handleChange}
        />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>کارشناس آزمون شیمی:</label>
        <Input
          placeholder="کارشناس آزمون شیمی"
          type="text"
          name="chemist"
          value={employee.chemist}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>کارشناس آزمون میکروبی:</label>
        <Input
          placeholder="کارشناس آزمون میکروبی"
          type="text"
          name="microbiologist"
          value={employee.microbiologist}
          onChange={handleChange}
        />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>کارشناس آزمون سلولزی:</label>
        <Input
          placeholder="کارشناس آزمون سلولزی"
          type="text"
          name="cellulose"
          value={employee.cellulose}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>کارشناس آزمون بسته بندی:</label>
        <Input
          placeholder="کارشناس آزمون بسته بندی"
          type="text"
          name="packing"
          value={employee.packing}
          onChange={handleChange}
        />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50">
        <label>کارشناس آزمون محیط زیست:</label>
        <Input
          placeholder="کارشناس آزمون محیط زیست"
          type="text"
          name="environment"
          value={employee.environment}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper field-50 left-50">
        <label>کارشناس نمونه بردار:</label>
        <Input
          placeholder="کارشناس نمونه بردار"
          type="text"
          name="sampler"
          value={employee.sampler}
          onChange={handleChange}
        />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <Button icon labelPosition="right" color="blue" onClick={handleSave}>
        ثبت
        <Icon name="save" />
      </Button>
    </Form>
  );
};

export default connect(null, { getSetting, saveSetting })(EmployeeSetting);
