import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import Pagination from "@material-ui/lab/Pagination";
import moment from "jalali-moment";

import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";
import Sidemenu from "../../UI/sidemenu/Sidemenu";
import PrintModal from "./PrintModal";

import Filter from "./Filter";

import { getAllSamples } from "../../../store/actions/requestActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "شماره درخواست", value: "num" },
  { key: 3, text: "تاریخ درخواست", value: "date" },
  { key: 4, text: "شماره فاکتور رسمی", value: "invoice" },
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

const isPaidValues = [
  { key: 1, text: "همه", value: "all" },
  { key: 2, text: "تسویه نشده", value: "no" },
  { key: 3, text: "تسویه شده", value: "yes" },
];

const SampleReport = (props) => {
  const [filter, setFilter] = useState({
    startNum: "",
    endNum: "",
    name: "",
    requester: "",
    status: "all",
    paid: "all",
    isStartDate: 0,
    isEndDate: 0,
    orderby: orderbyValues[1].value,
    order: orderValues[0].value,
  });
  const [requests, setRequests] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 1 });
  const [printModalStatus, setPrintModalStatus] = useState(false);

  // Component did mount
  useEffect(() => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      name: query.name || "",
      requester: query.requester || "",
      startNum: query.startNum || "",
      endNum: query.endNum || "",
      isStartDate: query.isStartDate || 0,
      isEndDate: query.isEndDate || 0,
      status: query.status || "all",
      paid: query.paid || "all",
      order: ["asc", "desc"].includes(query.order) ? query.order : "asc",
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
    const results = await props.getAllSamples(query, { startDate: filter.startDate, endDate: filter.endDate });

    if (results) {
      setRequests(results.rows);
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

  // Handle print button click
  const handlePrintButtonClick = () => {
    setPrintModalStatus(true);
  };

  return (
    <Fragment>
      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" size="small" color="blue" onClick={handlePrintButtonClick}>
          چاپ
          <Icon name="print" />
        </Button>
      </div>
      {/* End actions */}

      <div className="page-wrapper">
        <Sidemenu>
          <Filter
            orderbyValues={orderbyValues}
            orderValues={orderValues}
            statusValues={statusValues}
            isPaidValues={isPaidValues}
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
              <ListItemWithSelect id={item["sample.id"]} key={item["sample.id"]}>
                <SubItems data={["شماره درخواست:", item.num, "تاریخ درخواست:", date]} />
                <SubItems data={["نام مشتری:", item["client.name"], "نام درخواست کننده:", item.requester]} />
                <SubItems data={["نام نمونه:", item["sample.name"], "", ""]} />
              </ListItemWithSelect>
            );
          })}
          {/* End list */}

          {console.log(filter)}

          <PrintModal open={printModalStatus} setOpen={setPrintModalStatus} data={filter} />

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

export default withRouter(connect(null, { showDialog, getAllSamples })(SampleReport));
