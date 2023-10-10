import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";

import Modal from "../../UI/modal/Modal";
import openBase64NewTab from "../../../helpers/openBase64NewTab";


import { updateRequestInvoice, deleteRequestInvoice, printOfficialInvoice } from "../../../store/actions/requestActions";
import { showDialog } from "../../../store/actions/dialogActions";

const Buttons = (props) => {
  return (
    <Fragment>
      <Button icon labelPosition="right" size="small" color="blue" onClick={props.onDelete}>
        حذف فاکتور
        <Icon name="trash" />
      </Button>
      <Button icon labelPosition="right" size="small" color="blue" onClick={props.onPrint}>
        چاپ
        <Icon name="print" />
      </Button>
    </Fragment>
  );
};

const InvoiceModal = (props) => {
  const [invoice, setInvoice] = useState(0);
  const [date, setDate] = useState(utils("fa").getToday());

  // // Component did mount
  useEffect(() => {
    setInvoice(props.invoice);
    // eslint-disable-next-line
  }, [props.invoice, props.open]);

  // Handle input vals
  const handleInput = (e) => {
    setInvoice(e.target.value);
  };

  // Save
  const handleSave = async () => {
    if (+parseInt(invoice) < 0 || isNaN(parseInt(invoice))) {
      props.showDialog({ title: "خطا", text: "شماره فاکتور معتبر نمی باشد." });
    } else {
      const result = await props.updateRequestInvoice(props.id, invoice);

      if (result) {
        setInvoice(result.data.invoice);
        props.showDialog({ title: "ثبت", text: "شماره فاکتور با موفقیت ثبت گردید." });
        props.loadRequests(props.location.search);
      }
    }
  };

  // Handle delete click
  const handleDeleteClick = async () => {
    const result = await props.deleteRequestInvoice(props.id);

    if (result) {
      setInvoice(result.data.invoice);
      props.showDialog({ title: "حذف", text: "فاکتور با موفقیت حذف گردید." });
      props.loadRequests(props.location.search);
    }
  };

  // Handle print button click
  const handlePrintClick = async () => {
    console.log("hereeeeeeeeeeeeee")
    const result = await props.printOfficialInvoice(props.id, date);

    if (result) {
      if (result.data) {
        openBase64NewTab(result.data);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title="فاکتور رسمی"
      maxWidth="md"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSave}
      saveTitle="ثبت فاکتور"
      Buttons={() => <Buttons onDelete={handleDeleteClick} onPrint={handlePrintClick} />}
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>شماره فاکتور رسمی:</label>
          <Input placeholder="شماره فاکتور رسمی" type="text" name="invoice" value={invoice} onChange={handleInput} />
        </div>
        <div className="field-wrapper field-100">
          <label>تاریخ:</label>
          <DatePicker value={date} onChange={setDate} shouldHighlightWeekends locale="fa" />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

InvoiceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
  invoice: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default withRouter(
  connect(null, { updateRequestInvoice, deleteRequestInvoice, showDialog, printOfficialInvoice })(InvoiceModal)
);
