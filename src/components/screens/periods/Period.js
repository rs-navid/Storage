import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import moment from "jalali-moment";

import { getPeriods } from "../../../store/actions/periodActions";
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

  const handleDelete = () => {
    console.log(selected);
    if (selected.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتحاب نمایید." });
    }
  };

  const handleChange = (id) => {
    console.log(id);
    if (selected.indexOf(id) === -1) {
      setSelected([
        ...selected,
        id,
      ]);
    } else {
      const newSelected = [...selected]
      newSelected.splice(selected.indexOf(id), 1);
      setSelected(newSelected);
    }
  };

  return (
    <div className="periods-screen">
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" size="small" onClick={handleDelete}>
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small">
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {periods.map((val) => {
        return (
          <div key={val.id} className="item d-flex align-items-center">
            <div className="checkbox">
              <Checkbox onChange={() => handleChange(val.id)} />
            </div>
            <div className="info">
              <div className="data">
                <div className="sub-data">
                  <div className="right">دوره:</div>
                  <div className="left">{val.name}</div>
                </div>
                <div className="sub-data">
                  <div className="right">مشخصه دوره:</div>
                  <div className="left">{val.key}</div>
                </div>
              </div>
              <div className="data">
                <div className="sub-data">
                  <div className="right">تاریخ شروع:</div>
                  <div className="left">
                    {moment.from(val.start, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")}
                  </div>
                </div>
                <div className="sub-data">
                  <div className="right">تاریخ پایان:</div>
                  <div className="left">
                    {moment.from(val.end, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")}
                  </div>
                </div>
              </div>
              <div className="action">
                <Button icon labelPosition="right" color="blue" size="mini">
                  ویرایش
                  <Icon name="edit" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default connect(null, { getPeriods, showDialog })(Period);
