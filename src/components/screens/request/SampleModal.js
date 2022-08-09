import React, { useEffect, useState } from "react";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "jalali-moment";
import { Form, Input, Dropdown, TextArea } from "semantic-ui-react";
import Select from "../../UI/select/Select";

import Modal from "../../UI/modal/Modal";

import { getSample, createSample, updateSample, getNewSampleNum } from "../../../store/actions/sampleActions";
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
  vazeiat: true,
  entebaghDesc: "",
  resultDate: "",
  extra: "",
  hold: "",
  samplingType: true,
  tasmim: "",
  code: "",
  temperature: "",
  moisture: "",
  startMicrobi: null,
  startShimiaie: null,
  startSelolozi: null,
  startPacking: null,
  startEnvironment: null,
  endMicrobi: null,
  endShimiaie: null,
  endSelolozi: null,
  endPacking: null,
  endEnvironment: null,
  mozakerat: "",
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

const statusValues = [
  {
    key: 1,
    value: true,
    text: "منطبق",
  },
  {
    key: 0,
    value: false,
    text: "نامنطبق",
  },
];

const samplingTypeValues = [
  {
    key: 1,
    value: true,
    text: "توسط کارشناس آزمایشگاه",
  },
  {
    key: 0,
    value: false,
    text: "توسط مشتری",
  },
];

const extras = ["عودت به مشتری", "امحاء مطابق دستورالعمل آزمایشگاه"];
const holds = [
  "نمونه فوق فاقد شاهد می باشد.",
  "نمونه ارسالی تا تاریخ انقضا درج شده بر روی محصول در آزمایشگاه نگهداری خواهد شد.",
  "نمونه ارسالی حداکثر تا یک ماه پس از تاریخ صدور نتایج در آزمایشگاه نگهداری خواهد شد.",
];
const packings = ["قوطی فلزی", "پت", "تتراپک", "سلفون", "فیلم پلاستیکی", "فله", "کارتن"];

const SampleModal = (props) => {
  const [editingSample, setEditingSample] = useState(sampleObject);

  useEffect(() => {
    if (props.selectedSample) {
      loadSample();
    } else {
      loadNewSample(props.open);
    }
    // eslint-disable-next-line
  }, [props.selectedSample, props.open]);

  // Load new sample number
  const loadNewSample = async (open) => {
    if (open) {
      const result = await props.getNewSampleNum();
      if (result) {
        setEditingSample({ ...sampleObject, num: result.num });
      } else {
        setEditingSample(sampleObject);
      }
    } else {
      setEditingSample(sampleObject);
    }
  };

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
        startMicrobi: null,
        startShimiaie: null,
        startSelolozi: null,
        startPacking: null,
        startEnvironment: null,
        endMicrobi: null,
        endShimiaie: null,
        endSelolozi: null,
        endPacking: null,
        endEnvironment: null,
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

        {/* <div className="field-wrapper field-50 right-50">
          <label>بسته بندی :</label>
          <Input
            placeholder="بسته بندی "
            type="text"
            name="packing"
            value={editingSample.packing}
            onChange={handleInput}
          />
        </div> */}

        <div className="field-wrapper field-50 right-50" style={{ margin: 0 }}>
          <label>بسته بندی:</label>
          <Select
            placeholder="بسته بندی"
            type="text"
            name="packing"
            value={editingSample.packing}
            onChange={(val) => {
              setEditingSample({
                ...editingSample,
                packing: val,
              });
            }}
            title="بسته بندی"
            items={packings}
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

        <div className="field-wrapper field-50 left-50">
          <label>کد نمونه مشتری:</label>
          <Input
            placeholder="کد نمونه مشتری"
            type="text"
            name="code"
            value={editingSample.code}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>دما نگهداری نمونه:</label>
          <Input
            placeholder="دما نگهداری نمونه"
            type="text"
            name="temperature"
            value={editingSample.temperature}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>رطوبت نگهداری نمونه:</label>
          <Input
            placeholder="رطوبت نگهداری نمونه"
            type="text"
            name="moisture"
            value={editingSample.moisture}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>وضعیت نمونه دریافتی:</label>
          <Dropdown
            fluid
            selection
            name="vazeiat"
            value={editingSample.vazeiat}
            onChange={handleDropdownInput}
            options={statusValues}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>شرح عدم انطباق:</label>
          <Input
            placeholder="شرح عدم انطباق"
            type="text"
            name="entebaghDesc"
            value={editingSample.entebaghDesc}
            onChange={handleInput}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تاریخ گزارش دهی:</label>
          <Input
            placeholder="تاریخ گزارش دهی"
            type="text"
            name="resultDate"
            value={editingSample.resultDate}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50" style={{ margin: 0 }}>
          <label>تکلیف مازاد نمونه:</label>
          <Select
            placeholder="تعیین تکلیف مازاد نمونه پس از انجام آزمون"
            type="text"
            name="extra"
            value={editingSample.extra}
            onChange={(val) => {
              setEditingSample({
                ...editingSample,
                extra: val,
              });
            }}
            title="تعیین تکلیف مازاد نمونه پس از انجام آزمون"
            items={extras}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50" style={{ margin: 0 }}>
          <label>مدت زمان نگهداری:</label>
          <Select
            placeholder="مدت زمان نگهداری نمونه شاهد"
            type="text"
            name="hold"
            value={editingSample.hold}
            onChange={(val) => {
              setEditingSample({
                ...editingSample,
                hold: val,
              });
            }}
            title="مدت زمان نگهداری نمونه شاهد"
            items={holds}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>روش نمونه برداری:</label>
          <Dropdown
            fluid
            selection
            name="samplingType"
            value={editingSample.samplingType}
            onChange={handleDropdownInput}
            options={samplingTypeValues}
          />
        </div>

        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-100">
          <label>قائده تصمیم گیری:</label>
          <TextArea placeholder="قائده تصمیم گیری" name="tasmim" value={editingSample.tasmim} onChange={handleInput} />
        </div>

        <div className="field-wrapper field-100">
          <label>مذاکرات انجام شده:</label>
          <TextArea
            placeholder="مذاکرات انجام شده"
            name="mozakerat"
            value={editingSample.mozakerat}
            onChange={handleInput}
          />
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

export default connect(null, { getSample, createSample, updateSample, showDialog, getNewSampleNum })(SampleModal);
