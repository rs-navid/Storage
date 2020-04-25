import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";
import ListItemWithCheckboxAndEditAndOther, {SubItems} from '../../UI/list/ListItemWithCheckboxAndEditAndOther'

import { getSamples } from "../../../store/actions/sampleActions";

const SamplesModal = (props) => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    loadSamples();
  }, [props.requestId]);

  // Load samples
  const loadSamples = async () => {
    console.log('here:::::::::::::::',props.requestId);
    const results = await props.getSamples(props.requestId);

    if (results) {
      setSamples(results);
    }
  };

  return (
    <Modal
      open={props.open}
      title="نمونه ها"
      cancel={() => {
        props.setOpen(false);
      }}
      // save={handleSaveRequest}
    >
      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" color="blue" size="small">
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small" color="blue">
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {/* End actions */}

      {/* Start list */}
      <div style={{maxHeight:'200px', overflowY: 'auto'}} className="px-2">
        {samples.map((item) => {

          return (
            <ListItemWithCheckboxAndEditAndOther
              id={item.id}
              key={item.id}
              // onClick={() => handleEditButtonClick(item.id)}
              // onChange={() => handleSelectionChange(item.id)}
              // onOther = {() => handleMethodClick(item.id)}
              otherTitle = "آزمون ها"
              otherIcon= "list layout"
            >
              <SubItems data={["کد شناسایی نمونه:", item.num, "نام نمونه:", item.name]} />
              <SubItems data={["نام تجاری:", item.businnessName, "نام شرکت:", item.company]} />
            </ListItemWithCheckboxAndEditAndOther>
          );
        })}
      </div>
      {/* End list */}
    </Modal>
  );
};

SamplesModal.propTypes = {
  requestId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default connect(null, { getSamples })(SamplesModal);
