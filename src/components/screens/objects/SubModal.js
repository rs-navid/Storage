import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const SubModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingObject({
      ...props.editingObject,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveObject = async () => {
    if (props.editingObject.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام کالا معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingObject.id === 0) {
        result = await props.createSubObject(props.editingObject);
      } else {
        result = await props.updateSubObject(props.editingObject);
      }

      if (result) {
        if (result.data) {
          props.setEditingObject({
            ...props.editingObject,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "کالا با موفقیت ثبت گردید." });
        props.loadData();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingObject.id === 0 ? "کالا جدید" : "ویرایش کالا"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveObject}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>نام کالا:</label>
          <Input
            placeholder="نام کالا"
            type="text"
            name="name"
            value={props.editingObject.name}
            onChange={handleInput}
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
      </Form>
    </Modal>
  );
};

SubModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingObject: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingObject: PropTypes.func.isRequired,
  createSubObject: PropTypes.func.isRequired,
  updateSubObject: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(SubModal);
