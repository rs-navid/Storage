import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "semantic-ui-react";
import moment from "jalali-moment";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";

import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
import Modal from "../../UI/modal/Modal";

import { getPeriods, deletePeriods, updatePeriod, createPeriod } from "../../../store/actions/periodActions";
import { showDialog } from "../../../store/actions/dialogActions";

const Period = (props) => {
  const [periods, setPeriods] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [start, setStart] = useState(utils("fa").getToday());
  const [end, setEnd] = useState(utils("fa").getToday());
  const [selectedPeriod, setSelectedPeriod] = useState({ name: "", key: "", id: 0 });

  // Component did mount
  useEffect(() => {
    const loadData = async () => {
      const results = await props.getPeriods();
      setPeriods(results);
    };

    loadData();
    // eslint-disable-next-line
  }, []);

  // Delete
  const deletePeriods = async () => {
    const resutlt = await props.deletePeriods(selected);
    if (resutlt) {
      props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
      setSelected([]);
      setPeriods([]);

      const results = await props.getPeriods();
      setPeriods(results);
    }
  };

  // Confirm delete
  const handleDelete = () => {
    if (selected.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selected.length} مورد هستید؟`,
        type: "confirm",
        yes: deletePeriods,
      });
    }
  };

  // Check or uncheck checkboxes
  const handleSelectionChange = (id) => {
    if (selected.indexOf(id) === -1) {
      setSelected([...selected, id]);
    } else {
      const newSelected = [...selected];
      newSelected.splice(selected.indexOf(id), 1);
      setSelected(newSelected);
    }
  };

  // Click on edit button
  const handleEditClick = (id) => {
    const p = periods.find((item) => item.id === id);
    setSelectedPeriod({ name: p.name, key: p.key, id: id });

    const start = moment.from(p.start, "en", "YYYY-MM-DD").locale("fa").toObject();
    const end = moment.from(p.end, "en", "YYYY-MM-DD").locale("fa").toObject();

    setStart({ year: start.years, month: start.months + 1, day: start.date });
    setEnd({ year: end.years, month: end.months + 1, day: end.date });

    setOpen(true);
  };

  // Handle input vals
  const handleInput = (e) => {
    setSelectedPeriod({
      ...selectedPeriod,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSave = async () => {
    if (selectedPeriod.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام دوره معتبر نمی باشد." });
    } else if (selectedPeriod.key.trim() === "") {
      props.showDialog({ title: "خطا", text: "مشخصه دوره معتبر نمی باشد." });
    } else if (!moment(`${start.year}/${start.month}/${start.day}`, "jYYYY/jM/jD")) {
      props.showDialog({ title: "خطا", text: "تاریخ شروع معتبر نمی باشد." });
    } else if (!moment(`${end.year}/${end.month}/${end.day}`, "jYYYY/jM/jD")) {
      props.showDialog({ title: "خطا", text: "تاریخ پایان معتبر نمی باشد." });
    } else {
      const startDate = moment.from(`${start.year}/${start.month}/${start.day}`, "fa", "YYYY/M/D").format("YYYY/M/D");
      const endDate = moment.from(`${end.year}/${end.month}/${end.day}`, "fa", "YYYY/M/D").format("YYYY/M/D");

      let result = null;
      if (selectedPeriod.id === 0) {
        result = await props.createPeriod({ ...selectedPeriod, start: startDate, end: endDate });
      } else {
        result = await props.updatePeriod({ ...selectedPeriod, start: startDate, end: endDate });
      }

      if (result) {
        if(result.data) {
          setSelectedPeriod({
            ...selectedPeriod,
            id: result.data.id
          })
        }

        props.showDialog({ title: "ثبت", text: "دوره با موفقیت ثبت گردید." });
        setSelected([]);
        setPeriods([]);

        const results = await props.getPeriods();
        setPeriods(results);
      }
    }
  };

  // Click on new button
  const newClick = () => {
    setSelectedPeriod({ name: "", key: "", id: 0 });
    setStart(utils("fa").getToday());
    setEnd(utils("fa").getToday());
    setOpen(true);
  };

  return (
    <div className="periods-screen">
      {/* Start modal */}
      <Modal
        open={open}
        title={selectedPeriod.id === 0 ? "دوره جدید" : "ویرایش دوره"}
        cancel={() => {
          setOpen(false);
        }}
        save={handleSave}
      >
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>نام دوره:</label>
          <Input placeholder="نام دوره" type="text" name="name" value={selectedPeriod.name} onChange={handleInput} />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>مشخصه دوره:</label>
          <Input placeholder="مشخصه دوره" type="text" name="key" value={selectedPeriod.key} onChange={handleInput} />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>تاریخ شروع:</label>
          <DatePicker value={start} onChange={setStart} shouldHighlightWeekends locale="fa" />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
          <label>تاریخ پایان:</label>
          <DatePicker value={end} onChange={setEnd} shouldHighlightWeekends locale="fa" />
        </div>
        <div className="clearfix"></div>
      </Modal>
      {/* End modal */}

      {/* Start periods */}
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" color="blue" size="small" onClick={handleDelete}>
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small" color="blue" onClick={newClick}>
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {periods.map((item) => {
        const start = moment.from(item.start, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
        const end = moment.from(item.end, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");

        return (
          <ListItemWithCheckboxAndEdit
            id={item.id}
            key={item.id}
            onClick={() => handleEditClick(item.id)}
            onChange={() => handleSelectionChange(item.id)}
          >
            <SubItems data={["دوره:", item.name, "مشخصه دوره:", item.key]} />
            <SubItems data={["تاریخ شروع:", start, "تاریخ پایان:", end]} />
          </ListItemWithCheckboxAndEdit>
        );
      })}
      {/* End periods */}
    </div>
  );
};

export default connect(null, { getPeriods, deletePeriods, showDialog, updatePeriod, createPeriod })(Period);
