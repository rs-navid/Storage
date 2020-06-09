import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import moment from "jalali-moment";

import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";
import Sidemenu from "../../UI/sidemenu/Sidemenu";

import SamplesModal from "./SamplesModal";
import Filter from "./Filter";

import { getRequests } from "../../../store/actions/requestActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "شماره درخواست", value: "num" },
  { key: 3, text: "تاریخ درخواست", value: "date" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const statusValues = [
  { key: 1, text: "همه", value: "all" },
  { key: 2, text: "اتمام", value: "answered" },
  { key: 3, text: "ناتمام", value: "unanswered" },
];

const Request = (props) => {
  const [filter, setFilter] = useState({
    num: "",
    name: "",
    code: "",
    status: "all",
    invoice: "",
    orderby: orderbyValues[1].value,
    order: orderValues[1].value,
  });
  const [requests, setRequests] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 1 });
  const [modalSampleStatus, setModalSampleStatus] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(0);

  // Component did mount
  useEffect(() => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      name: query.name || "",
      num: query.num || "",
      code: query.code || "",
      invoice: query.invoice || "",
      status: query.status || "all",
      order: ["asc", "desc"].includes(query.order) ? query.order : "desc",
      orderby: ["id", "date", "num"].includes(query.orderby) ? query.orderby : "num",
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
    setRequests([]);
    const results = await props.getRequests(query, "invoices");

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
  };

  return (
    <Fragment>
      {/* Start samples modal */}
      <SamplesModal
        open={modalSampleStatus}
        setOpen={setModalSampleStatus}
        requestId={selectedRequest}
        setRequestId={setSelectedRequest}
        loadRequests={loadData}
      />
      {/* End samples modal */}

      <div className="page-wrapper">
        <Sidemenu>
          <Filter
            orderbyValues={orderbyValues}
            orderValues={orderValues}
            statusValues={statusValues}
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
              <ListItemWithSelect
                id={item.id}
                key={item.id}
                onClick={() => handleSampleClick(item.id)}
                title="مدیریت"
                icon="list layout"
              >
                <SubItems data={["شماره درخواست:", item.num, "تاریخ درخواست:", date]} />
                <SubItems data={["نام مشتری:", item["client.name"], "نام درخواست کننده:", item.requester]} />
                <SubItems data={["وضعیت:", item.unanswered > 0 ? "ناتمام" : "اتمام", "", ""]} />
              </ListItemWithSelect>
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

export default withRouter(connect(null, { showDialog, getRequests })(Request));
