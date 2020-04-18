import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Button, Icon } from "semantic-ui-react";

import { getUserPeriodAndAllPeriods, changePeriod } from "../../../store/actions/userActions";

const ChangePeriod = (props) => {
  const [getPeriods, setPeriods] = useState([]);
  const [getActive, setActive] = useState(0);

  // Component did mount
  useEffect(() => {
    const loadData = async () => {
      const results = await props.getUserPeriodAndAllPeriods();

      if (results) {
        setActive(results.periodId);

        const periods = results.periods.map((p) => {
          return {
            key: p.id,
            text: p.name,
            value: p.id,
          };
        });
        setPeriods(periods);
      }
    };

    loadData();
    // eslint-disable-next-line
  }, []);

  // Handle input change
  const handleInput = (e, { value }) => {
    setActive(value);
  };

  // Save
  const saveHandler = async () => {
    props.changePeriod(getActive);
  };

  return (
    <div>
      <div className="field-wrapper field-100 label-sm">
        <label>دوره:</label>
        <Dropdown
          placeholder="Select Friend"
          fluid
          selection
          value={getActive}
          onChange={handleInput}
          options={getPeriods}
        />

      </div>
      <Button icon labelPosition="right" color="blue" onClick={saveHandler}>
        ثبت
        <Icon name="save" />
      </Button>
    </div>
  );
};

export default connect(null, { getUserPeriodAndAllPeriods, changePeriod })(ChangePeriod);
