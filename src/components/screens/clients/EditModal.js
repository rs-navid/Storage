import React from "react";
import PropTypes from "prop-types";
import { Form, Input, TextArea } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";

const EditModal = (props) => {
  // Handle input vals
  const handleInput = (e) => {
    props.setEditingClient({
      ...props.editingClient,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveClient = async () => {
    if (props.editingClient.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام معتبر نمی باشد." });
    } else {
      let result = null;
      if (props.editingClient.id === 0) {
        result = await props.createClient(props.editingClient);
      } else {
        result = await props.updateClient(props.editingClient);
      }

      if (result) {
        if (result.data) {
          props.setEditingClient({
            ...props.editingClient,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "مشتری با موفقیت ثبت گردید." });
        console.log(props.filter, props.page);
        props.loadData({...props.filter});
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title={props.editingClient.id === 0 ? "مشتری جدید" : "ویرایش مشتری"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveClient}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>نام:</label>
          <Input placeholder="نام" type="text" name="name" value={props.editingClient.name} onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>کد اقتصادی:</label>
          <Input
            placeholder="کد اقتصادی"
            type="text"
            name="codeEghtesadi"
            value={props.editingClient.codeEghtesadi}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شماره ثبت:</label>
          <Input
            placeholder="شماره ثبت"
            type="text"
            name="shomareSabt"
            value={props.editingClient.shomareSabt}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>شناسه ملی:</label>
          <Input
            placeholder="شناسه ملی"
            type="text"
            name="shenaseMeli"
            value={props.editingClient.shenaseMeli}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>استان:</label>
          <Input
            placeholder="استان"
            type="text"
            name="state"
            value={props.editingClient.state}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>شهر:</label>
          <Input placeholder="شهر" type="text" name="city" value={props.editingClient.city} onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>آدرس:</label>
          <TextArea placeholder="آدرس" value={props.editingClient.address} name="address" onChange={handleInput} />
        </div>

        {/* <div className="clearfix"></div>
        <div className="line-break"></div> */}

        <div className="field-wrapper field-50 right-50">
          <label>کد پستی:</label>
          <Input
            placeholder="کد پستی"
            type="text"
            name="zipCode"
            value={props.editingClient.zipCode}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>شماره تماس:</label>
          <Input
            placeholder="شماره تماس"
            type="text"
            name="phoneNumber"
            value={props.editingClient.phoneNumber}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>توضیحات:</label>
          <TextArea
            placeholder="توضیحات"
            value={props.editingClient.description}
            onChange={handleInput}
            name="description"
          />
        </div>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingClient: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingClient: PropTypes.func.isRequired,
  createClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(EditModal);
