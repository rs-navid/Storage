import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Modal from "../../UI/modal/Modal";
import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";
import MethodsModal from "./MethodsModal";

import { getSamplesByType } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const SamplesModal = (props) => {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(0);
  const [MethodsModalStatus, setMethodsModalStatus] = useState(false);
  const [periodKey, setPeriodKey] = useState("-");

  useEffect(() => {
    if (props.open) {
      loadSamples();
    }
    // eslint-disable-next-line
  }, [props.requestId]);

  // Load samples
  const loadSamples = async () => {
    console.log(props.type);
    const results = await props.getSamplesByType(props.requestId, props.type);

    if (results) {
      setSamples(results.rows);
      setPeriodKey(results.key);
    }
  };

  // Handle methods button click
  const handleMethodClick = (id) => {
    setSelectedSample(id);
    setMethodsModalStatus(true);
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
        {/* Start list */}
        <div style={{ height: "350px", overflowY: "auto" }} className="container">
          {samples.map((item) => {
            return (
              <ListItemWithSelect
                id={item.id}
                key={item.id}
                onClick={() => handleMethodClick(item.id)}
                title="آزمون ها"
                icon="list layout"
              >
                <SubItems data={["کد شناسایی نمونه:", "S" + periodKey + "-" + item.num, "نام نمونه:", item.name]} />
                <SubItems data={["نام تجاری:", item.businnessName, "نام شرکت:", item.company]} />
                <SubItems data={["وضعیت:", item.unanswered > 0 ? "ناتمام" : "اتمام", "", ""]} />
              </ListItemWithSelect>
            );
          })}
        </div>
        {/* End list */}
      </Modal>

      <MethodsModal
        setOpen={setMethodsModalStatus}
        open={MethodsModalStatus}
        sampleId={selectedSample}
        setSampleId={setSelectedSample}
        type={props.type}
      />
    </Fragment>
  );
};

SamplesModal.propTypes = {
  requestId: PropTypes.number.isRequired,
  setRequestId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default connect(null, { getSamplesByType, showDialog })(SamplesModal);
