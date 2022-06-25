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
    invoiceDescription: "",
    factorDescription: "",
    factorFormCode: "",
    factorHeaderSize: "",
    factorFooterSize: "",
    invoiceHeaderSize: "",
    invoiceFooterSize: "",
    requestsReportHeaderSize: "",
    requestsReportFooterSize: "",
    samplesReportHeaderSize: "",
    samplesReportFooterSize: "",
    agreementDescription: ""
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
      {/* General settings */}
      <fieldset>
        <legend>تنظیمات عمومی</legend>
        <div className="line-break"></div>
        <div className="field-wrapper field-100 wrap ">
          <label>زیر عنوان اول:</label>
          <Input placeholder="زیر عنوان اول" type="text" name="firstSubtitle" value={forms.firstSubtitle} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>زیر عنوان دوم:</label>
          <Input placeholder="زیر عنوان دوم" type="text" name="secondSubtitle" value={forms.secondSubtitle} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>شماره گواهینامه:</label>
          <Input placeholder="شماره گواهینامه" type="text" name="license" value={forms.license} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Receipt settings */}
      <fieldset>
        <legend>تنظیمات رسید پذیرش نمونه</legend>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input placeholder="130" type="text" name="receiptHeaderSize" value={forms.receiptHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="90" type="text" name="receiptFooterSize" value={forms.receiptFooterSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>کد مدرک:</label>
          <Input placeholder="کد مدرک" type="text" name="receiptFormCode" value={forms.receiptFormCode} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>ملاحظات:</label>
          <TextArea placeholder="ملاحظات" name="receiptPoints" value={forms.receiptPoints} onChange={handleChange} />
        </div>
      </fieldset>

      {/* agreement settings */}
      <fieldset>
        <legend>تنظیمات فرم توافق  نامه آزمون</legend>

        <div className="field-wrapper field-100 wrap">
          <label>توضیحات:</label>
          <TextArea placeholder="توضیحات" name="agreementDescription" value={forms.agreementDescription} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Result settings */}
      <fieldset>
        <legend>تنظیمات گزارش آزمون</legend>
        <div className="line-break"></div>
        <div className="field-wrapper field-100 wrap ">
          <label>کد مدرک:</label>
          <Input placeholder="کد مدرک" type="text" name="resultsFormCode" value={forms.resultsFormCode} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input placeholder="330" type="text" name="resultsHeaderSize" value={forms.resultsHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="255" type="text" name="resultsFooterSize" value={forms.resultsFooterSize} onChange={handleChange} />
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
          <Input placeholder="345" type="text" name="environmentHeaderSize" value={forms.environmentHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="270" type="text" name="environmentFooterSize" value={forms.environmentFooterSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label> ملاحظات (فرایندی):</label>
          <TextArea placeholder="ملاحظات" name="environmentWarningsFarayandi" value={forms.environmentWarningsFarayandi} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>ملاحظات (خود اظهاری):</label>
          <TextArea placeholder="ملاحظات" name="environmentWarningsEzhari" value={forms.environmentWarningsEzhari} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Factor settings */}
      <fieldset>
        <legend>تنظیمات پیش فاکتور</legend>
        <div className="field-wrapper field-100 wrap ">
          <label>کد مدرک:</label>
          <Input placeholder="کد مدرک" type="text" name="factorFormCode" value={forms.factorFormCode} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input placeholder="160" type="text" name="factorHeaderSize" value={forms.factorHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="0" type="text" name="factorFooterSize" value={forms.factorFooterSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>توضیحات:</label>
          <TextArea placeholder="توضیحات" name="factorDescription" value={forms.factorDescription} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Invoice settings */}
      <fieldset>
        <legend>تنظیمات صورتحساب</legend>
        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input placeholder="130" type="text" name="invoiceHeaderSize" value={forms.invoiceHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="130" type="text" name="invoiceFooterSize" value={forms.invoiceFooterSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap">
          <label>توضیحات:</label>
          <TextArea placeholder="توضیحات" name="invoiceDescription" value={forms.invoiceDescription} onChange={handleChange} />
        </div>
      </fieldset>

      {/* requests report settings */}
      <fieldset>
        <legend>تنظیمات گزارش درخواست ها</legend>
        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input placeholder="160" type="text" name="requestsReportHeaderSize" value={forms.requestsReportHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="90" type="text" name="requestsReportFooterSize" value={forms.requestsReportFooterSize} onChange={handleChange} />
        </div>
      </fieldset>

      {/* samples report settings */}
      <fieldset>
        <legend>تنظیمات گزارش نمونه ها</legend>
        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع سر برگ:</label>
          <Input placeholder="160" type="text" name="samplesReportHeaderSize" value={forms.samplesReportHeaderSize} onChange={handleChange} />
        </div>

        <div className="field-wrapper field-100 wrap ">
          <label>ارتفاع پاورقی:</label>
          <Input placeholder="90" type="text" name="samplesReportFooterSize" value={forms.samplesReportFooterSize} onChange={handleChange} />
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
