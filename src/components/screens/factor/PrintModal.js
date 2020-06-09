import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import DatePicker from "react-modern-calendar-datepicker";
import "./node_modules/react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";

import Modal from "../../UI/modal/Modal";
import methodTypes from "../../../configs/methodTypes";

import { print, printeEvironmentResults } from "../../../store/actions/sampleActions";

const methodTypeValues = methodTypes.map((item) => {
  return {
    key: item.id,
    text: item.name,
    value: item.id,
  };
});

const PrintModal = (props) => {
  const [date, setDate] = useState(utils("fa").getToday());
  const [type, setType] = useState(1);

  // Handle date changes
  const handleDateChanges = (data) => {
    setDate(data);
  };

  // Handle Type change
  const handleTypeChange = (e, data) => {
    setType(data.value);
  };

  // Print
  const handlePrint = async () => {
    let result;
    if(type!==5){
      result = await props.print(props.id, { type: type, date: date });
    } else {
      result = await props.printeEvironmentResults(props.id, { type: type, date: date });
    }

    if (result) {
      if (result.data) {
        const file = (new Blob([result.data], { type: "application/pdf" }));
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title="چاپ"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handlePrint}
      saveTitle="چاپ نتایج"
      saveIcon="print"
      maxWidth="xs"
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>تاریخ صدور نتیجه:</label>
          <DatePicker
            value={date}
            onChange={(val) => {
              handleDateChanges(val);
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>نوع نتایج:</label>
          <Dropdown fluid selection name="type" value={type} onChange={handleTypeChange} options={methodTypeValues} />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

PrintModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(null, { print, printeEvironmentResults })(PrintModal);
