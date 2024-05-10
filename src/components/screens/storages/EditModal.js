import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const EditModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingStorage({
      ...props.editingStorage,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveStorage = async () => {
    if(props.editingStorage.code.trim() === ""){
      props.showDialog({ title: "خطا", text: "کد انبار معتبر نمی باشد." });
    } else if (props.editingStorage.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام انبار معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingStorage.id === 0) {
        result = await props.createMainStorage(props.editingStorage);
      } else {
        result = await props.updateMainStorage(props.editingStorage);
      }

      if (result) {
        if (result.data) {
          props.setEditingStorage({
            ...props.editingStorage,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "انبار با موفقیت ثبت گردید." });
        props.loadData(props.filter);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingStorage.id === 0 ? "انبار جدید" : "ویرایش انبار"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveStorage}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>کد انبار:</label>
          <Input
            placeholder="کد انبار"
            type="text"
            name="code"
            value={props.editingStorage.code}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام انبار:</label>
          <Input
            placeholder="نام انبار"
            type="text"
            name="name"
            value={props.editingStorage.name}
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
  editingStorage: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingStorage: PropTypes.func.isRequired,
  createMainStorage: PropTypes.func.isRequired,
  updateMainStorage: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(EditModal);
