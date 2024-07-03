import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const SubModal = (props) => {
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
      props.showDialog({ title: "خطا", text: "کد بخش معتبر نمی باشد." });
    } else if (props.editingStorage.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام بخش معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingStorage.id === 0) {
        result = await props.createSubStorage(props.editingStorage);
      } else {
        result = await props.updateSubStorage(props.editingStorage);
      }

      if (result) {
        if (result.data) {
          props.setEditingStorage({
            ...props.editingStorage,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "بخش با موفقیت ثبت گردید." });
        props.loadData();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingStorage.id === 0 ? "بخش جدید" : "ویرایش بخش"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveStorage}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>کد بخش:</label>
          <Input
            placeholder="کد بخش"
            type="text"
            name="code"
            value={props.editingStorage.code}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام بخش:</label>
          <Input
            placeholder="نام بخش"
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

SubModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingStorage: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingStorage: PropTypes.func.isRequired,
  createSubStorage: PropTypes.func.isRequired,
  updateSubStorage: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(SubModal);
