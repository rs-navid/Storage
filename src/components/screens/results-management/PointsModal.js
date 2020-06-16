import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";

import Modal from "../../UI/modal/Modal";

import { getPointsBySampleId, updatePointsBySampleId } from "../../../store/actions/sampleActions";
const defaultPoint = "نمونه فوق در بندهایی که مورد آزمون قرار گرفت با استاندارد ملی ایران به شماره مطابقت دارد.";

const defaultPoints = {
  microbialPoints: defaultPoint,
  chemicalPoints: defaultPoint,
  cellulosePoints: defaultPoint,
  packingPoints: defaultPoint,
  environmentPoints: defaultPoint,
};

const defaultDescriptions = {
  microbialDescriptions: "",
  chemicalDescriptions: "",
  celluloseDescriptions: "",
  packingDescriptions: "",
  environmentDescriptions: "",
};

const PointsModal = (props) => {
  const [points, setPoints] = useState(defaultPoints);
  const [descriptions, setDescriptions] = useState(defaultDescriptions);

  // Component did mount
  useEffect(() => {
    setPoints(defaultPoints);
    setDescriptions(defaultDescriptions);

    loadData();
    // eslint-disable-next-line
  }, [props.open]);

  // Load points and descriptions
  const loadData = async () => {
    if (props.id !== 0) {
      const results = await props.getPointsBySampleId(props.id);
      if (results) {
        if (results.descriptions) {
          setDescriptions(results.descriptions);
        }

        if (results.points) {
          setPoints({
            microbialPoints: results.points.microbialPoints !== undefined ? results.points.microbialPoints : defaultPoint,
            chemicalPoints: results.points.chemicalPoints !== undefined ? results.points.chemicalPoints : defaultPoint,
            cellulosePoints: results.points.cellulosePoints !== undefined ? results.points.cellulosePoints : defaultPoint,
            packingPoints: results.points.packingPoints !== undefined ? results.points.packingPoints : defaultPoint,
            environmentPoints: results.points.environmentPoints !== undefined ? results.points.environmentPoints : defaultPoint,
          });
        }
      }
    }
  };

  // Handle point input vals
  const handlePointInputs = (e) => {
    setPoints({
      ...points,
      [e.target.name]: e.target.value,
    });
  };

  // Handle description input vals
  const handleDescriptionInputs = (e) => {
    setDescriptions({
      ...descriptions,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSave = async () => {
    const result = await props.updatePointsBySampleId(props.id, points, descriptions);

    if (result) {
      props.showDialog({ title: "ثبت", text: "تفاسیر با موفقیت ثبت گردید." });
    }
  };

  return (
    <Modal
      open={props.open}
      title="ثبت تفاسیر و توضیحات نتایج"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSave}
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>تفسیر نتایج میکروبی:</label>
          <TextArea
            placeholder="تفسیر نتایج میکروبی"
            name="microbialPoints"
            value={points.microbialPoints}
            onChange={handlePointInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>تفسیر نتایج شیمیایی:</label>
          <TextArea
            placeholder="تفسیر نتایج شیمیایی"
            name="chemicalPoints"
            value={points.chemicalPoints}
            onChange={handlePointInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>تفسیر نتایج سلولزی:</label>
          <TextArea
            placeholder="تفسیر نتایج سلولزی"
            name="cellulosePoints"
            value={points.cellulosePoints}
            onChange={handlePointInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>تفسیر نتایج بسته بندی:</label>
          <TextArea
            placeholder="تفسیر نتایج بسته بندی"
            name="packingPoints"
            value={points.packingPoints}
            onChange={handlePointInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>توضیحات میکروبی:</label>
          <TextArea
            placeholder="توضیحات میکروبی"
            name="microbialDescriptions"
            value={descriptions.microbialDescriptions}
            onChange={handleDescriptionInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>توضیحات شیمیایی:</label>
          <TextArea
            placeholder="توضیحات شیمیایی"
            name="chemicalDescriptions"
            value={descriptions.chemicalDescriptions}
            onChange={handleDescriptionInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>توضیحات سلولزی:</label>
          <TextArea
            placeholder="توضیحات سلولزی"
            name="celluloseDescriptions"
            value={descriptions.celluloseDescriptions}
            onChange={handleDescriptionInputs}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>توضیحات بسته بندی:</label>
          <TextArea
            placeholder="توضیحات بسته بندی"
            name="packingDescriptions"
            value={descriptions.packingDescriptions}
            onChange={handleDescriptionInputs}
          />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

PointsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(null, { getPointsBySampleId, updatePointsBySampleId })(PointsModal);
