import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Button, Icon } from "semantic-ui-react";

import { getPeriods, changePeriod } from "../../../store/actions/userActions";

const ChangePeriod = (props) => {
  const [getPeriods, setPeriods] = useState([]);
  const [getActive, setActive] = useState(0);

  // Component did mount
  useEffect(() => {
    const loadData = async () => {
      const results = await props.getPeriods();

      if (results) {
        setActive(props.periodId);

        const periods = results.map((p) => {
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
    localStorage.setItem("period", getActive);
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

const mapStateToProps = (state) => ({
  periodId: state.userReducer.period,
});

export default connect( mapStateToProps, { getPeriods, changePeriod })(ChangePeriod);
