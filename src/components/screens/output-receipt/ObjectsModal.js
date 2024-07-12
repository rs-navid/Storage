import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon, Table } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import moment from "jalali-moment";
import { Input } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";
import FilterObjects from "./FilterObjects";
import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
// import ObjectModal from "./ObjectModal";
// import MethodsModal from "./MethodsModal";
// import openBase64NewTab from "../../../helpers/openBase64NewTab";

import { getObjects, updateObject } from "../../../store/actions/outputReceiptActions";
import { showDialog } from "../../../store/actions/dialogActions";
import Sidemenu from "../../UI/sidemenu/Sidemenu";


// import { printAgreement } from "../../../store/actions/requestActions";

// const objectObject = {
//   number: 0,
//   objectId: 0,
//   id: 0,
//   receiptId: 0,
//   storageId: 0,
//   subUnitId: 0,
//   mainUnitId: 0,
//   subAmount: 0,
//   mainAmount: 0,
//   manufacturer: "",
//   batch: "",
//   startDateString: "",
//   endDateString: "",
//   objects: [],
//   units: [],
//   storages: []
// };

const ObjectsModal = (props) => {
  const [objs, setObjs] = useState([]);
  const [search, setSearch] = useState("");

  // const [selectedObj, setSelectedObj] = useState(0);
  // const [objModalStatus, setObjModalStatus] = useState(false);
  // // const [MethodsModalStatus, setMethodsModalStatus] = useState(false);
  // const [selectedObjs, setSelectedObjs] = useState([]);
  // const [editingObj, setEditingObj] = useState(objectObject);

  useEffect(() => {
    if (props.open) {
      loadObjs();
    }
    // eslint-disable-next-line
  }, [props.id]);

  // Load samples
  const loadObjs = async () => {
    const results = await props.getObjects(props.id);

    if (results) {
      setObjs(results);
      // setPeriodKey(results.key);
      // setSelectedObjs([]);
    }
  };

  const loadSearch = (s) => {
    setSearch(s);
  }

  const handleSave = async () => {
    for (let e=0; e < objs.length ; e++) {
      if (isNaN(parseFloat(objs[e].amount)) || parseFloat(objs[e].amount) < 0 ) {
        props.showDialog({ title: "خطا", text: `مقدار وارد شده برای کالای ${objs[e].object} با کد یکتا ${objs[e].periodCode+"/"+objs[e].number} معتبر نمی باشد.` });
        return ;
      } 
    };

    var data = objs.map ( e => {
      return {...e, amount:parseFloat(e.amount)}
    });

    console.log(data);
    var result = await props.updateObject(data);

    if (result) {
      props.showDialog({ title: "ثبت", text: "کالاها با موفقیت ثبت گردید." });
    }
  }

  // Handle on edit click
  // const handleEditButtonClick = async (id) => {
  //   const result = await props.getObject(id);
  //   if (result) {
      
  //     var s = null;
  //     var e = null;
      
  //     if(result.startDate) {
  //       s = moment.from(result.startDate, "en", "YYYY-MM-DD").locale("fa").toObject();
  //     }

  //     if(result.endDate) {
  //       e = moment.from(result.endDate, "en", "YYYY-MM-DD").locale("fa").toObject();
  //     }

      
  //     setEditingObj({...result, startDateString : s ? { year: s.years, month: s.months + 1, day: s.date } : null, endDateString: e ? { year: e.years, month: e.months + 1, day: e.date } : null, receiptId: props.id});
  //     setObjModalStatus(true);
  //   }
  // };

  // Handle on new click
  // const handleNewButtonClick = async () => {
  //   const result = await props.getObject(0);
  //   if (result) {
      
  //     var s = null;
  //     var e = null;
      
  //     if(result.startDate) {
  //       s = moment.from(result.startDate, "en", "YYYY-MM-DD").locale("fa").toObject();
  //     }

  //     if(result.endDate) {
  //       e = moment.from(result.endDate, "en", "YYYY-MM-DD").locale("fa").toObject();
  //     }

      
  //     setEditingObj({...result, startDateString : s, endDateString: e, receiptId: props.id});
  //     setObjModalStatus(true);
  //   }

  // };

  // Handle selection change
  // const handleSelectionChange = (id) => {
  //   if (selectedObjs.indexOf(id) === -1) {
  //     setSelectedObjs([...selectedObjs, id]);
  //   } else {
  //     const newSelected = [...selectedObjs];
  //     newSelected.splice(selectedObjs.indexOf(id), 1);
  //     setSelectedObjs(newSelected);
  //   }
  // };

  // Confirm delete
  // const confirmDelete = () => {
  //   if (selectedObjs.length === 0) {
  //     props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
  //   } else {
  //     props.showDialog({
  //       title: "حذف",
  //       text: `آیا مایل به حذف ${selectedObjs.length} مورد هستید؟`,
  //       type: "confirm",
  //       yes: deleteObjs,
  //     });
  //   }
  // };

  // Delete
  // const deleteObjs = async () => {
  //   const resutlt = await props.deleteObjects(selectedObjs);
  //   if (resutlt) {
  //     props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
  //     loadObjs();
  //     props.loadData(props.filter);
  //   }
  // };

  // Handle methods button click
  const handleMethodClick = (id) => {
    // setSelectedSub(id);
    // setMethodsModalStatus(true);
  };

  // Handle new print receipt
  // const handlePrintButtonClick = async (id) => {
  //   const result = await props.printAgreement(id);

  //   if (result) {
  //     if (result.data) {
  //       openBase64NewTab(result.data);
  //     }
  //   }
  // };

    // Handle input vals
    const handleInput = (e) => {
      setObjs([
        ...objs.map(k=>{
          return e.target.name != `txt${k.id}` ? k : {...k,amount: e.target.value}  
        })
      ]);
    };

  return (
    <Fragment>
      {/* <ObjectModal
        open={objModalStatus}
        editingObject={editingObj}
        setOpen={setObjModalStatus}
        setEditingObject={setEditingObj}
        createObject={props.createObject}
        updateObject={props.updateObject}
        loadData={loadObjs}
        showDialog={props.showDialog}
      /> */}

      <Modal
        open={props.open}
        title={`کالا های رسید`}
        cancel={() => {
          // props.setRequestId(0);
          props.setOpen(false);
        }}
        save={handleSave}
      >
        {/* Start actions */}
        {/* <div className="actions pt-4 pb-5 align-left">
          <Button icon labelPosition="right" color="blue" size="tiny" onClick={confirmDelete}>
            حذف
            <Icon name="trash" />
          </Button>
          <Button icon labelPosition="right" size="tiny" color="blue" onClick={handleNewButtonClick}>
            جدید
            <Icon name="add" />
          </Button>
        </div> */}
        {/* End actions */}

        {/* Start list */}
        <div className="page-wrapper">
        <Sidemenu>
          <FilterObjects
            loadData={loadSearch}
          />
        </Sidemenu>
        <div style={{ height: "350px", overflowY: "auto" }} className="page-content container tbl-container">
          <table className="tbl-data">
            <thead>
              <td>نام کالا</td>
              <td>کد یکتا</td>
              <td>محل انبارش</td>
              <td>تاریخ ورود</td>
              <td>مشتری</td>
              <td>تولید کننده</td>
              <td>شماره بچ</td>
              <td>تاریخ تولید</td>
              <td>تاریخ انقضاء</td>
              <td>بسته بندی جزئی</td>
              <td>بسته بندی کلی</td>
              <td>مقدار کل</td>
              <td>مقدار باقیمانده</td>
              <td>مقدار</td>
            </thead>
            <tbody>
            {
              objs.map((item) => {
                if(search) {
                  if(item.amount != 0 || item.object.toUpperCase().includes(search.toUpperCase())) {
                    const date = moment.from(item.date, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
                const startDate = item.startDate ?  moment.from(item.startDate, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD") : "-";
                const endDate = item.endDate ? moment.from(item.endDate, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD") : "-";
                const name= `txt${item.id}`;

                const c = isNaN(parseFloat(objs.find(i=>i.id==item.id).amount)) ? "has-error" : (parseFloat(objs.find(i=>i.id==item.id).amount) < 0 ? "has-error" : (parseFloat(objs.find(i=>i.id==item.id).amount) > 0 ? "has-amount" : ""))  
              return (<tr className={c}>
                <td>{item.object}</td>
                <td>{item.periodCode+"/"+item.number}</td>
                <td>{item.storage}</td>
                <td>{date}</td>
                <td>{item.client}</td>
                <td>{item.manufacturer}</td>
                <td>{item.batch}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{item.subUnit}</td>
                <td>{item.mainUnit}</td>
                <td>{item.totalAmount}</td>
                <td>{item.remainAmount}</td>
                <td><Input placeholder="مقدار" type="text" name={name} value={objs.find(i=>i.id==item.id).amount} onChange={handleInput} /></td>
              </tr>)
                  } else {
                    return (<Fragment></Fragment>);
                  }
                }
                const date = moment.from(item.date, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
                const startDate = item.startDate ?  moment.from(item.startDate, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD") : "-";
                const endDate = item.endDate ? moment.from(item.endDate, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD") : "-";
                const name= `txt${item.id}`;

                const c = isNaN(parseFloat(objs.find(i=>i.id==item.id).amount)) ? "has-error" : (parseFloat(objs.find(i=>i.id==item.id).amount) < 0 ? "has-error" : (parseFloat(objs.find(i=>i.id==item.id).amount) > 0 ? "has-amount" : ""))  
              return (<tr className={c}>
                <td>{item.object}</td>
                <td>{item.periodCode+"/"+item.number}</td>
                <td>{item.storage}</td>
                <td>{date}</td>
                <td>{item.client}</td>
                <td>{item.manufacturer}</td>
                <td>{item.batch}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{item.subUnit}</td>
                <td>{item.mainUnit}</td>
                <td>{item.totalAmount}</td>
                <td>{item.remainAmount}</td>
                <td><Input placeholder="مقدار" type="text" name={name} value={objs.find(i=>i.id==item.id).amount} onChange={handleInput} /></td>
              </tr>)
              })
            }
            </tbody>
          </table>
        </div>
        </div>
        {/* <div style={{ height: "350px", overflowY: "auto" }} className="container">
          {objs.map((item) => {
            return (
              <ListItemWithCheckboxAndEdit
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
              >
                <SubItems data={["کد یکتا:", item.number, "نام کالا:", item.object]} />
                <SubItems data={["انبار:", item.storage.split(" | ")[1], "مقدار جزئی:", item.subAmount]} />
                <SubItems data={["واحد جزئی:", item.subUnit, "مقدار کلی:", item.mainAmount]} />
                <SubItems data={["واحد کلی:", item.mainUnit, "تولید کننده:", item.manufacturer]} />
              </ListItemWithCheckboxAndEdit>
            );
          })}
        </div> */}
        {/* End list */}
      </Modal>

      {/* <SampleModal
        setOpen={setSampleModalStatus}
        open={sampleModalStatus}
        selectedSample={selectedSample}
        requestId={props.requestId}
        loadSamples={loadSamples}
        setSelectedSample={setSelectedSample}
      /> */}

      {/* <MethodsModal
        setOpen={setMethodsModalStatus}
        open={MethodsModalStatus}
        sampleId={selectedSample}
        setSampleId={setSelectedSample}
        loadSamples={loadSamples}
        loadRequests={props.loadRequests}
      /> */}
    </Fragment>
  );
};

ObjectsModal.propTypes = {
  id: PropTypes.number.isRequired,
  // setRequestId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  // loadRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { getObjects, updateObject, showDialog })(ObjectsModal));
