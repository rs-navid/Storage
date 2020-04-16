import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import moment from "jalali-moment";

import ListWithCheckboxAndEdit from "../../UI/list/ListWithCheckboxAndEdit";

import { getPeriods, deletePeriods } from "../../../store/actions/periodActions";
import { showDialog } from "../../../store/actions/dialogActions";

const Period = (props) => {
  const [periods, setPeriods] = useState([]);
  const [selected, setSelected] = useState([]);

  // Component did mount
  useEffect(() => {
    const loadData = async () => {
      const results = await props.getPeriods();
      setPeriods(results);
    };

    loadData();
    // eslint-disable-next-line
  }, []);

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

  const handleDelete = () => {
    if (selected.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتحاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selected.length} مورد هستید؟`,
        type: "confirm",
        yes: deletePeriods,
      });
    }
  };

  const handleChange = (id) => {
    if (selected.indexOf(id) === -1) {
      setSelected([...selected, id]);
    } else {
      const newSelected = [...selected];
      newSelected.splice(selected.indexOf(id), 1);
      setSelected(newSelected);
    }
  };

  return (
    <div className="periods-screen">
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" color="blue" size="small" onClick={handleDelete}>
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small" color="blue">
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {periods.map((item) => {
        return (
          <ListWithCheckboxAndEdit
            id={item.id}
            key={item.id}
            onChange={() => handleChange(item.id)}
            items={[
              { firstName: "دوره:", firstVal: item.name, secondName: "مشخصه دوره:", secondVal: item.key },
              {
                firstName: "تاریخ شروع:",
                firstVal: moment.from(item.start, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD"),
                secondName: "تاریخ پایان:",
                secondVal: moment.from(item.end, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD"),
              },
            ]}
          />
        );
      })}
    </div>
  );
};

export default connect(null, { getPeriods, deletePeriods, showDialog })(Period);
