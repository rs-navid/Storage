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
    resultsFooterSize: "",
    warnings: "",
    environmentHeaderSize: "",
    environmentFooterSize: "",
    environmentWarningsFarayandi: "",
    environmentWarningsEzhari: "",
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
    console.log(forms);
    props.saveSetting({ forms: forms });
  };

  return (
    <Form>
      <div className="line-break"></div>
      <div className="field-wrapper field-100 wrap ">
        <label>زیر عنوان اول در گزارش آزمون:</label>
        <Input
          placeholder="زیر عنوان اول در گزارش آزمون"
          type="text"
          name="firstSubtitle"
          value={forms.firstSubtitle}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>زیر عنوان دوم در گزارش آزمون:</label>
        <Input
          placeholder="زیر عنوان دوم در گزارش آزمون"
          type="text"
          name="secondSubtitle"
          value={forms.secondSubtitle}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>شماره گواهینامه در گزارش آزمون:</label>
        <Input
          placeholder="شماره گواهینامه در گزارش آزمون"
          type="text"
          name="license"
          value={forms.license}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>کد مدرک در گزارش آزمون:</label>
        <Input
          placeholder="کد مدرک در گزارش آزمون"
          type="text"
          name="resultsFormCode"
          value={forms.resultsFormCode}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>ارتفاع سر برگ در گزارش آزمون:</label>
        <Input
          placeholder="330"
          type="text"
          name="resultsHeaderSize"
          value={forms.resultsHeaderSize}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>ارتفاع پاورقی در گزارش آزمون:</label>
        <Input
          placeholder="255"
          type="text"
          name="resultsFooterSize"
          value={forms.resultsFooterSize}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap">
        <label>ملاحظات در گزارش آزمون:</label>
        <TextArea placeholder="ملاحظات در گزارش آزمون" name="warnings" value={forms.warnings} onChange={handleChange} />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>ارتفاع سر برگ در گزارش آزمون محیط زیست:</label>
        <Input
          placeholder="345"
          type="text"
          name="environmentHeaderSize"
          value={forms.environmentHeaderSize}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap ">
        <label>ارتفاع پاورقی در گزارش آزمون محیط زیست:</label>
        <Input
          placeholder="270"
          type="text"
          name="environmentFooterSize"
          value={forms.environmentFooterSize}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap">
        <label> ملاحظات در گزارش آزمون محیط زیست (فرایندی):</label>
        <TextArea
          placeholder="ملاحظات در گزارش آزمون محیط زیست"
          name="environmentWarningsFarayandi"
          value={forms.environmentWarningsFarayandi}
          onChange={handleChange}
        />
      </div>

      <div className="field-wrapper field-100 wrap">
        <label>ملاحظات در گزارش آزمون محیط زیست (خود اظهاری):</label>
        <TextArea
          placeholder="ملاحظات در گزارش آزمون محیط زیست"
          name="environmentWarningsEzhari"
          value={forms.environmentWarningsEzhari}
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

export default connect(null, { getSetting, saveSetting })(FormSetting);
