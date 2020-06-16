import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import WindowedSelect from "react-windowed-select";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";
import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";

import methodTypes from "../../../configs/methodTypes";

import { getExams } from "../../../store/actions/examActions";
import { getMethodsByExamId } from "../../../store/actions/methodActions";
import { createMethods } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const AddMethodsModal = (props) => {
  const [exams, setexams] = useState([]);
  const [methods, setMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [defaultExam, setDefaultExam] = useState(null);

  useEffect(() => {
    loadExams();
    // eslint-disable-next-line
  }, [props.selectedSample]);

  // Load samples
  const loadExams = async () => {
    const result = await props.getExams("?page_size=9999999");

    if (result) {
      setexams(
        result.rows.map((item) => {
          return {
            label: item.code + " | " + item.name,
            value: item.id,
          };
        })
      );
    }
  };

  // Handle exam change
  const handleExamChange = async (data) => {
    const results = await props.getMethodsByExamId(data.value);
    setSelectedMethods([]);
    setDefaultExam(exams.find((exam) => exam.value === data.value));

    if (results) {
      setMethods(results);
    } else {
      setMethods([]);
    }
  };

  // Handle selection change
  const handleSelectionChange = (id) => {
    if (selectedMethods.indexOf(id) === -1) {
      setSelectedMethods([...selectedMethods, id]);
    } else {
      const newSelected = [...selectedMethods];
      newSelected.splice(selectedMethods.indexOf(id), 1);
      setSelectedMethods(newSelected);
    }
  };

  // Handle save
  const handleSave = async () => {
    if (selectedMethods.length > 0) {
      const result = await props.createMethods(props.sampleId, selectedMethods);

      if (result) {
        props.showDialog({ title: "ثبت", text: "آزمون ها با موفقیت افزوده شدند." });
        props.loadMethods();
        props.loadRequests(props.location.search);
        props.loadSamples();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title="افزودن آزمون"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSave}
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>روش آزمون:</label>
          <WindowedSelect
            options={exams}
            placeholder="روش آزمون"
            onChange={handleExamChange}
            defaultValue={defaultExam}
            className="WindowedSelect"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        {/* Start list */}
        <div style={{ height: "350px", overflowY: "auto" }} className="container">
          {methods.map((item) => {
            return (
              <ListItemWithCheckboxAndEdit
                id={item.id}
                key={item.id}
                hideAction
                onChange={() => handleSelectionChange(item.id)}
              >
                <SubItems data={["کد روش آزمون:", item.code, "نام روش آزمون:", item.name]} />
                <SubItems
                  data={[
                    "نوع آزمون:",
                    methodTypes[item.methodTypeId - 1].name,
                    "پیمانکار:",
                    item.contractor ? "دارد" : "ندارد",
                  ]}
                />
                <SubItems data={["هزینه:", item.price + " ریال"]} />
              </ListItemWithCheckboxAndEdit>
            );
          })}
        </div>
        {/* End list */}
      </Form>
    </Modal>
  );
};

AddMethodsModal.propTypes = {
  sampleId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadMethods: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { getExams, getMethodsByExamId, showDialog, createMethods })(AddMethodsModal));
