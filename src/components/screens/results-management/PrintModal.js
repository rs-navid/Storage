import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";

import Modal from "../../UI/modal/Modal";
import methodTypes from "../../../configs/methodTypes";

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
    // const date = props.editingRequest.date;
    // const start = props.editingRequest.startDate;
    // const end = props.editingRequest.endDate;
    // if (!moment(`${date.year}/${date.month}/${date.day}`, "jYYYY/jM/jD")) {
    //   props.showDialog({ title: "خطا", text: "تاریخ درخواست معتبر نمی باشد." });
    // } else if (!moment(`${start.year}/${start.month}/${start.day}`, "jYYYY/jM/jD")) {
    //   props.showDialog({ title: "خطا", text: "تاریخ شروع آزمون معتبر نمی باشد." });
    // } else if (!moment(`${end.year}/${end.month}/${end.day}`, "jYYYY/jM/jD")) {
    //   props.showDialog({ title: "خطا", text: "تاریخ پایان آزمون معتبر نمی باشد." });
    // } else if (!props.editingRequest.clientId) {
    //   props.showDialog({ title: "خطا", text: "مشتری معتبر نمی باشد." });
    // } else if (props.editingRequest.requester.trim() === "") {
    //   props.showDialog({ title: "خطا", text: "نام درخواست کننده معتبر نمی باشد." });
    // } else {
    //   let result = null;
    //   if (props.editingRequest.id === 0) {
    //     result = await props.createRequest(props.editingRequest);
    //   } else {
    //     result = await props.updateRequest(props.editingRequest);
    //   }
    //   if (result) {
    //     if (result.data) {
    //       props.setEditingRequest({
    //         ...props.editingRequest,
    //         num: result.data.num,
    //         id: result.data.id,
    //       });
    //     }
    //     props.showDialog({ title: "ثبت", text: "درخواست با موفقیت ثبت گردید." });
    //     props.loadData(props.location.search);
    //   }
    // }
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

export default connect(null, {})(PrintModal);
