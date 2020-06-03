import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

import faults from "../../../configs/faults";
import methodTypes from "../../../configs/methodTypes";
import contractors from "../../../configs/contractor";

const faultValues = faults.map((item) => {
  return {
    key: item.id,
    text: item.name,
    value: item.name,
  };
});

const methodTypeValues = methodTypes.map((item) => {
  return {
    key: item.id,
    text: item.name,
    value: item.id,
  };
});

const contractorValues = contractors.map((item) => {
  return {
    key: item.id,
    text: item.name,
    value: item.id,
  };
});

const EditModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingMethod({
      ...props.editingMethod,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdowns = (e, data) => {
    props.setEditingMethod({
      ...props.editingMethod,
      [data.name]: data.value,
    });
  };

  // Save
  const handleSaveMethod = async () => {
    if (props.editingMethod.code.trim() === "") {
      props.showDialog({ title: "خطا", text: "روش آزمون معتبر نمی باشد." });
    } else if (props.editingMethod.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام روش آزمون معتبر نمی باشد." });
    } else if (!parseInt(props.editingMethod.price) && +props.editingMethod.price !== 0) {
      props.showDialog({ title: "خطا", text: "هزینه معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingMethod.id === 0) {
        result = await props.createMethod({ ...props.editingMethod, examId: props.examId });
      } else {
        result = await props.updateMethod({ ...props.editingMethod, examId: props.examId });
      }

      if (result) {
        if (result.data) {
          props.setEditingMethod({
            ...props.editingMethod,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "روش آزمون با موفقیت ثبت گردید." });
        props.loadData();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingMethod.id === 0 ? "روش آزمون جدید" : "ویرایش روش آزمون"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveMethod}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>روش آزمون:</label>
          <Input
            placeholder="روش آزمون"
            type="text"
            name="code"
            value={props.editingMethod.code}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام روش آزمون:</label>
          <Input
            placeholder="نام روش آزمون"
            type="text"
            name="name"
            value={props.editingMethod.name}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>روش انجام آزمون:</label>
          <Input
            placeholder="روش انجام آزمون"
            type="text"
            name="way"
            value={props.editingMethod.way}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>هزینه:</label>
          <Input
            placeholder="هزینه"
            type="text"
            name="price"
            value={props.editingMethod.price}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>مقدار استاندارد:</label>
          <Input
            placeholder="مقدار استاندارد"
            type="text"
            name="range"
            value={props.editingMethod.range}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>واحد:</label>
          <Input
            placeholder="واحد"
            type="text"
            name="unit"
            className="ltr"
            value={props.editingMethod.unit}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>نوع روش آزمون:</label>
          <Dropdown
            fluid
            selection
            name="methodTypeId"
            value={props.editingMethod.methodTypeId}
            onChange={handleDropdowns}
            options={methodTypeValues}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نوع نقص:</label>
          <Dropdown
            placeholder="Select Frind"
            fluid
            selection
            name="fault"
            value={props.editingMethod.fault}
            onChange={handleDropdowns}
            options={faultValues}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>پیمانکار خارجی:</label>
          <Dropdown
            fluid
            selection
            name="contractor"
            value={props.editingMethod.contractor}
            onChange={handleDropdowns}
            options={contractorValues}
          />
        </div>
        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingMethod: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingMethod: PropTypes.func.isRequired,
  createMethod: PropTypes.func.isRequired,
  updateMethod: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
  examId: PropTypes.number.isRequired,
};

export default withRouter(EditModal);
