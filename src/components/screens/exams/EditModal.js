import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const EditModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingExam({
      ...props.editingExam,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveExam = async () => {
    if (props.editingExam.code.trim() === "") {
      props.showDialog({ title: "خطا", text: "کد آزمون معتبر نمی باشد." });
    } else if (props.editingExam.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام آزمون معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingExam.id === 0) {
        result = await props.createExam(props.editingExam);
      } else {
        result = await props.updateExam(props.editingExam);
      }

      if (result) {
        if (result.data) {
          props.setEditingExam({
            ...props.editingExam,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "آزمون با موفقیت ثبت گردید." });
        props.loadData(props.location.search);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingExam.id === 0 ? "آزمون جدید" : "ویرایش آزمون"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveExam}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>کد آزمون:</label>
          <Input placeholder="کد آزمون" type="text" name="code" value={props.editingExam.code} onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام آزمون:</label>
          <Input
            placeholder="نام آزمون"
            type="text"
            name="name"
            value={props.editingExam.name}
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
  editingExam: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingExam: PropTypes.func.isRequired,
  createExam: PropTypes.func.isRequired,
  updateExam: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(EditModal);
