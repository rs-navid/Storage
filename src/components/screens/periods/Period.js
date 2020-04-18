import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import moment from "jalali-moment";

import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
import Modal from "../../UI/modal/Modal";

import { getPeriods, deletePeriods } from "../../../store/actions/periodActions";
import { showDialog } from "../../../store/actions/dialogActions";

const Period = (props) => {
  const [periods, setPeriods] = useState([]);
  const [open, setOpen] = React.useState(true);
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

  const handleChange = (id) => {
    if (selected.indexOf(id) === -1) {
      setSelected([...selected, id]);
    } else {
      const newSelected = [...selected];
      newSelected.splice(selected.indexOf(id), 1);
      setSelected(newSelected);
    }
  };

  const handleInput = () => {
    console.log('this');
  }

  return (
    <div className="periods-screen">
      <Modal
        open={open}
        title="نمایش"
        cancel={() => {
          setOpen(false);
        }}
        save = {()=>{
          props.showDialog({title:'here', text: 'OK'})
        }}
      >
        <input type="text" onChange={handleInput} />
      </Modal>
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
        const start = moment.from(item.start, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
        const end = moment.from(item.end, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");

        return (
          <ListItemWithCheckboxAndEdit id={item.id} key={item.id} onChange={() => handleChange(item.id)}>
            <SubItems data={["دوره:", item.name, "مشخصه دوره:", item.key]} />
            <SubItems data={["تاریخ شروع:", start, "تاریخ پایان:", end]} />
          </ListItemWithCheckboxAndEdit>
        );
      })}
    </div>
  );
};

export default connect(null, { getPeriods, deletePeriods, showDialog })(Period);
