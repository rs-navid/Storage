import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Modal from "../../UI/modal/Modal";
import PriceModal from "./PriceModal";
import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";
import methodTypes from "../../../configs/methodTypes";

import { getSampleMethods } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const MethodsModal = (props) => {
  const [methods, setMethods] = useState([]);
  const [priceModalStatus, setPriceModalStatus] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({ id: 0, price: 0 });

  useEffect(() => {
    if (props.open) {
      loadMethods();
    }
    // eslint-disable-next-line
  }, [props.sampleId, props.open]);

  // Load samples
  const loadMethods = async () => {
    const results = await props.getSampleMethods(props.sampleId);

    if (results) {
      setMethods(results.methods);
    }
  };

  // Handle on edit click
  const handlePriceButtonClick = (id, index) => {
    setSelectedMethod({ id, price: methods[index].sample_method.price });
    setPriceModalStatus(true);
  };

  // Thousands separator
  const thousands_separators = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                onClick={() => handlePriceButtonClick(item.sample_method.id, index)}
                title="هزینه"
                icon="dollar"
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
                <SubItems data={["مبلغ:", thousands_separators(item.sample_method.price), "", ""]} />
              </ListItemWithSelect>
            );
          })}
        </div>
        {/* End list */}
      </Modal>
      <PriceModal
        open={priceModalStatus}
        setOpen={setPriceModalStatus}
        id={selectedMethod.id}
        price={selectedMethod.price}
        loadData={loadMethods}
        loadSamples={props.loadSamples}
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
