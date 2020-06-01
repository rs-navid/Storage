import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";
import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";
import ResultModal from "./ResultModal";
import PointsModal from "./PointsModal";
import PrintModal from "./PrintModal";
import methodTypes from "../../../configs/methodTypes";

import { getSampleMethods } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const MethodsModal = (props) => {
  const [methods, setMethods] = useState([]);
  const [modalResultStatus, setModalResultStatus] = useState(false);
  const [modalPointsStatus, setModalPointsStatus] = useState(false);
  const [modalPrintStatus, setModalPrintStatus] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [selectedExam, setSelectedExam] = useState({});
  const [id, setId] = useState(0);

  useEffect(() => {
    if (props.open) {
      loadMethods();
    }
    // eslint-disable-next-line
  }, [props.sampleId]);

  // Load samples
  const loadMethods = async () => {
    const results = await props.getSampleMethods(props.sampleId);

    console.log(results);
    if (results) {
      setMethods(results.methods);
    }
  };

  // Handle result button click
  const handleResultButtonClick = (method, exam, id) => {
    setId(id);
    setSelectedExam(exam);
    setSelectedMethod(method);
    setModalResultStatus(true);
  };

  // Handle points and descriptions button click
  const handleEditPointsButtonClick = () => {
    setModalPointsStatus(true);
  };

  // Handle print button click
  const handlePrintButtonClick = () => {
    setModalPrintStatus(true);
  };

  return (
    <Fragment>
      <Modal
        open={props.open}
        title="آزمون ها"
        cancel={() => {
          props.setSampleId(0);
          props.setOpen(false);
        }}
        // save={handleSaveRequest}
      >
        {/* Start actions */}
        <div className="actions pt-4 pb-5 align-left">
          <Button
            icon
            labelPosition="right"
            className="mb-2"
            color="blue"
            size="small"
            onClick={handleEditPointsButtonClick}
          >
            ثبت تفاسیر
            <Icon name="pie chart" />
          </Button>
          <Button icon labelPosition="right" size="small" color="blue" onClick={handlePrintButtonClick}>
            چاپ
            <Icon name="print" />
          </Button>
        </div>
        {/* End actions */}

        {/* Start list */}
        <div style={{ height: "350px", overflowY: "auto" }} className="container">
          {methods.map((item, index) => {
            return (
              <ListItemWithSelect
                id={item.sample_method.id}
                key={item.sample_method.id}
                onClick={() =>
                  handleResultButtonClick(
                    { code: item.code, name: item.name, range: item.range },
                    { code: item.exam.code, name: item.exam.name },
                    item.sample_method.id
                  )
                }
                title="نتیجه"
                icon="file alternate"
              >
                <SubItems data={["کد آزمون:", item.exam.code, "نام آزمون:", item.exam.name]} />
                <SubItems data={["کد روش آزمون:", item.code, "نام روش آزمون:", item.name]} />
                <SubItems
                  data={[
                    "نوع آزمون:",
                    methodTypes[item.methodTypeId - 1].name,
                    "نتیجه:",
                    item.sample_method.result ? item.sample_method.result : "",
                  ]}
                />
                <SubItems data={["مقدار استاندارد:", item.range, "توضیحات:", item.sample_method.description]} />
              </ListItemWithSelect>
            );
          })}
        </div>
        {/* End list */}
      </Modal>

      <ResultModal
        open={modalResultStatus}
        setOpen={setModalResultStatus}
        loadMethods={loadMethods}
        loadSamples={props.loadSamples}
        loadRequests={props.loadRequests}
        showDialog={props.showDialog}
        method={selectedMethod}
        exam={selectedExam}
        id={id}
      />

      <PointsModal
        open={modalPointsStatus}
        setOpen={setModalPointsStatus}
        showDialog={props.showDialog}
        id={props.sampleId}
      />

      <PrintModal
        open={modalPrintStatus}
        setOpen={setModalPrintStatus}
        id={props.sampleId}
      />
    </Fragment>
  );
};

MethodsModal.propTypes = {
  sampleId: PropTypes.number.isRequired,
  setSampleId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
};

export default connect(null, { getSampleMethods, showDialog })(MethodsModal);
