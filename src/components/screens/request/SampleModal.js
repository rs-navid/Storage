import React, { useEffect, useState } from "react";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "jalali-moment";
import { Form, Input, Dropdown } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";

import { getSample, createSample, updateSample } from "../../../store/actions/sampleActions";
import { showDialog } from "../../../store/actions/dialogActions";

const sampleObject = {
  id: 0,
  num: 0,
  name: "",
  businnessName: "",
  serial: "",
  company: "",
  place: "",
  amount: "",
  packing: "",
  dimension: "",
  amountIsValid: 1,
  packingIsValid: 1,
  productionDate: utils("fa").getToday(),
  samplingDate: utils("fa").getToday(),
  expireDate: "",
  letter: "",
  indicator: "",
  closed: "",
  standard: "",
  standardRef: "",
  latitude: "",
  longitude: "",
  waste: "",
  type: "",
  about: "",
  environmentType: "هیچکدام",
};

const sampleAmountValues = [
  { key: 1, value: 1, text: "کافی می باشد" },
  { key: 0, value: 0, text: "کافی نمی باشد" },
];

const samplePackingValues = [
  { key: 1, value: 1, text: "مناسب می باشد" },
  { key: 0, value: 0, text: "مناسب نمی باشد" },
];

const sampleEnvironmentTypeValues = [
  { key: 1, value: "هیچکدام", text: "هیچکدام" },
  { key: 2, value: "فرآیندی", text: "فرآیندی" },
  { key: 3, value: "خود اظهاری", text: "خود اظهاری" },
];

const SampleModal = (props) => {
  const [editingSample, setEditingSample] = useState(sampleObject);

  useEffect(() => {
    if (props.selectedSample) {
      loadSample();
    } else {
      setEditingSample(sampleObject);
    }
    // eslint-disable-next-line
  }, [props.selectedSample, props.open]);

  // Load samples
  const loadSample = async () => {
    const result = await props.getSample(props.selectedSample);

    if (result) {
      const production = moment.from(result.productionDate, "en", "YYYY-MM-DD").locale("fa").toObject();
      const sampling = moment.from(result.samplingDate, "en", "YYYY-MM-DD").locale("fa").toObject();

      setEditingSample({
        ...result,
        productionDate: { year: production.years, month: production.months + 1, day: production.date },
        samplingDate: { year: sampling.years, month: sampling.months + 1, day: sampling.date },
        amountIsValid: result.amountIsValid ? 1 : 0,
        packingIsValid: result.packingIsValid ? 1 : 0,
      });
    }
  };

  // Handle input vals
  const handleInput = (e) => {
    setEditingSample({
      ...editingSample,
      [e.target.name]: e.target.value,
    });
  };

  // Handle dropdown input vals
  const handleDropdownInput = (e, data) => {
    setEditingSample({
      ...editingSample,
      [data.name]: data.value,
    });
  };

  // Handle date changes
  const handleDateChanges = (data, target) => {
    setEditingSample({
      ...editingSample,
      [target]: data,
    });
  };

  // Handle save request
  const handleSaveSample = async () => {
    console.log(editingSample);

    let result = null;
    if (editingSample.id !== 0) {
      result = await props.updateSample(editingSample);
    } else {
      result = await props.createSample({ ...editingSample, requestId: props.requestId });
    }

    if (result) {
      if (result.data) {
        setEditingSample({
          ...editingSample,
          requestId: result.data.requestId,
          num: result.data.num,
          id: result.data.id,
        });
      }

      props.showDialog({ title: "ثبت", text: "نمونه با موفقیت ثبت گردید." });
      props.loadSamples();
    }
  };

  return (
    <Modal
      open={props.open}
      title={editingSample.id === 0 ? "نمونه جدید" : "ویرایش نمونه"}
      cancel={() => {
        props.setSelectedSample(0);
        props.setOpen(false);
      }}
      save={handleSaveSample}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>کد شناسایی نمونه:</label>
          <Input
            placeholder="کد شناسایی نمونه"
            type="text"
            name="num"
            value={editingSample.num}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام نمونه:</label>
          <Input placeholder="نام نمونه" type="text" name="name" value={editingSample.name} onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>نام تجاری:</label>
          <Input
            placeholder="نام تجاری"
            type="text"
            name="businnessName"
            value={editingSample.businnessName}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام شرکت:</label>
          <Input
            placeholder="نام شرکت"
            type="text"
            name="company"
            value={editingSample.company}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تعداد/مقدار :</label>
          <Input
            placeholder="تعداد/مقدار "
            type="text"
            name="amount"
            value={editingSample.amount}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>حجم/وزن:</label>
          <Input
            placeholder="حجم/وزن"
            type="text"
            name="dimension"
            value={editingSample.dimension}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شماره ساخت :</label>
          <Input
            placeholder="شماره ساخت "
            type="text"
            name="serial"
            value={editingSample.serial}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>تاریخ تولید:</label>
          <DatePicker
            value={editingSample.productionDate}
            onChange={(val) => {
              handleDateChanges(val, "productionDate");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تاریخ نمونه برداری :</label>
          <DatePicker
            value={editingSample.samplingDate}
            onChange={(val) => {
              handleDateChanges(val, "samplingDate");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>تاریخ انقضاء:</label>
          <Input
            placeholder="تاریخ انقضاء "
            type="text"
            name="expireDate"
            value={editingSample.expireDate}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>محل نمونه برداری :</label>
          <Input
            placeholder="محل نمونه برداری "
            type="text"
            name="place"
            value={editingSample.place}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>مقدار نمونه:</label>
          <Dropdown
            fluid
            selection
            name="amountIsValid"
            value={editingSample.amountIsValid}
            onChange={handleDropdownInput}
            options={sampleAmountValues}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>بسته بندی :</label>
          <Input
            placeholder="بسته بندی "
            type="text"
            name="packing"
            value={editingSample.packing}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نوع بسته بندی:</label>
          <Dropdown
            fluid
            selection
            name="packingIsValid"
            value={editingSample.packingIsValid}
            onChange={handleDropdownInput}
            options={samplePackingValues}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شماره نامه :</label>
          <Input
            placeholder="شماره نامه "
            type="text"
            name="letter"
            value={editingSample.letter}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>شماره اندیکاتور وارده:</label>
          <Input
            placeholder="شماره اندیکاتور وارده"
            type="text"
            name="indicator"
            value={editingSample.indicator}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شماره پلمپ :</label>
          <Input
            placeholder="شماره پلمپ "
            type="text"
            name="closed"
            value={editingSample.closed}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>شماره استاندارد:</label>
          <Input
            placeholder="شماره استاندارد"
            type="text"
            name="standard"
            value={editingSample.standard}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شماره استاندارد مرجع :</label>
          <Input
            placeholder="شماره استاندارد مرجع "
            type="text"
            name="standardRef"
            value={editingSample.standardRef}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>طول جغرافیایی:</label>
          <Input
            placeholder="طول جغرافیایی"
            type="text"
            name="longitude"
            className="input-left"
            value={editingSample.longitude}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>عرض جغرافیایی :</label>
          <Input
            placeholder="عرض جغرافیایی "
            type="text"
            name="latitude"
            value={editingSample.latitude}
            onChange={handleInput}
            className="input-left"
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>محل تخلیه پساب:</label>
          <Input
            placeholder="محل تخلیه پساب"
            type="text"
            name="waste"
            value={editingSample.waste}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>نوع نمونه :</label>
          <Input placeholder="نوع نمونه " type="text" name="type" value={editingSample.type} onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نوع نمونه محیط زیست:</label>
          <Dropdown
            fluid
            selection
            name="environmentType"
            value={editingSample.environmentType}
            onChange={handleDropdownInput}
            options={sampleEnvironmentTypeValues}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>شرح خدمات:</label>
          <Input placeholder="شرح خدمات" type="text" name="about" value={editingSample.about} onChange={handleInput} />
        </div>

        <div className="clearfix"></div>
      </Form>
    </Modal>
  );
};

SampleModal.propTypes = {
  selectedSample: PropTypes.number.isRequired,
  setSelectedSample: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
  loadSamples: PropTypes.func.isRequired,
};

export default connect(null, { getSample, createSample, updateSample, showDialog })(SampleModal);
