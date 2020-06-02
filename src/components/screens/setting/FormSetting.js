import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import lodash from "lodash";

import { getSetting, saveSetting } from "../../../store/actions/settingActions";

const FormSetting = (props) => {
  const [forms, setForms] = useState({
    firstSubtitle: "",
    secondSubtitle: "",
    license: "",
    resultsFormCode: "",
    resultsHeaderSize: "",
    warnings: "",
  });

  // Component did mount
  useEffect(() => {
    loadSetting();
    // eslint-disable-next-line
  }, []);

  const loadSetting = async () => {
    const result = await props.getSetting("forms");

    if (!lodash.isEmpty(result)) {
      setForms(result);
    }
  };

  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    props.saveSetting({ forms: forms });
  };

  return (
    <Form>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50 ">
        <label>زیر عنوان اول گزارش آزمون:</label>
        <Input
          placeholder="زیر عنوان اول گزارش آزمون"
          type="text"
          name="firstSubtitle"
          value={forms.firstSubtitle}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>زیر عنوان دوم گزارش آزمون:</label>
        <Input
          placeholder="زیر عنوان دوم گزارش آزمون"
          type="text"
          name="secondSubtitle"
          value={forms.secondSubtitle}
          onChange={handleChange}
        />
      </div>

      <div className="clearfix"></div>
      <div className="line-break"></div>

      <div className="field-wrapper field-50 right-50 ">
        <label>شماره گواهینامه گزارش آزمون:</label>
        <Input
          placeholder="شماره گواهینامه گزارش آزمون"
          type="text"
          name="license"
          value={forms.license}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper field-50 left-50 ">
        <label>کد مدرک گزارش آزمون:</label>
        <Input
          placeholder="کد مدرک گزارش آزمون"
          type="text"
          name="resultsFormCode"
          value={forms.resultsFormCode}
          onChange={handleChange}
        />
      </div>

      <div className="clearfix"></div>
      <div className="line-break"></div>

      <div className="field-wrapper field-50 right-50 ">
        <label>ارتفاع سر برگ گزارش آزمون:</label>
        <Input
          placeholder="ارتفاع سر برگ گزارش آزمون"
          type="text"
          name="resultsHeaderSize"
          value={forms.resultsHeaderSize}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-50 left-50 ">
        <label>ارتفاع پاورقی گزارش آزمون:</label>
        <Input
          placeholder="ارتفاع پاورقی گزارش آزمون"
          type="text"
          name="resultsFooterSize"
          value={forms.resultsFooterSize}
          onChange={handleChange}
        />
      </div>

      <div className="clearfix"></div>
      <div className="line-break"></div>

      <div className="field-wrapper field-100">
        <label>ملاحضات گزارش آزمون:</label>
        <TextArea placeholder="ملاحضات گزارش آژمون" name="warnings" value={forms.warnings} onChange={handleChange} />
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

export default connect(null, { getSetting, saveSetting })(FormSetting);
