import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-modern-calendar-datepicker";
import WindowedSelect from "react-windowed-select";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import moment from "jalali-moment";

import Modal from "../../UI/modal/Modal";

const EditModal = (props) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (props.editingReceipt.clients) {
      setClients(
        props.editingReceipt.clients.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  }, [props.editingReceipt.clients]);

  // Handle input vals
  const handleInput = (e) => {
    props.setEditingReceipt({
      ...props.editingReceipt,
      [e.target.name]: e.target.value,
    });
  };

  // Handle date changes
  const handleDateChanges = (data, target) => {
    props.setEditingReceipt({
      ...props.editingReceipt,
      [target]: data,
    });
  };

  // Handle client change
  const handleClientChange = (data) => {
    props.setEditingReceipt({
      ...props.editingReceipt,
      clientId: data.value,
    });
  };

  // Save
  const handleSaveReceipt = async () => {
    const date = props.editingReceipt.dateString;

    if (!date || !moment(`${date.year}/${date.month}/${date.day}`, "jYYYY/jM/jD")) {
      props.showDialog({ title: "خطا", text: "تاریخ معتبر نمی باشد." });
    } else if (props.editingReceipt.driver.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام راننده معتبر نمی باشد." });
    } else if (props.editingReceipt.lp.trim() === "") {
      props.showDialog({ title: "خطا", text: "پلاک خودرو معتبر نمی باشد." });
    } else if (props.editingReceipt.cargo.trim() === "") {
      props.showDialog({ title: "خطا", text: "شماره بارنامه معتبر نمی باشد." });
    } else if (!props.editingReceipt.clientId) {
      props.showDialog({ title: "خطا", text: "مشتری معتبر نمی باشد." });
    } else {
      let result = null;
      var dateStr = moment.from(`${props.editingReceipt.dateString.year}/${props.editingReceipt.dateString.month}/${props.editingReceipt.dateString.day}`, "fa", "YYYY/M/D").format("YYYY/M/D");

      if (props.editingReceipt.id === 0) {
        result = await props.createReceipt({
          ...props.editingReceipt,
          dateString: dateStr,
          date: new Date()
        });
      } else {
        result = await props.updateReceipt({
          ...props.editingReceipt,
          dateString: dateStr,
          date: new Date()
        });
      }

      if (result) {
        if (result.data) {
          props.setEditingReceipt({
            ...props.editingReceipt,
            id: result.data.id,
            number: result.data.number
          });
        }

        props.showDialog({ title: "ثبت", text: "رسید با موفقیت ثبت گردید." });
        props.loadData(props.filter);
      }
    }
  };

  const defaultClient =
    props.editingReceipt.clientId !== 0
      ? clients[
          clients.findIndex(
            (item) => item.value === props.editingReceipt.clientId
          )
        ]
      : null;

  return (
    <Modal
      open={props.open}
      title={props.editingReceipt.id === 0 ? "رسید جدید" : "ویرایش رسید"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveReceipt}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>شماره رسید:</label>
          <Input
            placeholder="شماره رسید"
            type="text"
            name="number"
            value={props.editingReceipt.number}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>تاریخ:</label>
          <DatePicker
            value={props.editingReceipt.dateString}
            onChange={(val) => {
              handleDateChanges(val, "dateString");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>ساعت:</label>
          <Input
            placeholder="ساعت"
            type="text"
            name="time"
            value={props.editingReceipt.time}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>مشتری:</label>
          <WindowedSelect
            options={clients}
            placeholder="مشتری"
            onChange={handleClientChange}
            defaultValue={defaultClient}
            className="WindowedSelect"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>نام راننده:</label>
          <Input
            placeholder="نام راننده"
            type="text"
            name="driver"
            value={props.editingReceipt.driver}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>پلاک خودرو:</label>
          <Input
            placeholder="پلاک خودرو"
            type="text"
            name="lp"
            value={props.editingReceipt.lp}
            onChange={handleInput}
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شماره بارنامه:</label>
          <Input
            placeholder="شماره بارنامه"
            type="text"
            name="cargo"
            value={props.editingReceipt.cargo}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingReceipt: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingReceipt: PropTypes.func.isRequired,
  createReceipt: PropTypes.func.isRequired,
  updateReceipt: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(EditModal);
