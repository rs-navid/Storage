import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import ListItemWithCheckboxAndEdit, {
  SubItems,
} from "../../UI/list/ListItemWithCheckboxAndEdit";
import Sidemenu from "../../UI/sidemenu/Sidemenu";

import EditModal from "./EditModal";
import Filter from "./Filter";

import {
  getClients,
  deleteClients,
  createClient,
  updateClient,
  getClient,
} from "../../../store/actions/clientActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "نام", value: "name" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const clientObject = {
  name: "",
  codeEghtesadi: "",
  shomareSabt: "",
  shenaseMeli: "",
  phoneNumber: "",
  state: "",
  city: "",
  address: "",
  zipCode: "",
  description: "",
  id: 0,
};

const Client = (props) => {
  const [filter, setFilter] = useState({
    name: "",
    codeeghtesadi: "",
    shomaresabt: "",
    shenasemeli: "",
    state: "",
    city: "",
    orderby: orderbyValues[0].value,
    order: orderValues[0].value,
    page: null,
  });
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 0 });
  const [editingClient, setEditingClient] = useState(clientObject);

  // Component did mount
  useEffect(() => {
    // loadData(props.location.search);
    const query = qs.parse(props.location.search);

    setFilter({
      ...filter,
      name: query.name || "",
      codeEghtesadi: query.codeEghtesadi || "",
      shomareSabt: query.shomareSabt || "",
      shenaseMeli: query.shenaseMeli || "",
      state: query.state || "",
      city: query.city || "",
      order: ["asc", "desc"].includes(query.order) ? query.order : "asc",
      orderby: ["id", "name"].includes(query.orderby) ? query.orderby : "id",
      page: query.page ? +query.page : 0,
    });

    setPageInfo({
      ...pageInfo,
      page: query.page ? +query.page : 0,
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(filter);
    if (filter.page !== null) {
      loadData({ ...filter });
    }
  }, [filter.page]);

  // Load data
  const loadData = async (query) => {
    setSelectedClients([]);
    setClients([]);
    const results = await props.getClients(query);

    if (results) {
      setClients(results.rows);
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
    if (selectedClients.indexOf(id) === -1) {
      setSelectedClients([...selectedClients, id]);
    } else {
      const newSelected = [...selectedClients];
      newSelected.splice(selectedClients.indexOf(id), 1);
      setSelectedClients(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedClients.length === 0) {
      props.showDialog({
        title: "خطا",
        text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید.",
      });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedClients.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteClients,
      });
    }
  };

  // Delete
  const deleteClients = async () => {
    const resutlt = await props.deleteClients(selectedClients);
    if (resutlt) {
      props.showDialog({
        title: "حذف",
        text: "موارد انتخاب شده با موفقیت حذف شدند.",
      });
      loadData({ ...filter });
    }
  };

  // Click on new button
  const handleNewButtonClick = () => {
    setEditingClient(clientObject);
    setOpen(true);
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const result = await props.getClient(id);
    if (result) {
      setEditingClient(result);
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

    setPageInfo({ ...pageInfo, page: value - 1 });
    setFilter({ ...filter, page: value - 1 });
    replaceHistory(query);

    // loadData({...filter, ...pageInfo});
  };

  return (
    <Fragment>
      {/* Start modal */}
      <EditModal
        open={open}
        editingClient={editingClient}
        setOpen={setOpen}
        setEditingClient={setEditingClient}
        createClient={props.createClient}
        updateClient={props.updateClient}
        loadData={loadData}
        filter={filter}
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
          {clients.map((item) => {
            return (
              <ListItemWithCheckboxAndEdit
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
              >
                <SubItems
                  data={["نام:", item.name, "کد اقتصادی:", item.codeEghtesadi]}
                />
                <SubItems
                  data={[
                    "شماره ثبت:",
                    item.shomareSabt,
                    "شماره ملی:",
                    item.shenaseMeli,
                  ]}
                />
                <SubItems data={["استان:", item.state, "شهر:", item.city]} />
                <SubItems data={["شماره تماس:", item.phoneNumber]} />
              </ListItemWithCheckboxAndEdit>
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
    getClients,
    getClient,
    deleteClients,
    createClient,
    updateClient,
  })(Client)
);
