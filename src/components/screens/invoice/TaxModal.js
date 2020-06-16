import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import Modal from "../../UI/modal/Modal";

import { updateRequestTax } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const TaxModal = (props) => {
  const [price, setPrice] = useState(0);

  // // Component did mount
  useEffect(() => {
    setPrice(props.price);
    // eslint-disable-next-line
  }, [props.price, props.open]);

  // Handle input vals
  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  // Save
  const handleSave = async () => {
    if (+parseInt(price) < 0 || isNaN(parseInt(price))) {
      props.showDialog({ title: "خطا", text: "مالیات معتبر نمی باشد." });
    } else {
      const result = await props.updateRequestTax(props.id, price);

      if (result) {
        props.showDialog({ title: "ثبت", text: "مالیات با موفقیت ثبت گردید." });
        props.loadSamples();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title="ویرایش مالیات"
      maxWidth="sm"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSave}
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>مالیات (%):</label>
          <Input placeholder="مالیات (%)" type="text" name="price" value={price} onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

TaxModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(null, { updateRequestTax, showDialog })(TaxModal);
