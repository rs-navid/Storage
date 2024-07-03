import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";
import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
import SubModal from "./SubModal";
// import MethodsModal from "./MethodsModal";
// import openBase64NewTab from "../../../helpers/openBase64NewTab";

import { getSubStorages, deleteSubStorages,updateSubStorage, createSubStorage } from "../../../store/actions/storageActions";
import { showDialog } from "../../../store/actions/dialogActions";

// import { printAgreement } from "../../../store/actions/requestActions";

const storageObject = {
  name: "",
  code: "",
  id: 0,
  parentId: 0
};

const SubsModal = (props) => {
  const [subs, setSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState(0);
  const [subModalStatus, setSubModalStatus] = useState(false);
  // const [MethodsModalStatus, setMethodsModalStatus] = useState(false);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [editingStorage, setEditingStorage] = useState(storageObject);

  useEffect(() => {
    if (props.open) {
      loadSubs();
    }
    // eslint-disable-next-line
  }, [props.mainId]);

  // Load samples
  const loadSubs = async () => {
    const results = await props.getSubStorages({parentId:props.mainId});

    if (results) {
      setSubs(results.rows);
      // setPeriodKey(results.key);
      setSelectedSubs([]);
    }
  };

  // Handle on edit click
  const handleEditButtonClick = (id, name, code) => {
    setEditingStorage({id, name, code, parentId: props.mainId});
    setSubModalStatus(true);
  };

  // Handle on new click
  const handleNewButtonClick = () => {
    setEditingStorage({...storageObject, parentId: props.mainId});
    setSubModalStatus(true);
  };

  // Handle selection change
  const handleSelectionChange = (id) => {
    if (selectedSubs.indexOf(id) === -1) {
      setSelectedSubs([...selectedSubs, id]);
    } else {
      const newSelected = [...selectedSubs];
      newSelected.splice(selectedSubs.indexOf(id), 1);
      setSelectedSubs(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedSubs.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedSubs.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteSubs,
      });
    }
  };

  // Delete
  const deleteSubs = async () => {
    const resutlt = await props.deleteSubStorages(selectedSubs);
    if (resutlt) {
      props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
      loadSubs();
      props.loadData(props.filter);
    }
  };

  // Handle methods button click
  const handleMethodClick = (id) => {
    setSelectedSub(id);
    // setMethodsModalStatus(true);
  };

  // Handle new print receipt
  // const handlePrintButtonClick = async (id) => {
  //   const result = await props.printAgreement(id);

  //   if (result) {
  //     if (result.data) {
  //       openBase64NewTab(result.data);
  //     }
  //   }
  // };

  return (
    <Fragment>
      <SubModal
        open={subModalStatus}
        editingStorage={editingStorage}
        setOpen={setSubModalStatus}
        setEditingStorage={setEditingStorage}
        createSubStorage={props.createSubStorage}
        updateSubStorage={props.updateSubStorage}
        loadData={loadSubs}
        showDialog={props.showDialog}
      />

      <Modal
        open={props.open}
        title={`بخش های انبار (${props.mainName})`}
        cancel={() => {
          // props.setRequestId(0);
          props.setOpen(false);
        }}
        // save={handleSaveRequest}
      >
        {/* Start actions */}
        <div className="actions pt-4 pb-5 align-left">
          <Button icon labelPosition="right" color="blue" size="tiny" onClick={confirmDelete}>
            حذف
            <Icon name="trash" />
          </Button>
          <Button icon labelPosition="right" size="tiny" color="blue" onClick={handleNewButtonClick}>
            جدید
            <Icon name="add" />
          </Button>
        </div>
        {/* End actions */}

        {/* Start list */}
        <div style={{ height: "350px", overflowY: "auto" }} className="container">
          {subs.map((item) => {
            return (
              <ListItemWithCheckboxAndEdit
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id, item.name, item.code)}
                onChange={() => handleSelectionChange(item.id)}
              >
                <SubItems data={["کد بخش:", item.code, "نام بخش:", item.name]} />
              </ListItemWithCheckboxAndEdit>
            );
          })}
        </div>
        {/* End list */}
      </Modal>

      {/* <SampleModal
        setOpen={setSampleModalStatus}
        open={sampleModalStatus}
        selectedSample={selectedSample}
        requestId={props.requestId}
        loadSamples={loadSamples}
        setSelectedSample={setSelectedSample}
      /> */}

      {/* <MethodsModal
        setOpen={setMethodsModalStatus}
        open={MethodsModalStatus}
        sampleId={selectedSample}
        setSampleId={setSelectedSample}
        loadSamples={loadSamples}
        loadRequests={props.loadRequests}
      /> */}
    </Fragment>
  );
};

SubsModal.propTypes = {
  mainId: PropTypes.number.isRequired,
  // setRequestId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  // loadRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { deleteSubStorages, getSubStorages, updateSubStorage, createSubStorage, showDialog })(SubsModal));
