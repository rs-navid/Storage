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
  getReceipt,
  getObjects,
} from "../../../store/actions/outputReceiptActions";

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

const receiptObject = {
  periodId: 0,
  clientId: 0,
  number: 0,
  date: "",
  dateString: "",
  time: "00:00",
  driver: "",
  lp: "",
  cargo: "",
  id: 0,
  clients: [],
  address: "",
  phoneNumber: "",
};

const PrintModal = (props) => {
  const [objs, setObjs] = useState([]);
  const [receipt, setReceipt] = useState(receiptObject);

  useEffect(async () => {
    let query = qs.parse(props.location.search);
    var result = await props.getReceipt(query.id ?? 0);
    var result1 = await props.getObjects(query.id ?? 0);

    if (result) {
      setReceipt(result);
    }

    if (result1) {
      setObjs(result1);
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

  const d = receipt.date
    ? moment
        .from(receipt.date, "en", "YYYY-MM-DD")
        .locale("fa")
        .format("YYYY/MM/DD")
    : "";

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
                  چاپ رسید
                </button>
              </td>
              <td>
                <div className="header-title">رسید خروج کالا از انبار</div>
              </td>
              <td>
                <div className="">
                  <div>
                    شماره رسید: {receipt.periodCode}/{receipt.number}
                  </div>
                  <div> تاریخ: {d}</div>
                  <div> ساعت: {receipt.time}</div>
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
                    <td>مقدار</td>
                    <td>واحد</td>
                  </thead>
                  <tbody>
                    {objs.map((item, index) => {
                      if (item.amount == 0) return <Fragment></Fragment>;
                      {
                        row++;
                      }
                      return (
                        <tr>
                          <td>{row}</td>
                          <td>{item.periodCode + "/" + item.number}</td>
                          <td>{item.object}</td>
                          <td>{numberWithCommas(item.amount)}</td>
                          <td>{item.mainUnit}</td>
                        </tr>
                      );
                    })}
                    <tr className="tbl-print-data-desc">
                      <td colSpan={8}>
                        گیرنده: {receipt.client}
                        <br />
                        آدرس: {receipt.address}
                        <br />
                        شماره های تماس: {receipt.phoneNumber}
                      </td>
                    </tr>
                    <tr className="tbl-print-data-desc">
                      <td colSpan={8}>
                        کلیه اقلام فوق صحیح و سالم تحوبل راننده به نام و نام
                        خانوادگی {receipt.driver} و خودرو به پلاک {receipt.lp} و
                        بارنامه به شماره {receipt.cargo}
                        گردید.
                      </td>
                    </tr>
                    <tr className="tbl-print-data-signs">
                      <td colSpan={4}>
                        نام و امضاء راننده:
                        <br /> <br />
                        <br />
                      </td>
                      <td colSpan={4}>نام و امضاء مسئول انبار:</td>
                    </tr>
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
  connect(null, { getReceipt, getObjects })(PrintModal)
);
