import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";

import Modal from "../../UI/modal/Modal";

import { printSamplesReport } from "../../../store/actions/requestActions";



const PrintModal = (props) => {
  const [date, setDate] = useState(utils("fa").getToday());
  const [title, setTitle] = useState("گزارش نمونه ها");

  // Handle date changes
  const handleDateChanges = (data) => {
    setDate(data);
  };

  // Handle Title change
  const handleTitleChange = (e, data) => {
    setTitle(data.value);
  };

  // Print
  const handlePrint = async () => {
    const  result = await props.printSamplesReport({...props.data, date, title});

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
          <label>تاریخ گزارش:</label>
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
          <label>عنوان پرینت:</label>
          <Input
            placeholder="عنوان پرینت"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

PrintModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(null, { printSamplesReport })(PrintModal);
