import React, { useEffect, useState, Fragment } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon, Table } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import moment from "jalali-moment";
import "../../../assets/css/print.scss";
import qs from "query-string";

import { showDialog } from "../../../store/actions/dialogActions";
import {
  getAllStorageAvailability
} from "../../../store/actions/storageActions";
import logo from "../../../assets/images/logo.png";


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

const PrintModal = (props) => {
  const [objs, setObjs] = useState([]);

  useEffect(async () => {
    const query = qs.parse(props.location.search);

    var filter = {
      number: query.number || 0,
      client: query.client || "",
      object: query.object || "",
      storage: query.storage || "",
      date: ["9", "0", "9999", "99", "999", "1", "2", "3", "4", "5", "6", "12"].includes(query.date) ? query.date : "9",
      order: ["asc", "desc"].includes(query.order) ? query.order : "asc",
      orderby: ["Id", "Number", "Object.Name", "Date", "EndDate", "Receipt.Client.Name", "SubStorage.Name"].includes(query.orderby)
        ? query.orderby
        : "id",
      page: query.page ? +query.page : 0,
    };

    console.log(query)

    var result = await props.getAllStorageAvailability(filter);

    if (result) {
      setObjs(result);
    }
  }, []);

  let row = 0;

  // const [selectedObj, setSelectedObj] = useState(0);
  // const [objModalStatus, setObjModalStatus] = useState(false);
  // // const [MethodsModalStatus, setMethodsModalStatus] = useState(false);
  // const [selectedObjs, setSelectedObjs] = useState([]);
  // const [editingObj, setEditingObj] = useState(objectObject);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const now = new Date();
  const y = now.getFullYear();
  const m = ("0"+(now.getMonth()+1)).slice(-2);
  const a = ("0"+(now.getDate())).slice(-2);


  const d = moment
        .from(`${y}/${m}/${a}`, "en", "YYYY-MM-DD")
        .locale("fa")
        .format("YYYY/MM/DD");

  return (
    <Fragment>
      {createPortal(
        <table className="tbl-print-result">
          <thead className="print-header">
            <tr>
              <td>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    backgroundColor: "yellow",
                    fontFamily: "iranyekan",
                    padding: "5px",
                  }}
                >
                  چاپ
                </button>
                <img src={logo} width="100px"/>
              </td>
              <td>
                <div className="header-title-comp">شرکت پخش استانی دارو، واکسن، سموم و مواد بیولوژیک کاوش نوین مهر فارمد</div>
                <div className="header-title">موجودی انبار</div>
              </td>
              <td>
                <div className="">
                  <div> تاریخ: {d}</div>
                </div>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={3}>
                <table className="tbl-print-data">
                  <thead>
                    <td>#</td>
                    <td>کد یکتا</td>
                    <td>نام کالا</td>
                    <td>تاریخ ورود</td>
                    <td>محل انبارش</td>
                    <td>تولید کننده</td>
                    <td>بچ</td>
                    <td>مشتری</td>
                    <td>واحد</td>
                    <td>تاریخ تولید</td>
                    <td>تاریخ انقضاء</td>
                    <td>مقدار کل</td>
                    <td>مقدار باقیمانده</td>
                  </thead>
                  <tbody>
                    {objs.map((item, index) => {
                      const date = item.date
                      ? moment
                          .from(item.date, "en", "YYYY-MM-DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")
                      : "";
                      const s = item.startDate
                      ? moment
                          .from(item.startDate, "en", "YYYY-MM-DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")
                      : "";
                      const e = item.endDate
                      ? moment
                          .from(item.endDate, "en", "YYYY-MM-DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")
                      : "";

                      return (
                        <tr>
                          <td>{index+1}</td>
                          <td>{item.periodCode + "/" + item.number}</td>
                          <td>{item.object}</td>
                          <td>{date}</td>
                          <td>{item.storage}</td>
                          <td>{item.manufacturer}</td>
                          <td>{item.batch}</td>
                          <td>{item.client}</td>
                          <td>{item.mainUnit}</td>
                          <td>{s}</td>
                          <td>{e}</td>
                          <td>{numberWithCommas(item.amount)}</td>
                          <td>{numberWithCommas(item.remainAmount)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>,
        document.body
      )}
    </Fragment>
  );
};

PrintModal.propTypes = {
  //   id: PropTypes.number.isRequired,
  //   // setRequestId: PropTypes.func.isRequired,
  //   open: PropTypes.bool.isRequired,
  //   setOpen: PropTypes.func.isRequired,
  // loadRequests: PropTypes.func.isRequired,
};

export default withRouter(
  connect(null, { getAllStorageAvailability })(PrintModal)
);
