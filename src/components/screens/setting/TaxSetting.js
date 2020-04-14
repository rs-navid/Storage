import React, { useState, useEffect } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import lodash from "lodash";

import { getSetting, saveSetting } from "../../../store/actions/settingActions";
import { showDialog } from "../../../store/actions/dialogActions";

const TaxSetting = (props) => {
  const [tax, setTax] = useState({ tax: 0 });

  // Component did mount
  useEffect(() => {
    const loadSetting = async () => {
      const result = await props.getSetting("tax");
      if (!lodash.isEmpty(result)) {
        setTax(result);
      }
    };

    loadSetting();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setTax({
      ...tax,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!tax.tax || +tax.tax === 0 || parseFloat(tax.tax)) {
      props.saveSetting({ tax: tax });
    } else {
      props.showDialog({ title: "خطا ثبت", text: "مقدار مالیات باید عدد باشد." });
    }
  };

  return (
    <div>
      <div className="field-wrapper field-100 label-sm">
        <label>مالیات:</label>
        <Input type="number " placeholder="مالیات" name="tax" value={tax.tax} onChange={handleChange} />
      </div>
      <Button icon labelPosition="right" color="blue" onClick={handleSave}>
        ثبت
        <Icon name="save" />
      </Button>
    </div>
  );
};

export default connect(null, { getSetting, saveSetting, showDialog })(TaxSetting);
