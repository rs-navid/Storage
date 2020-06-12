import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

import Modal from "../../UI/modal/Modal";

import { updateRequestIsPaid } from "../../../store/actions/requestActions";
import { showDialog } from "../../../store/actions/dialogActions";

const isPaidValues = [
  { key: 1, text: "نشده است", value: "0" },
  { key: 2, text: "شده است", value: "1" },
];

const IsPaidModal = (props) => {
  const [paid, setPaid] = useState(0);

  // // Component did mount
  useEffect(() => {
    setPaid(props.isPaid);
    // eslint-disable-next-line
  }, [props.price, props.open]);

  // Save
  const handleSave = async () => {
    const result = await props.updateRequestIsPaid(props.id, paid);

    if (result) {
      props.showDialog({ title: "ثبت", text: "تسویه حساب با موفقیت ثبت گردید." });
      props.loadRequests(props.location.search, 0);
    }
  };

  // Handle is paid change
  const handleIsPaidChange = (e, { value }) => {
    setPaid(value === "0" ? 0 : 1);
  };

  return (
    <Modal
      open={props.open}
      title="ویرایش تسویه حساب"
      maxWidth="sm"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSave}
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>تسویه حساب:</label>
          <Dropdown
            selection
            fluid
            options={isPaidValues}
            value={paid === 0 ? "0" : "1"}
            onChange={(e, value) => handleIsPaidChange(e, value)}
            name="order"
          />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

IsPaidModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
  isPaid: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default withRouter(connect(null, { updateRequestIsPaid, showDialog })(IsPaidModal));
