import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import moment from "jalali-moment";

import ListItemWithSelect, {
  SubItems,
} from "../../UI/list/ListItemWithSelect";
import Sidemenu from "../../UI/sidemenu/Sidemenu";

import Filter from "./Filter";

import {
  getStorageAvailability,
} from "../../../store/actions/storageActions";
import { showDialog } from "../../../store/actions/dialogActions";

const dateValues = [
  { key: 1, text: "همه", value: "9" },
  { key: 2, text: "تاریخ انقضاء خالی", value: "0" },
  { key: 3, text: "تاریخ انقضاء پر شده", value: "9999" },
  { key: 4, text: "منقضی شده است", value: "99" },
  { key: 5, text: "منقضی نشده است", value: "999" },
  { key: 6, text: "کمتر از 1 ماه", value: "1" },
  { key: 7, text: "کمتر از 2 ماه", value: "2" },
  { key: 8, text: "کمتر از 3 ماه", value: "3" },
  { key: 9, text: "کمتر از 4 ماه", value: "4" },
  { key: 10, text: "کمتر از 5 ماه", value: "5" },
  { key: 11, text: "کمتر از 6 ماه", value: "6" },
  { key: 12, text: "کمتر از 12 ماه", value: "12" },
];

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "کد یکتا کالا", value: "number" },
  { key: 3, text: "نام کالا", value: "Object.Name" },
  { key: 4, text: "تاریخ ورود کالا", value: "Date" },
  { key: 5, text: "تاریخ انقضاء", value: "EndDate" },
  { key: 6, text: "نام مشتری", value: "Receipt.Client.Name" },
  { key: 7, text: "نام انبار", value: "SubStorage.Name" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const MainStorage = (props) => {
  const [filter, setFilter] = useState({
    orderby: orderbyValues[0].value,
    order: orderValues[0].value,
    page: null,
    object: "",
    number: 0,
    client: "",
    storage: "",
    date: "9",
  });
  const [storages, setStorages] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 0 });

  // Component did mount
  useEffect(() => {
    // loadData(props.location.search);
    const query = qs.parse(props.location.search);

    setFilter({
      ...filter,
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
    setStorages([]);
    const results = await props.getStorageAvailability(query);

    if (results) {
      setStorages(results.rows);
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
      date: filter.date,
      page: value - 1,
    };

    setFilter({ ...filter, page: value - 1 });
    setPageInfo({ ...pageInfo, page: value });
    replaceHistory(query);

    // loadData(qs.stringify(query));
  };

  return (
    <Fragment>

      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button
          icon
          labelPosition="right"
          size="small"
          color="blue"
          onClick={()=>{ console.log(filter);window.open(`/printstorageavailibility?${
            "orderby="+ filter.orderby + "&order=" + filter.order + "&object=" + filter.object + 
            "&number="+ filter.number + "&client="+ filter.client + "&storage=" + filter.storage + "&date="+ filter.date
          }`, "_blank")}}
        >
          چاپ
          <Icon name="print" />
        </Button>
      </div>
      {/* End actions */}

      <div className="page-wrapper">
        <Sidemenu>
          <Filter
            orderbyValues={orderbyValues}
            dateValues = {dateValues}
            orderValues={orderValues}
            filter={filter}
            setFilter={setFilter}
            replaceHistory={replaceHistory}
            loadData={loadData}
          />
        </Sidemenu>

        <div className="page-content">
          {/* Start list */}
          {storages.map((item) => {
            const d = moment
            .from(item.date, "en", "YYYY-MM-DD")
            .locale("fa")
            .format("YYYY/MM/DD");
            const s = item.startDate ? moment
              .from(item.startDate, "en", "YYYY-MM-DD")
              .locale("fa")
              .format("YYYY/MM/DD") : "";
              const e = item.endDate ? moment
              .from(item.endDate, "en", "YYYY-MM-DD")
              .locale("fa")
              .format("YYYY/MM/DD") : "";
            return (
              <ListItemWithSelect
                id={item.id}
                key={item.id}
              >
                <SubItems
                  data={["کد یکتا کالا:",item.periodCode + "/" + item.number, "نام کالا:", item.object]}
                />
                <SubItems
                  data={["تاریخ ورود:",d, "محل انبارش:", item.storage]}
                />
                <SubItems
                  data={["تولید کننده:",item.manufacturer, "شماره بچ:", item.batch]}
                />
                <SubItems
                  data={["مشتری:",item.client, "واحد:", item.mainUnit]}
                />
                <SubItems
                  data={["تاریخ تولید:",s, "تاریخ انقضاء:", e]}
                />
                <SubItems
                  data={["مقدار کل:",item.amount, "مقدار باقیمانده:", item.remainAmount]}
                />
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
              page={filter.page + 1}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(
  connect(null, {
    showDialog,
    getStorageAvailability,
  })(MainStorage)
);
