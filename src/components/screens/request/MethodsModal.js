import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";
import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
import AddMethodsModal from "./AddMethodsModal";
import PriceModal from "./PriceModal";

import { getSampleMethods, deleteMethods } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";
import methodTypes from "../../../configs/methodTypes";

const MethodsModal = (props) => {
  const [methods, setMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [addModalStatus, setAddModalStatus] = useState(false);
  const [priceModalStatus, setPriceModalStatus] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({ id: 0, price: 0 });

  useEffect(() => {
    if (props.open) {
      loadMethods();
    }
  }, [props.sampleId]);

  // Load samples
  const loadMethods = async () => {
    const results = await props.getSampleMethods(props.sampleId);

    if (results) {
      setMethods(results.methods);
      setSelectedMethods([]);
    }
  };

  // Handle on edit click
  const handlePriceButtonClick = (id, index) => {
    console.log(methods[index]);
    setSelectedMethod({ id, price: methods[index].sample_method.price });
    setPriceModalStatus(true);
  };

  // Handle on new click
  const handleNewButtonClick = () => {
    setAddModalStatus(true);
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
          {methods.map((item, index) => {
            return (
              <ListItemWithCheckboxAndEdit
                id={item.sample_method.id}
                key={item.sample_method.id}
                onClick={() => handlePriceButtonClick(item.sample_method.id, index)}
                onChange={() => handleSelectionChange(item.sample_method.id)}
                buttonText="هزینه"
                buttonIcon="dollar"
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
              </ListItemWithCheckboxAndEdit>
            );
          })}
        </div>
        {/* End list */}
      </Modal>

      <AddMethodsModal
        open={addModalStatus}
        setOpen={setAddModalStatus}
        sampleId={props.sampleId}
        loadMethods={loadMethods}
      />

      <PriceModal
        open={priceModalStatus}
        setOpen={setPriceModalStatus}
        id={selectedMethod.id}
        price={selectedMethod.price}
        loadData={loadMethods}
      />
    </Fragment>
  );
};

MethodsModal.propTypes = {
  sampleId: PropTypes.number.isRequired,
  setSampleId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default connect(null, { getSampleMethods, deleteMethods, showDialog })(MethodsModal);
