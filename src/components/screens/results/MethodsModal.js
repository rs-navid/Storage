import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Modal from "../../UI/modal/Modal";
import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";

import { getSampleMethodsByType } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";
import methodTypes from "../../../configs/methodTypes";

const MethodsModal = (props) => {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    if (props.open) {
      loadMethods();
    }
    // eslint-disable-next-line
  }, [props.sampleId]);

  // Load samples
  const loadMethods = async () => {
    console.log('msg', props.type);
    const results = await props.getSampleMethodsByType(props.sampleId, props.type);

    if (results) {
      setMethods(results.methods);
    }
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
                // onClick={() => handlePriceButtonClick(item.sample_method.id, index)}
                title="نتیجه"
                icon="file alternate"
              >
                <SubItems data={["کد آزمون:", item.exam.code, "نام آزمون:", item.exam.name]} />
                <SubItems data={["کد روش آزمون:", item.code, "نام روش آزمون:", item.name]} />
                <SubItems
                  data={[
                    "نوع آزمون:",
                    methodTypes[item.methodTypeId - 1].name,
                    "هزینه:",
                    thousands_separators(item.sample_method.price) + " ریال",
                  ]}
                />
                <SubItems
                  data={[
                    "نتیجه:",
                    item.sample_method.result ? item.sample_method.result : "",
                    "",
                    "",
                  ]}
                />
              </ListItemWithSelect>
            );
          })}
        </div>
        {/* End list */}
      </Modal>
    </Fragment>
  );
};

MethodsModal.propTypes = {
  sampleId: PropTypes.number.isRequired,
  setSampleId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default connect(null, { getSampleMethodsByType, showDialog })(MethodsModal);
