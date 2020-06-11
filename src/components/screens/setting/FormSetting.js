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
    receiptHeaderSize: "",
    receiptFooterSize: "",
    receiptPoints: "",
    receiptFormCode: "",
    invoiceDescription: ""
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
      {/* Receipt settings */}
      <fieldset>
        <legend>تنظیمات رسید پذیرش نمونه</legend>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input
            placeholder="130"
            type="text"
            name="receiptHeaderSize"
            value={forms.receiptHeaderSize}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input
            placeholder="90"
            type="text"
            name="receiptFooterSize"
            value={forms.receiptFooterSize}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>کد مدرک:</label>
          <Input
            placeholder="کد مدرک"
            type="text"
            name="receiptFormCode"
            value={forms.receiptFormCode}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>ملاحظات:</label>
          <TextArea placeholder="ملاحظات" name="receiptPoints" value={forms.receiptPoints} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Result settings */}
      <fieldset>
        <legend>تنظیمات گزارش آزمون</legend>
        <div className="line-break"></div>
        <div className="field-wrapper field-100 wrap ">
          <label>زیر عنوان اول:</label>
          <Input
            placeholder="زیر عنوان اول"
            type="text"
            name="firstSubtitle"
            value={forms.firstSubtitle}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>زیر عنوان دوم:</label>
          <Input
            placeholder="زیر عنوان دوم"
            type="text"
            name="secondSubtitle"
            value={forms.secondSubtitle}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>شماره گواهینامه:</label>
          <Input
            placeholder="شماره گواهینامه"
            type="text"
            name="license"
            value={forms.license}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>کد مدرک:</label>
          <Input
            placeholder="کد مدرک"
            type="text"
            name="resultsFormCode"
            value={forms.resultsFormCode}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input
            placeholder="330"
            type="text"
            name="resultsHeaderSize"
            value={forms.resultsHeaderSize}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input
            placeholder="255"
            type="text"
            name="resultsFooterSize"
            value={forms.resultsFooterSize}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>ملاحظات:</label>
          <TextArea placeholder="ملاحظات" name="warnings" value={forms.warnings} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Environment settings */}
      <fieldset>
        <legend>تنظیمات گزارش آزمون محیط زیست</legend>
        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input
            placeholder="345"
            type="text"
            name="environmentHeaderSize"
            value={forms.environmentHeaderSize}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input
            placeholder="270"
            type="text"
            name="environmentFooterSize"
            value={forms.environmentFooterSize}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label> ملاحظات (فرایندی):</label>
          <TextArea
            placeholder="ملاحظات"
            name="environmentWarningsFarayandi"
            value={forms.environmentWarningsFarayandi}
            onChange={handleChange}
          />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>ملاحظات (خود اظهاری):</label>
          <TextArea
            placeholder="ملاحظات"
            name="environmentWarningsEzhari"
            value={forms.environmentWarningsEzhari}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {/* Invoice settings */}
      <fieldset>
        <legend>تنظیمات صورتحساب</legend>
        <div className="field-wrapper field-100 wrap">
          <label>توضیحات:</label>
          <TextArea
            placeholder="توضیحات"
            name="invoiceDescription"
            value={forms.invoiceDescription}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <Button icon labelPosition="right" color="blue" onClick={handleSave}>
        ثبت
        <Icon name="save" />
      </Button>
    </Form>
  );
};

export default connect(null, { getSetting, saveSetting })(FormSetting);
