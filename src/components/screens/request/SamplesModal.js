import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/modal/Modal";
import ListItemWithCheckboxAndEditAndOther, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEditAndOther";
import SampleModal from "./SampleModal";
import MethodsModal from "./MethodsModal";
import openBase64NewTab from "../../../helpers/openBase64NewTab";

import { getSamples, deleteSamples } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

import { printAgreement } from "../../../store/actions/requestActions";

const SamplesModal = (props) => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(0);
  const [sampleModalStatus, setSampleModalStatus] = useState(false);
  const [MethodsModalStatus, setMethodsModalStatus] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [periodKey, setPeriodKey] = useState("-");

  useEffect(() => {
    if (props.open) {
      loadSamples();
    }
    // eslint-disable-next-line
  }, [props.requestId]);

  // Load samples
  const loadSamples = async () => {
    const results = await props.getSamples(props.requestId);

    if (results) {
      setSamples(results.rows);
      setPeriodKey(results.key);
      setSelectedSamples([]);
    }
  };

  // Handle on edit click
  const handleEditButtonClick = (id) => {
    setSelectedSample(id);
    setSampleModalStatus(true);
  };

  // Handle on new click
  const handleNewButtonClick = () => {
    setSelectedSample(0);
    setSampleModalStatus(true);
  };

  // Handle selection change
  const handleSelectionChange = (id) => {
    if (selectedSamples.indexOf(id) === -1) {
      setSelectedSamples([...selectedSamples, id]);
    } else {
      const newSelected = [...selectedSamples];
      newSelected.splice(selectedSamples.indexOf(id), 1);
      setSelectedSamples(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedSamples.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedSamples.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteSamples,
      });
    }
  };

  // Delete
  const deleteSamples = async () => {
    const resutlt = await props.deleteSamples(selectedSamples);
    if (resutlt) {
      props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
      loadSamples();
      props.loadRequests(props.location.search);
    }
  };

  // Handle methods button click
  const handleMethodClick = (id) => {
    setSelectedSample(id);
    setMethodsModalStatus(true);
  };

  // Handle new print receipt
  const handlePrintButtonClick = async (id) => {
    const result = await props.printAgreement(id);

    if (result) {
      if (result.data) {
        openBase64NewTab(result.data);
      }
    }
  };

  return (
    <Fragment>
      <Modal
        open={props.open}
        title="نمونه ها"
        cancel={() => {
          props.setRequestId(0);
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
          {samples.map((item) => {
            return (
              <ListItemWithCheckboxAndEditAndOther
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
                onOther={() => handleMethodClick(item.id)}
                otherTitle="آزمون ها"
                otherIcon="list layout"
                onPrint={() => {
                  handlePrintButtonClick(item.id);
                }}
                printTitle="توافقنامه"
              >
                <SubItems data={["کد شناسایی نمونه:", "S" + periodKey + "-" + item.num, "نام نمونه:", item.name]} />
                <SubItems data={["نام تجاری:", item.businnessName, "نام شرکت:", item.company]} />
                <SubItems data={["وضعیت:", item.unanswered > 0 ? "ناتمام" : "اتمام", "", ""]} />
              </ListItemWithCheckboxAndEditAndOther>
            );
          })}
        </div>
        {/* End list */}
      </Modal>

      <SampleModal
        setOpen={setSampleModalStatus}
        open={sampleModalStatus}
        selectedSample={selectedSample}
        requestId={props.requestId}
        loadSamples={loadSamples}
        setSelectedSample={setSelectedSample}
      />

      <MethodsModal
        setOpen={setMethodsModalStatus}
        open={MethodsModalStatus}
        sampleId={selectedSample}
        setSampleId={setSelectedSample}
        loadSamples={loadSamples}
        loadRequests={props.loadRequests}
      />
    </Fragment>
  );
};

SamplesModal.propTypes = {
  requestId: PropTypes.number.isRequired,
  setRequestId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { getSamples, deleteSamples, showDialog, printAgreement })(SamplesModal));
