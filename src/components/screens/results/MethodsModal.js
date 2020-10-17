import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Modal from "../../UI/modal/Modal";
import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";
import ResultModal from "./ResultModal";

import { getSampleMethodsByType } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const MethodsModal = (props) => {
  const [methods, setMethods] = useState([]);
  const [modalResultStatus, setModalResultStatus] = useState(false);
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
    const results = await props.getSampleMethodsByType(props.sampleId, props.type);

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
                <SubItems data={["مقدار استاندارد:", item.range, "نتیجه:", item.sample_method.result ? item.sample_method.result : ""]} />
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
        loadSamples = {props.loadSamples}
        loadRequests = {props.loadRequests}
        showDialog={props.showDialog}
        method={selectedMethod}
        exam={selectedExam}
        id={id}
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

export default connect(null, { getSampleMethodsByType, showDialog })(MethodsModal);
