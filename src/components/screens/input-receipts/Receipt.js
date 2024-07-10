import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import moment from "jalali-moment";

import ListItemWithCheckboxAndEditAndOther, {
  SubItems,
} from "../../UI/list/ListItemWithCheckboxAndEditAndOther";
import Sidemenu from "../../UI/sidemenu/Sidemenu";

import EditModal from "./EditModal";
import ObjectsModal from "./ObjectsModal";
import Filter from "./Filter";

import {
  getReceipt,
  getReceipts,
  createReceipt,
  deleteReceipts,
  updateReceipt,
} from "../../../store/actions/inputReceiptActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "شماره رسید", value: "number" },
  { key: 3, text: "تاریخ", value: "date" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

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
};

const Receipt = (props) => {
  const [filter, setFilter] = useState({
    client: "",
    object: "",
    number: 0,
    orderby: orderbyValues[0].value,
    order: orderValues[1].value,
    page: null,
  });

  const [receipts, setReceipts] = useState([]);
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [open, setOpen] = useState(false);
  const [objsOpen, setObjsOpen] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 0 });
  const [editingReceipt, setEditingReceipt] = useState(receiptObject);
  const [receiptId, setReceiptId] = useState(0);

  // Component did mount
  useEffect(() => {
    // loadData(props.location.search);
    const query = qs.parse(props.location.search);

    setFilter({
      ...filter,
      client: query.client || "",
      object: query.object || "",
      number: query.number || 0,
      order: ["asc", "desc"].includes(query.order) ? query.order : "desc",
      orderby: ["id", "number", "date"].includes(query.orderby)
        ? query.orderby
        : "id",
      page: query.page ? +query.page : 0,
    });

    setPageInfo({
      ...pageInfo,
      page: query.page ? +query.page : 0,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filter.page !== null) {
      loadData({ ...filter });
    }
  }, [filter.page]);

  // Load data
  const loadData = async (query) => {
    setSelectedReceipts([]);
    setReceipts([]);
    const results = await props.getReceipts({
      ...query,
      periodId: props.user.period,
    });

    if (results) {
      setReceipts(results.rows);
      setPageInfo((oldState) => {
        return {
          ...oldState,
          totalPages: results.totalPages,
        };
      });
    }
  };

  // Replace history
  const replaceHistory = (query) => {
    props.history.replace({
      search: qs.stringify(query),
      hash: props.location.hash,
    });
  };

  // Handle selection change
  const handleSelectionChange = (id) => {
    if (selectedReceipts.indexOf(id) === -1) {
      setSelectedReceipts([...selectedReceipts, id]);
    } else {
      const newSelected = [...selectedReceipts];
      newSelected.splice(selectedReceipts.indexOf(id), 1);
      setSelectedReceipts(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedReceipts.length === 0) {
      props.showDialog({
        title: "خطا",
        text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید.",
      });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedReceipts.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteReceipts,
      });
    }
  };

  // Delete
  const deleteReceipts = async () => {
    const resutlt = await props.deleteReceipts(selectedReceipts);
    if (resutlt) {
      props.showDialog({
        title: "حذف",
        text: "موارد انتخاب شده با موفقیت حذف شدند.",
      });
      loadData(filter);
    }
  };

  // Click on new button
  const handleNewButtonClick = async () => {
    const resutlt = await props.getReceipt(0);
    setEditingReceipt({
      ...receiptObject,
      periodId: props.user.period,
      clients: resutlt.clients,
    });
    setOpen(true);
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const result = await props.getReceipt(id);
    if (result) {
      const d = moment.from(result.date, "en", "YYYY-MM-DD").locale("fa").toObject();
      
      setEditingReceipt({...result, dateString : { year: d.years, month: d.months + 1, day: d.date }});
      setOpen(true);
    }
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      order: filter.order,
      orderby: filter.orderby,
      page: value - 1,
    };

    setFilter({ ...filter, page: value - 1 });
    setPageInfo({ ...pageInfo, page: value });
    replaceHistory(query);

    // loadData(qs.stringify(query));
  };

  return (
    <Fragment>
      {/* Start modal */}
      <EditModal
        open={open}
        editingReceipt={editingReceipt}
        setOpen={setOpen}
        setEditingReceipt={setEditingReceipt}
        createReceipt={props.createReceipt}
        updateReceipt={props.updateReceipt}
        loadData={loadData}
        filter={filter}
        showDialog={props.showDialog}
      />

      <ObjectsModal
        open={objsOpen}
        setOpen={setObjsOpen}
        loadData={loadData}
        filter={filter}
        id={receiptId}
        showDialog={props.showDialog}
      />
      {/* End modal */}

      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button
          icon
          labelPosition="right"
          color="blue"
          size="small"
          onClick={confirmDelete}
        >
          حذف
          <Icon name="trash" />
        </Button>
        <Button
          icon
          labelPosition="right"
          size="small"
          color="blue"
          onClick={handleNewButtonClick}
        >
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {/* End actions */}

      <div className="page-wrapper">
        <Sidemenu>
          <Filter
            orderbyValues={orderbyValues}
            orderValues={orderValues}
            filter={filter}
            setFilter={setFilter}
            replaceHistory={replaceHistory}
            loadData={loadData}
          />
        </Sidemenu>

        <div className="page-content">
          {/* Start list */}
          {receipts.map((item) => {
            const d = moment
              .from(item.date, "en", "YYYY-MM-DD")
              .locale("fa")
              .format("YYYY/MM/DD");

            return (
              <ListItemWithCheckboxAndEditAndOther
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
                onOther={() => {
                  setObjsOpen(true);
                  setReceiptId(item.id);
                }}
                otherTitle="کالاها"
                otherIcon="th list"
              >
                <SubItems data={["شماره:", item.number, "تاریخ:", d]} />
                <SubItems data={["زمان:", item.time, "مشتری:", item.client]} />
                <SubItems data={["راننده:", item.driver]} />
              </ListItemWithCheckboxAndEditAndOther>
            );
          })}
          {/* End list */}

          <div>
            <Pagination
              className="pagination"
              count={pageInfo.totalPages}
              variant="outlined"
              shape="rounded"
              style={{ textAlign: "center" }}
              showFirstButton
              showLastButton
              siblingCount={0}
              page={filter.page + 1}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    showDialog,
    getReceipt,
    getReceipts,
    createReceipt,
    deleteReceipts,
    updateReceipt,
  })(Receipt)
);
