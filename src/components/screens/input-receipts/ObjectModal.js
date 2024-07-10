import React, {useState, useEffect} from "react";
import PropTypes, { number } from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-modern-calendar-datepicker";
import WindowedSelect from "react-windowed-select";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import moment from "jalali-moment";

import Modal from "../../UI/modal/Modal";
import Checkbox from "../../forms/Checkbox";
import "../../../assets/css/datepickercustom.scss";

const ObjectModal = (props) => {
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);

  const [objs, setObjs] = useState([]);
  const [units, setUnits] = useState([]);
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    if (props.editingObject.endDateString) {
      setIsEndDate(true);
    }

    if (props.editingObject.startDateString) {
      setIsStartDate(true);
    }
  }, [props.editingObject.endDateString, props.editingObject.startDateString]);

  useEffect(() => {
    if (props.editingObject.objects) {
      setObjs(
        props.editingObject.objects.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  }, [props.editingObject.objects]);

  useEffect(() => {
    if (props.editingObject.units) {
      setUnits(
        props.editingObject.units.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  }, [props.editingObject.units]);

  useEffect(() => {
    if (props.editingObject.storages) {
      setStorages(
        props.editingObject.storages.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  }, [props.editingObject.storages]);

  // Handle input vals
  const handleInput = (e) => {
    props.setEditingObject({
      ...props.editingObject,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveObject = async () => {
    const startDate = props.editingObject.startDateString;
    const endDate = props.editingObject.endDateString;

    if (isStartDate && (!startDate || !moment(`${startDate.year}/${startDate.month}/${startDate.day}`, "jYYYY/jM/jD"))) {
      props.showDialog({ title: "خطا", text: "تاریخ تولید معتبر نمی باشد." });
    } else if (isEndDate && (!endDate || !moment(`${endDate.year}/${endDate.month}/${endDate.day}`, "jYYYY/jM/jD"))) {
      props.showDialog({ title: "خطا", text: "تاریخ انقضاء معتبر نمی باشد." });
    } else if(!props.editingObject.receiptId){
      props.showDialog({ title: "خطا", text: "رسید معتبر نمی باشد." });
    } else if (!props.editingObject.objectId) {
      props.showDialog({ title: "خطا", text: "کالا معتبر نمی باشد." });
    } else if (!props.editingObject.storageId) {
      props.showDialog({ title: "خطا", text: "انبار معتبر نمی باشد." });
    } else if (!props.editingObject.subUnitId) {
      props.showDialog({ title: "خطا", text: "واحد جزئی معتبر نمی باشد." });
    } else if (!props.editingObject.mainUnitId) {
      props.showDialog({ title: "خطا", text: "واحد کلی معتبر نمی باشد." });
    } else if (isNaN(parseFloat(props.editingObject.number))) {
      props.showDialog({ title: "خطا", text: "کد یکتا معتبر نمی باشد." });
    } else if (!parseFloat(props.editingObject.subAmount)) {
      props.showDialog({ title: "خطا", text: "مقدار جزئی معتبر نمی باشد." });
    } else if (!parseFloat(props.editingObject.mainAmount)) {
      props.showDialog({ title: "خطا", text: "مقدار کلی معتبر نمی باشد." });
    } else {
      let result = null;
      var sDateStr = isStartDate ? moment.from(`${props.editingObject.startDateString.year}/${props.editingObject.startDateString.month}/${props.editingObject.startDateString.day}`, "fa", "YYYY/M/D").format("YYYY/M/D") : null;
      var eDateStr = isEndDate ? moment.from(`${props.editingObject.endDateString.year}/${props.editingObject.endDateString.month}/${props.editingObject.endDateString.day}`, "fa", "YYYY/M/D").format("YYYY/M/D") : null;

      if (props.editingObject.id === 0) {
        result = await props.createObject(
          {
            ...props.editingObject,
            startDateString: sDateStr,
            endDateString:eDateStr,
            startDate: new Date(),
            endDate: new Date(),
            periodCode: "",
            batch: props.editingObject.batch ?? ""
          });
      } else {
        result = await props.updateObject({
          ...props.editingObject,
          startDateString: sDateStr,
          endDateString:eDateStr,
          startDate: new Date(),
          endDate: new Date(),
          periodCode: "",
            batch: props.editingObject.batch ?? ""
        });
      }

      if (result) {
        if (result.data) {
          props.setEditingObject({
            ...props.editingObject,
            id: result.data.id,
            number: result.data.number
          });
        }

        props.showDialog({ title: "ثبت", text: "کالا با موفقیت ثبت گردید." });
        props.loadData();
      }
    }
  };

    const handleObjectChange = (data) => {
      props.setEditingObject({
        ...props.editingObject,
        objectId: data.value,
      });
    };

    const handleSubUnitChange = (data) => {
      props.setEditingObject({
        ...props.editingObject,
        subUnitId: data.value,
      });
    };

    const handleMainUnitChange = (data) => {
      props.setEditingObject({
        ...props.editingObject,
        mainUnitId: data.value,
      });
    };

    const handleStorageChange = (data) => {
      props.setEditingObject({
        ...props.editingObject,
        storageId: data.value,
      });
    };

      // Handle date changes
  const handleDateChanges = (data, target) => {
    props.setEditingObject({
      ...props.editingObject,
      [target]: data,
    });
  };

  const defaultObject =
  props.editingObject.objectId !== 0
    ? objs[
        objs.findIndex(
          (item) => item.value === props.editingObject.objectId
        )
      ]
    : null;

    const defaultSubUnit =
  props.editingObject.subUnitId !== 0
    ? units[
        units.findIndex(
          (item) => item.value === props.editingObject.subUnitId
        )
      ]
    : null;

    const defaultMainUnit =
  props.editingObject.mainUnitId !== 0
    ? units[
        units.findIndex(
          (item) => item.value === props.editingObject.mainUnitId
        )
      ]
    : null;

    const defaultStorage =
  props.editingObject.storageId !== 0
    ? storages[
        storages.findIndex(
          (item) => item.value === props.editingObject.storageId
        )
      ]
    : null;
    

  return (
    <Modal
      open={props.open}
      title={props.editingObject.id === 0 ? "کالا جدید" : "ویرایش کالا"}
      cancel={() => {
        props.setOpen(false);
      }}
      save={handleSaveObject}
    >
      <Form>
        <div className="field-wrapper field-50 right-50">
          <label>کد یکتا کالا:</label>
          <Input
            placeholder="کد یکتا کالا"
            type="text"
            name="number"
            value={props.editingObject.number}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>کالا:</label>
          <WindowedSelect
            options={objs}
            placeholder="کالا"
            onChange={handleObjectChange}
            defaultValue={defaultObject}
            className="WindowedSelect"
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>مقدار جزئی:</label>
          <Input
            placeholder="مقدار جزئی"
            type="text"
            name="subAmount"
            value={props.editingObject.subAmount}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>واحد جزئی:</label>
          <WindowedSelect
            options={units}
            placeholder="واحد جزئی"
            onChange={handleSubUnitChange}
            defaultValue={defaultSubUnit}
            className="WindowedSelect"
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>مقدار کلی:</label>
          <Input
            placeholder="مقدار کلی"
            type="text"
            name="mainAmount"
            value={props.editingObject.mainAmount}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>واحد کلی:</label>
          <WindowedSelect
            options={units}
            placeholder="واحد کلی"
            onChange={handleMainUnitChange}
            defaultValue={defaultMainUnit}
            className="WindowedSelect"
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>محل انبارش:</label>
          <WindowedSelect
            options={storages}
            placeholder="محل انبارش"
            onChange={handleStorageChange}
            defaultValue={defaultStorage}
            className="WindowedSelect"
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>تولید کننده:</label>
          <Input
            placeholder="تولید کننده"
            type="text"
            name="manufacturer"
            value={props.editingObject.manufacturer}
            onChange={handleInput}
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>سری ساخت:</label>
          <Input
            placeholder="سری ساخت"
            type="text"
            name="batch"
            value={props.editingObject.batch}
            onChange={handleInput}
          />
        </div>

        <div className="field-wrapper field-50 left-50">
          <label>تاریخ تولید:</label>
          <Checkbox name="isStartDate" cls="remember" checked={isStartDate} onChange={(val)=>{
            if(!val) {
              handleDateChanges(null, "startDateString");
            }
            setIsStartDate(val);  
          }}>
          </Checkbox>
          <DatePicker
            value={props.editingObject.startDateString}
            onChange={(val) => {
              handleDateChanges(val, "startDateString");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>

        <div className="field-wrapper field-50 right-50">
          <label>تاریخ انقضاء:</label>
          <Checkbox name="isEndDate" cls="remember" checked={isEndDate}  onChange={(val)=>{
            if(!val) {
              handleDateChanges(null, "endDateString");
            }
            setIsEndDate(val);

          }}>
          </Checkbox>
          <DatePicker
            value={props.editingObject.endDateString}
            onChange={(val) => {
              handleDateChanges(val, "endDateString");
            }}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
      </Form>
    </Modal>
  );
};

ObjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  editingObject: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setEditingObject: PropTypes.func.isRequired,
  createObject: PropTypes.func.isRequired,
  updateObject: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
};

export default withRouter(ObjectModal);
