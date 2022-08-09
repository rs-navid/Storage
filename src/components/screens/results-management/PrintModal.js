import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import moment from "jalali-moment";

import Modal from "../../UI/modal/Modal";
import methodTypes from "../../../configs/methodTypes";

import { print,newPrint, printeEvironmentResults, getSample } from "../../../store/actions/sampleActions";

const methodTypeValues = methodTypes.map((item) => {
  return {
    key: item.id,
    text: item.name,
    value: item.id,
  };
});

const methodIsoValues = [
  {key:1, text: "می باشد", value: true},
  {key:0, text: "نمی باشد", value: false},
]

const PrintModal = (props) => {
  const [dates, setDates] = useState({
    date: utils("fa").getToday(),
    startMicrobi: utils("fa").getToday(),
    endMicrobi: utils("fa").getToday(),
    startShimiaie: utils("fa").getToday(),
    endShimiaie: utils("fa").getToday(),
    startSelolozi: utils("fa").getToday(),
    endSelolozi: utils("fa").getToday(),
    startPacking: utils("fa").getToday(),
    endPacking: utils("fa").getToday(),
    startEnvironment: utils("fa").getToday(),
    endEnvironment: utils("fa").getToday(),
  });
  const [type, setType] = useState(1);
  const [is17025, setIs17025] = useState(1);

  useEffect(() => {
    if (props.id) {
      loadSample();
    }
    // eslint-disable-next-line
  }, [props.id, props.open]);

  // Load samples
  const loadSample = async () => {
    const result = await props.getSample(props.id);

    if (result) {
      const startMicrobi = moment.from(result.startMicrobi, "en", "YYYY-MM-DD").locale("fa").toObject();
      const endMicrobi = moment.from(result.endMicrobi, "en", "YYYY-MM-DD").locale("fa").toObject();

      const startShimiaie = moment.from(result.startShimiaie, "en", "YYYY-MM-DD").locale("fa").toObject();
      const endShimiaie = moment.from(result.endShimiaie, "en", "YYYY-MM-DD").locale("fa").toObject();

      const startSelolozi = moment.from(result.startSelolozi, "en", "YYYY-MM-DD").locale("fa").toObject();
      const endSelolozi = moment.from(result.endSelolozi, "en", "YYYY-MM-DD").locale("fa").toObject();

      const startPacking = moment.from(result.startPacking, "en", "YYYY-MM-DD").locale("fa").toObject();
      const endPacking = moment.from(result.endPacking, "en", "YYYY-MM-DD").locale("fa").toObject();

      const startEnvironment = moment.from(result.startEnvironment, "en", "YYYY-MM-DD").locale("fa").toObject();
      const endEnvironment = moment.from(result.endEnvironment, "en", "YYYY-MM-DD").locale("fa").toObject();

      setIs17025(result.is17025);

      setDates({
        date: utils("fa").getToday(),
        startMicrobi: { year: startMicrobi.years, month: startMicrobi.months + 1, day: startMicrobi.date },
        startShimiaie: { year: startShimiaie.years, month: startShimiaie.months + 1, day: startShimiaie.date },
        startSelolozi: { year: startSelolozi.years, month: startSelolozi.months + 1, day: startSelolozi.date },
        startPacking: { year: startPacking.years, month: startPacking.months + 1, day: startPacking.date },
        startEnvironment: {
          year: startEnvironment.years,
          month: startEnvironment.months + 1,
          day: startEnvironment.date,
        },
        endMicrobi: { year: endMicrobi.years, month: endMicrobi.months + 1, day: endMicrobi.date },
        endShimiaie: { year: endShimiaie.years, month: endShimiaie.months + 1, day: endShimiaie.date },
        endSelolozi: { year: endSelolozi.years, month: endSelolozi.months + 1, day: endSelolozi.date },
        endPacking: { year: endPacking.years, month: endPacking.months + 1, day: endPacking.date },
        endEnvironment: { year: endEnvironment.years, month: endEnvironment.months + 1, day: endEnvironment.date },
      });
    }
  };

  // Handle date changes
  const handleDateChanges = (data, target) => {
    setDates({
      ...dates,
      [target]: data,
    });
  };

  // Handle Type change
  const handleTypeChange = (e, data) => {
    setType(data.value);
  };

    // Handle Iso change
    const handleIsoChange = (e, data) => {
      setIs17025(data.value);
    };

  // Print
  const handlePrint = async () => {
    let result;
    if (type !== 5) {
      result = await props.print(props.id, { type: type, ...dates, is17025 });
    } else {
      result = await props.printeEvironmentResults(props.id, { type: type, ...dates });
    }

    if (result) {
      if (result.data) {
        const file = new Blob([result.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    }
  };

  // New Print
  const handleNewPrint = async () => {
    const result = await props.newPrint(props.id, { type: type, ...dates, is17025 });

    if (result) {
      if (result.data) {
        const file = new Blob([result.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    }
  };

  return (
    <Modal
      open={props.open}
      title="چاپ"
      cancel={() => {
        props.setOpen(false);
      }}
      save={handlePrint}
      saveTitle="چاپ نتایج"
      saveIcon="print"
      otherSave={handleNewPrint}
      otherSaveTitle="چاپ نتایج جدید"
      otherSaveIcon="print"
    >
      <Form>
        <div className="field-wrapper field-100">
          <label>تاریخ صدور نتیجه:</label>
          <DatePicker
            value={dates.date}
            onChange={(val) => {
              handleDateChanges(val, "date");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شروع میکروبی:</label>
          <DatePicker
            value={dates.startMicrobi}
            onChange={(val) => {
              handleDateChanges(val, "startMicrobi");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>پایان میکروبی:</label>
          <DatePicker
            value={dates.endMicrobi}
            onChange={(val) => {
              handleDateChanges(val, "endMicrobi");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شروع شیمیایی:</label>
          <DatePicker
            value={dates.startShimiaie}
            onChange={(val) => {
              handleDateChanges(val, "startShimiaie");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>پایان شیمیایی:</label>
          <DatePicker
            value={dates.endShimiaie}
            onChange={(val) => {
              handleDateChanges(val, "endShimiaie");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شروع سلولزی:</label>
          <DatePicker
            value={dates.startSelolozi}
            onChange={(val) => {
              handleDateChanges(val, "startSelolozi");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>پایان سلولزی:</label>
          <DatePicker
            value={dates.endSelolozi}
            onChange={(val) => {
              handleDateChanges(val, "endSelolozi");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شروع بسته بندی:</label>
          <DatePicker
            value={dates.startPacking}
            onChange={(val) => {
              handleDateChanges(val, "startPacking");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>پایان بسته بندی:</label>
          <DatePicker
            value={dates.endPacking}
            onChange={(val) => {
              handleDateChanges(val, "endPacking");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شروع محیط زیست:</label>
          <DatePicker
            value={dates.startEnvironment}
            onChange={(val) => {
              handleDateChanges(val, "startEnvironment");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>پایان محیط زیست:</label>
          <DatePicker
            value={dates.endEnvironment}
            onChange={(val) => {
              handleDateChanges(val, "endEnvironment");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>نوع نتایج:</label>
          <Dropdown fluid selection name="type" value={type} onChange={handleTypeChange} options={methodTypeValues} />
        </div>

        <div className="field-wrapper field-100">
          <label>در حوزه 17025:</label>
          <Dropdown fluid selection name="is17025" value={is17025} onChange={handleIsoChange} options={methodIsoValues} />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

PrintModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(null, { print,newPrint, printeEvironmentResults, getSample })(PrintModal);
