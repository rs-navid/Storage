import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Icon, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";

import EditModal from "./EditModal";
import ExamModal from "./ExamModal";

import { showDialog } from "../../../store/actions/dialogActions";
import { getFirstExam } from "../../../store/actions/examActions";
import {
  getMethod,
  getMethodsByExamId,
  createMethod,
  updateMethod,
  deleteMethods,
} from "../../../store/actions/methodActions";

import methodTypes from "../../../configs/methodTypes";
import faults from "../../../configs/faults";

const methodObject = {
  code: "",
  name: "",
  way: "",
  id: 0,
  price: 0,
  range: "",
  unit: "",
  fault: faults[0].name,
  contractor: 0,
  isDeleted: false,
  methodTypeId: 1,
};

const Method = (props) => {
  const [methods, setMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedExam, setSelectedExam] = useState({ id: 0, code: "", name: "" });
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [examModalStatus, setExamModalStatus] = useState(false);
  const [editingMethod, setEditingMethod] = useState(methodObject);

  // Component did mount
  useEffect(() => {
    loadFirstExam();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedExam.id !== 0) {
      loadMethods();
    } else {
      setMethods([]);
    }
    // eslint-disable-next-line
  }, [selectedExam]);

  // Load first exam
  const loadFirstExam = async () => {
    const exam = await props.getFirstExam();
    if (exam) {
      setSelectedExam(exam);
    }
  };

  // Load methods
  const loadMethods = async () => {
    const ms = await props.getMethodsByExamId(selectedExam.id);
    setMethods([]);
    setSelectedMethods([]);

    if (ms) {
      setMethods(ms);
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

  // Confirm delete
  const confirmDelete = () => {
    if (selectedMethods.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedMethods.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteMethods,
      });
    }
  };

  // Delete
  const deleteMethods = async () => {
    const resutlt = await props.deleteMethods(selectedMethods);
    if (resutlt) {
      props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
      loadMethods();
    }
  };

  // Click on new button
  const handleNewButtonClick = () => {
    if (selectedExam.id === 0) {
      props.showDialog({ title: "خطا", text: "آزمونی انتخاب نشده است." });
    } else {
      setEditingMethod(methodObject);
      setEditModalStatus(true);
    }
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const result = await props.getMethod(id);
    if (result) {
      setEditingMethod({ ...result, contractor: result.contractor ? 1 : 0 });
      setEditModalStatus(true);
    }
  };

  const handleSelectClick = () => {
    setExamModalStatus(true);
  };

  return (
    <Fragment>
      {/* Start exam modal */}
      <ExamModal open={examModalStatus} setOpen={setExamModalStatus} setSelected={setSelectedExam} />
      {/* End exam modal */}

      {/* Start edit modal */}
      <EditModal
        open={editModalStatus}
        editingMethod={editingMethod}
        setOpen={setEditModalStatus}
        setEditingMethod={setEditingMethod}
        createMethod={props.createMethod}
        updateMethod={props.updateMethod}
        loadData={loadMethods}
        showDialog={props.showDialog}
        examId={selectedExam.id}
      />
      {/* End edit modal */}

      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" color="blue" size="small" onClick={confirmDelete}>
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small" color="blue" onClick={handleNewButtonClick}>
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {/* End actions */}

      {/* Start exam container */}
      <div className="container">
        <div className="field-wrapper field-100 my-3 label-sm">
          <label>آزمون:</label>
          <Input
            action={{ content: "انتخاب", onClick: handleSelectClick }}
            value={selectedExam.code + " | " + selectedExam.name}
            actionPosition="left"
            disabled
          />
        </div>
      </div>
      {/* End exam container */}

      {/* Start list */}
      {methods.map((item) => {
        return (
          <ListItemWithCheckboxAndEdit
            id={item.id}
            key={item.id}
            onClick={() => handleEditButtonClick(item.id)}
            onChange={() => handleSelectionChange(item.id)}
          >
            <SubItems data={["روش آزمون:", item.code, "نام روش آزمون:", item.name]} />
            <SubItems data={["نوع روش آزمون:", methodTypes[item.methodTypeId - 1].name]} />
          </ListItemWithCheckboxAndEdit>
        );
      })}
      {/* End list */}
    </Fragment>
  );
};

export default withRouter(
  connect(null, { showDialog, getMethod, getFirstExam, getMethodsByExamId, updateMethod, createMethod, deleteMethods })(
    Method
  )
);
