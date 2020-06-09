import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import Modal from "../../UI/modal/Modal";

import { updateSampleDiscount } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const DiscountModal = (props) => {
  const [price, setPrice] = useState(0);

  // // Component did mount
  useEffect(() => {
    setPrice(props.price);
    console.log(props.price);
    // eslint-disable-next-line
  }, [props.price, props.open]);

  // Handle input vals
  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  // Save
  const handleSave = async () => {
    if (+parseInt(price) < 0 || isNaN(parseInt(price))) {
      props.showDialog({ title: "خطا", text: "تخفیف معتبر نمی باشد." });
    } else {
      const result = await props.updateSampleDiscount(props.id, price);

      if (result) {
        props.showDialog({ title: "ثبت", text: "تخفیف با موفقیت ثبت گردید." });
        props.loadSamples();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title="ویرایش تخفیف"
      maxWidth="sm"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSave}
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>تخفیف (ریال):</label>
          <Input placeholder="تخفیف (ریال)" type="text" name="price" value={price} onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

DiscountModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(null, { updateSampleDiscount, showDialog })(DiscountModal);
