import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import Modal from "../../UI/modal/Modal";

import { getMethodById, updateMethod } from "../../../store/actions/sampleActions";

const EditModal = (props) => {
  const [sampleMethod, setSampleMethod] = useState({
    result: "",
    description: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    examiner: ""
  });

  // Component did mount
  useEffect(() => {
    loadSampleMethod();
    // eslint-disable-next-line
  }, [props.id]);

  const loadSampleMethod = async () => {
    if (props.id !== 0) {
      const result = await props.getMethodById(props.id);

      console.log(result);
      if (result) {
        setSampleMethod({
          result: result.result ? result.result : "",
          description: result.description ? result.description : "",
          startTime: result.startTime ? result.startTime : "",
          endTime: result.endTime ? result.endTime : "",
          startDate: result.startDate ? result.startDate : "",
          endDate: result.endDate ? result.endDate : "",
          examiner: result.examiner ? result.examiner : "",
        });
      }
    }
  };

  // Handle input vals
  const handleInput = (e) => {
    setSampleMethod({
      ...sampleMethod,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveResult = async () => {
    let result = null;
    result = await props.updateMethod(props.id, sampleMethod);

    if (result) {
      props.showDialog({ title: "ثبت", text: "نتیجه با موفقیت ثبت گردید." });
      props.loadMethods();
      props.loadSamples();
      props.loadRequests(props.location.search, 0);
    }
  };

  return (
    <Modal
      open={props.open}
      title="ثبت نتیجه"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveResult}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>کد آزمون:</label>
          <Input type="text" value={props.exam.code} disabled />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام آزمون:</label>
          <Input type="text" value={props.exam.name} disabled />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>کد روش آزمون:</label>
          <Input type="text" value={props.method.code} disabled />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام روش آزمون:</label>
          <Input type="text" value={props.method.name} disabled />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>مقدار استاندارد:</label>
          <Input type="text" value={props.method.range} disabled />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نتیجه:</label>
          <Input type="text" value={sampleMethod.result} name="result" onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>آزمایش گیرنده:</label>
          <Input type="text" value={sampleMethod.examiner} name="examiner" onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>توضیحات:</label>
          <Input type="text" value={sampleMethod.description} name="description" onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تاریخ شروع:</label>
          <Input type="text" value={sampleMethod.startDate} name="startDate" onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>زمان شروع:</label>
          <Input type="text" value={sampleMethod.startTime} name="startTime" onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تاریخ پایان:</label>
          <Input type="text" value={sampleMethod.endDate} name="endDate" onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>زمان پایان:</label>
          <Input type="text" value={sampleMethod.endTime} name="endTime" onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadMethods: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
  method: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default withRouter(connect(null, { getMethodById, updateMethod })(EditModal));
