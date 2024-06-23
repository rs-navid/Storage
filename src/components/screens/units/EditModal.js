import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const EditModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingUnit({
      ...props.editingUnit,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveUnit = async () => {
    if (props.editingUnit.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "واحد اندازه گیری معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingUnit.id === 0) {
        result = await props.createUnit(props.editingUnit);
      } else {
        result = await props.updateUnit(props.editingUnit);
      }

      if (result) {
        if (result.data) {
          props.setEditingUnit({
            ...props.editingUnit,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "واحد اندازه گیری با موفقیت ثبت گردید." });
        props.loadData(props.filter);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingUnit.id === 0 ? "واحد اندازه گیری جدید" : "ویرایش واحد اندازه گیری"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveUnit}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>نام واحد اندازه گیری:</label>
          <Input
            placeholder="نام واحد اندازه گیری"
            type="text"
            name="name"
            value={props.editingUnit.name}
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
  editingUnit: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingUnit: PropTypes.func.isRequired,
  createUnit: PropTypes.func.isRequired,
  updateUnit: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(EditModal);
