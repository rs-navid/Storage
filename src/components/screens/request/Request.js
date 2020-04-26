import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import moment from "jalali-moment";
import { utils } from "react-modern-calendar-datepicker";

import ListItemWithCheckboxAndEditAndOther, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEditAndOther";
import Sidemenu from "../../UI/sidemenu/Sidemenu";

import EditModal from "./EditModal";
import SamplesModal from "./SamplesModal";
import Filter from "./Filter";

import {
  getRequest,
  getRequests,
  createRequest,
  updateRequest,
  deleteRequests,
} from "../../../store/actions/requestActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "شماره درخواست", value: "num" },
  { key: 3, text: "نام مشتری", value: "name" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const requestObject = {
  num: "",
  date: utils("fa").getToday(),
  startDate: utils("fa").getToday(),
  endDate: utils("fa").getToday(),
  requester: "",
  description: "",
  id: 0,
  clientId: 0,
};

const Request = (props) => {
  const [filter, setFilter] = useState({
    num: "",
    name: "",
    orderby: orderbyValues[1].value,
    order: orderValues[1].value,
  });
  const [requests, setRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 1 });
  const [editingRequest, setEditingRequest] = useState(requestObject);
  const [modalSampleStatus, setModalSampleStatus] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(0);

  // Component did mount
  useEffect(() => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      name: query.name || "",
      num: query.num || "",
      order: ["asc", "desc"].includes(query.order) ? query.order : "desc",
      orderby: ["id", "name", "num"].includes(query.orderby) ? query.orderby : "num",
    };

    setFilter(query);
    loadData(qs.stringify(query));
    replaceHistory(query);

    setPageInfo({
      ...pageInfo,
      page: query.page ? +query.page + 1 : 1,
    });
    // eslint-disable-next-line
  }, []);

  // Load data
  const loadData = async (query) => {
    setSelectedRequests([]);
    setRequests([]);
    const results = await props.getRequests(query);

    if (results) {
      setRequests(results.rows);
      setPageInfo({
        ...pageInfo,
        totalPages: results.totalPages,
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
    if (selectedRequests.indexOf(id) === -1) {
      setSelectedRequests([...selectedRequests, id]);
    } else {
      const newSelected = [...selectedRequests];
      newSelected.splice(selectedRequests.indexOf(id), 1);
      setSelectedRequests(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedRequests.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedRequests.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteRequests,
      });
    }
  };

  // Delete
  const deleteRequests = async () => {
    const resutlt = await props.deleteRequests(selectedRequests);
    if (resutlt) {
      props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
      loadData(props.location.search);
    }
  };

  // Click on new button
  const handleNewButtonClick = () => {
    setEditingRequest(requestObject);
    setOpen(true);
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const result = await props.getRequest(id);
    if (result) {
      const date = moment.from(result.date, "en", "YYYY-MM-DD").locale("fa").toObject();
      const startDate = moment.from(result.startDate, "en", "YYYY-MM-DD").locale("fa").toObject();
      const endDate = moment.from(result.endDate, "en", "YYYY-MM-DD").locale("fa").toObject();

      setEditingRequest({
        ...result,
        date: { year: date.years, month: date.months + 1, day: date.date },
        startDate: { year: startDate.years, month: startDate.months + 1, day: startDate.date },
        endDate: { year: endDate.years, month: endDate.months + 1, day: endDate.date },
      });
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

    setPageInfo({ ...pageInfo, page: value });
    replaceHistory(query);

    loadData(qs.stringify(query));
  };

  // Handle samples button click
  const handleSampleClick = (id) => {
    setSelectedRequest(id);
    setModalSampleStatus(true);
  }

  return (
    <Fragment>
      {/* Start modal */}
      <EditModal
        open={open}
        editingRequest={editingRequest}
        setOpen={setOpen}
        setEditingRequest={setEditingRequest}
        createRequest={props.createRequest}
        updateRequest={props.updateRequest}
        loadData={loadData}
        showDialog={props.showDialog}
      />
      {/* End modal */}

      {/* Start samples modal */}
      <SamplesModal
        open={modalSampleStatus}
        setOpen={setModalSampleStatus}
        requestId= {selectedRequest}
        setRequestId = {setSelectedRequest}
      />
      {/* End samples modal */}

      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" color="blue" size="small" onClick={confirmDelete}>
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small" color="blue" onClick={handleNewButtonClick}>
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
          {requests.map((item) => {
            const date = moment.from(item.date, "en", "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");

            return (
              <ListItemWithCheckboxAndEditAndOther
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
                onOther = {() => handleSampleClick(item.id)}
                otherTitle="نمونه ها"
                otherIcon="list layout"
              >
                <SubItems data={["شماره درخواست:", item.num, "تاریخ درخواست:", date]} />
                <SubItems data={["نام مشتری:", item["client.name"], "نام درخواست کننده:", item.requester]} />
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
              page={pageInfo.page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(
  connect(null, { showDialog, getRequest, getRequests, createRequest, updateRequest, deleteRequests })(Request)
);
