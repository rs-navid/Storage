import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import lodash from 'lodash';

import { getAdvanceSetting, saveAdvanceSetting } from "../../../store/actions/settingActions";

const Info = (props) => {
  const [info, setInfo] = useState({
    name: "",
    sabt: "",
    eghtesadi: "",
    melli: "",
    header: "",
  });

  // Component did mount
  useEffect(() => {
    let isCancelled = false;
    const loadSetting = async () => {
      const result = await props.getAdvanceSetting("contact");
      if (!isCancelled && !lodash.isEmpty(result)) {
        setInfo(result);
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
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    props.saveAdvanceSetting({ info: info });
  };

  return (
    <div>
      <Form>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>نام آزمایشگاه:</label>
          <Input placeholder="نام آزمایشگاه" type="text" name="name" value={info.name} onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>شماره ثبت:</label>
          <Input placeholder="شماره ثبت" type="text" name="sabt" value={info.sabt} onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>شماره اقتصادی:</label>
          <Input placeholder="شماره اقتصادی" type="text" name="eghtesadi" value={info.eghtesadi} onChange={handleChange} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>شماره ملی:</label>
          <Input placeholder="شماره ملی" type="text" name="melli" value={info.melli} onChange={handleChange} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>عنوان در سربرگ:</label>
          <Input placeholder="عنوان در سربرگ" type="text" name="header" value={info.header} onChange={handleChange} />
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

export default connect(null, { getAdvanceSetting, saveAdvanceSetting })(Info);
