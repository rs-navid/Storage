import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const EditModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingPack({
      ...props.editingPack,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSavePack = async () => {
    if (props.editingPack.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام بسته بندی معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingPack.id === 0) {
        result = await props.createPack(props.editingPack);
      } else {
        result = await props.updatePack(props.editingPack);
      }

      if (result) {
        if (result.data) {
          props.setEditingPack({
            ...props.editingPack,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "بسته بندی با موفقیت ثبت گردید." });
        props.loadData(props.filter);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingPack.id === 0 ? "بسته بندی جدید" : "ویرایش بسته بندی"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSavePack}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>نام بسته بندی:</label>
          <Input
            placeholder="نام بسته بندی"
            type="text"
            name="name"
            value={props.editingPack.name}
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
  editingPack: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingPack: PropTypes.func.isRequired,
  createPack: PropTypes.func.isRequired,
  updatePack: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(EditModal);
