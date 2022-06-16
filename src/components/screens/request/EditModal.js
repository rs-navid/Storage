import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, TextArea, Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-modern-calendar-datepicker";
import moment from "jalali-moment";
import { connect } from "react-redux";
import WindowedSelect from "react-windowed-select";
import Select from "../../UI/select/Select";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import Modal from "../../UI/modal/Modal";

import { getClients } from "../../../store/actions/clientActions";

const isPaidValues = [
  { key: 1, text: "نشده است", value: "0" },
  { key: 2, text: "شده است", value: "1" },
];

const reasons = ["واردات", "صادرات", "قرارداد", "تحقیقات", "کنترل کیفی تولید", "شکایات", "آزمون مجدد"];

const EditModal = (props) => {
  const [clients, setClients] = useState([]);
  // Component did mount
  useEffect(() => {
    loadClients();
    // eslint-disable-next-line
  }, []);

  // Load clients
  const loadClients = async () => {
    const results = await props.getClients("page_size=100000");
    if (results) {
      setClients(
        results.rows.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  };

  // Handle input vals
  const handleInput = (e) => {
    props.setEditingRequest({
      ...props.editingRequest,
      [e.target.name]: e.target.value,
    });
  };

  // Handle date changes
  const handleDateChanges = (data, target) => {
    props.setEditingRequest({
      ...props.editingRequest,
      [target]: data,
    });
  };

  // Handle client change
  const handleClientChange = (data) => {
    props.setEditingRequest({
      ...props.editingRequest,
      clientId: data.value,
    });
  };

  // Save
  const handleSaveRequest = async () => {
    const date = props.editingRequest.date;
    const start = props.editingRequest.startDate;
    const end = props.editingRequest.endDate;

    if (!moment(`${date.year}/${date.month}/${date.day}`, "jYYYY/jM/jD")) {
      props.showDialog({ title: "خطا", text: "تاریخ درخواست معتبر نمی باشد." });
    } else if (!moment(`${start.year}/${start.month}/${start.day}`, "jYYYY/jM/jD")) {
      props.showDialog({ title: "خطا", text: "تاریخ شروع آزمون معتبر نمی باشد." });
    } else if (!moment(`${end.year}/${end.month}/${end.day}`, "jYYYY/jM/jD")) {
      props.showDialog({ title: "خطا", text: "تاریخ پایان آزمون معتبر نمی باشد." });
    } else if (!props.editingRequest.clientId) {
      props.showDialog({ title: "خطا", text: "مشتری معتبر نمی باشد." });
    } else if (props.editingRequest.requester.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام درخواست کننده معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingRequest.id === 0) {
        result = await props.createRequest(props.editingRequest);
      } else {
        result = await props.updateRequest(props.editingRequest);
      }

      if (result) {
        if (result.data) {
          props.setEditingRequest({
            ...props.editingRequest,
            num: result.data.num,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "درخواست با موفقیت ثبت گردید." });
        props.loadData(props.location.search);
      }
    }
  };

  // Handle is paid change
  const handleIsPaidChange = (e, { value }, target) => {
    props.setEditingRequest({
      ...props.editingRequest,
      [target]: value === "0" ? 0 : 1,
    });
  };

  const defaultClient =
    props.editingRequest.clientId !== 0
      ? clients[clients.findIndex((item) => item.value === props.editingRequest.clientId)]
      : null;

  return (
    <Modal
      open={props.open}
      title={props.editingRequest.id === 0 ? "درخواست جدید" : "ویرایش درخواست"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveRequest}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>شماره درخواست:</label>
          <Input
            placeholder="شماره درخواست"
            type="text"
            name="num"
            value={props.editingRequest.num}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>تاریخ درخواست:</label>
          <DatePicker
            value={props.editingRequest.date}
            onChange={(val) => {
              handleDateChanges(val, "date");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تاریخ تحویل نمونه:</label>
          <DatePicker
            value={props.editingRequest.receiveDate}
            onChange={(val) => {
              handleDateChanges(val, "receiveDate");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>ساعت تحویل نمونه:</label>
          <Input
            placeholder="ساعت تحویل نمونه"
            type="text"
            name="receiveTime"
            value={props.editingRequest.receiveTime}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>مشتری:</label>
          <WindowedSelect
            options={clients}
            placeholder="مشتری"
            onChange={handleClientChange}
            defaultValue={defaultClient}
            className="WindowedSelect"
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>درخواست کننده:</label>
          <Input
            placeholder="درخواست کننده"
            type="text"
            name="requester"
            value={props.editingRequest.requester}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تسویه حساب:</label>
          <Dropdown
            selection
            fluid
            options={isPaidValues}
            value={props.editingRequest.isPaid === 0 ? "0" : "1"}
            onChange={(e, value) => handleIsPaidChange(e, value, "isPaid")}
            name="order"
          />
        </div>
        <div className="field-wrapper field-50 left-50" style={{ margin: 0 }}>
          <label>علت درخواست:</label>
          <Select
            placeholder="علت درخواست"
            type="text"
            name="reason"
            value={props.editingRequest.reason}
            onChange={(val) => {
              props.setEditingRequest({
                ...props.editingRequest,
                reason: val,
              });
            }}
            title="علت درخواست"
            items={reasons}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>توضیحات:</label>
          <TextArea
            placeholder="توضیحات"
            name="description"
            value={props.editingRequest.description}
            onChange={handleInput}
          />
        </div>

        {/* <div className="clearfix"></div> */}
        {/* <div className="line-break"></div> */}

        <div className="field-wrapper field-100">
          <label>بیانیه سلب مسئولیت:</label>
          <TextArea
            placeholder="بیانیه سلب مسئولیت آزمایشگاه"
            name="bayanieh"
            value={props.editingRequest.bayanieh}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingRequest: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingRequest: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { getClients })(EditModal));
