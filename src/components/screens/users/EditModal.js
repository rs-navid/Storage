import React from "react";
import PropTypes from "prop-types";
import { Input, Checkbox } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";
import permissions from "../../../configs/permissions";

const EditModal = (props) => {
  return (
    <Modal
      open={props.open}
      title={props.editingUser.id === 0 ? "کاربر جدید" : "ویرایش کاربر"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={props.handleSaveUser}
    >
      <div className="field-wrapper field-50 right-50">
        <label>نام و نام خانوادگی:</label>
        <Input
          placeholder="نام و نام خانوادگی"
          type="text"
          name="name"
          value={props.editingUser.name}
          onChange={props.handleInput}
        />
      </div>
      <div className="field-wrapper field-50 left-50">
        <label>نام کاربری:</label>
        <Input
          placeholder="نام کاربری"
          type="text"
          name="username"
          value={props.editingUser.username}
          onChange={props.handleInput}
        />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="field-wrapper field-50 right-50">
        <label>کلمه عبور:</label>
        <Input
          placeholder="کلمه عبور"
          type="password"
          name="password1"
          value={props.editingUser.password}
          onChange={props.handleInput}
        />
      </div>
      <div className="field-wrapper field-50 left-50">
        <label>تکرار کلمه عبور:</label>
        <Input
          placeholder="تکرار کلمه عبور"
          type="password"
          name="password_confirm"
          value={props.editingUser.password_confirm}
          onChange={props.handleInput}
        />
      </div>
      <div className="clearfix"></div>
      <div className="line-break"></div>
      <div className="listbox p-2" style={{ height: "300px", overflowY: "auto", border: "1px solid #eee" }}>
        {permissions.map((item) => {
          if (!item.type && !item.isHidden) {
            return (
              <div key={item.id}>
                <Checkbox
                  value={item.id}
                  label={item.text}
                  onClick={() => {
                    props.handleCheckbox(item.id);
                  }}
                  defaultChecked={props.handleCheckmark(item.id)}
                  className="checkbox py-1"
                  style={{ fontSize: ".875rem" }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingUser: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSaveUser: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleCheckmark: PropTypes.func.isRequired,
};

export default EditModal;
