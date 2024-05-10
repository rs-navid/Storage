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
  getPack,
  getPacks,
  deletePacks,
  createPack,
  updatePack,
} from "../../../store/actions/packActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "نام", value: "name" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const packObject = {
  name: "",
  id: 0,
};

const Pack = (props) => {
  const [filter, setFilter] = useState({
    name: "",
    orderby: orderbyValues[0].value,
    order: orderValues[0].value,
    page: null,
  });
  const [packs, setPacks] = useState([]);
  const [selectedPacks, setSelectedPacks] = useState([]);
  const [open, setOpen] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 0 });
  const [editingPack, setEditingPack] = useState(packObject);

  // Component did mount
  useEffect(() => {
    // loadData(props.location.search);
    const query = qs.parse(props.location.search);

    setFilter({
      ...filter,
      name: query.name || "",
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
    setSelectedPacks([]);
    setPacks([]);
    const results = await props.getPacks(query);

    if (results) {
      setPacks(results.rows);
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
    if (selectedPacks.indexOf(id) === -1) {
      setSelectedPacks([...selectedPacks, id]);
    } else {
      const newSelected = [...selectedPacks];
      newSelected.splice(selectedPacks.indexOf(id), 1);
      setSelectedPacks(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedPacks.length === 0) {
      props.showDialog({
        title: "خطا",
        text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید.",
      });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedPacks.length} مورد هستید؟`,
        type: "confirm",
        yes: deletePacks,
      });
    }
  };

  // Delete
  const deletePacks = async () => {
    const resutlt = await props.deletePacks(selectedPacks);
    if (resutlt) {
      props.showDialog({
        title: "حذف",
        text: "موارد انتخاب شده با موفقیت حذف شدند.",
      });
      loadData(filter);
    }
  };

  // Click on new button
  const handleNewButtonClick = () => {
    setEditingPack(packObject);
    setOpen(true);
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const result = await props.getPack(id);
    if (result) {
      setEditingPack(result);
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
        editingPack={editingPack}
        setOpen={setOpen}
        setEditingPack={setEditingPack}
        createPack={props.createPack}
        updatePack={props.updatePack}
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
          {packs.map((item) => {
            return (
              <ListItemWithCheckboxAndEdit
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
              >
                <SubItems data={["نام بسته بندی:", item.name]} />
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
    getPack,
    getPacks,
    deletePacks,
    createPack,
    updatePack,
  })(Pack)
);
