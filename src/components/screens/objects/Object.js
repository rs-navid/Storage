import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import ListItemWithCheckboxAndEditAndOther, {
  SubItems,
} from "../../UI/list/ListItemWithCheckboxAndEditAndOther";
import Sidemenu from "../../UI/sidemenu/Sidemenu";

import EditModal from "./EditModal";
import SubsModal from "./SubsModal";
import Filter from "./Filter";

import {
  getMainObject,
  getMainObjects,
  getSubObject,
  getSubObjects,
  createMainObject,
  createSubObject,
  deleteMainObjects,
  deleteSubObjects,
  updateMainObject,
  updateSubObject,
} from "../../../store/actions/objectActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "نام", value: "name" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const objectObject = {
  name: "",
  code: "",
  id: 0,
};

const MainObject = (props) => {
  const [filter, setFilter] = useState({
    name: "",
    subName: "",
    orderby: orderbyValues[0].value,
    order: orderValues[0].value,
    page: null,
  });
  const [objects, setObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [subsOpen, setSubsOpen] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 0 });
  const [editingObject, setEditingObject] = useState(objectObject);
  const [mainId, setMainId] = useState(0);
  const [mainName, setMainName] = useState("");

  // Component did mount
  useEffect(() => {
    // loadData(props.location.search);
    const query = qs.parse(props.location.search);

    setFilter({
      ...filter,
      name: query.name || "",
      subName: query.subName || "",
      code: query.code || "",
      subCode: query.subCode || "",
      order: ["asc", "desc"].includes(query.order) ? query.order : "asc",
      orderby: ["id", "name"].includes(query.orderby)
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
    setSelectedObjects([]);
    setObjects([]);
    const results = await props.getMainObjects(query);

    if (results) {
      setObjects(results.rows);
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
    if (selectedObjects.indexOf(id) === -1) {
      setSelectedObjects([...selectedObjects, id]);
    } else {
      const newSelected = [...selectedObjects];
      newSelected.splice(selectedObjects.indexOf(id), 1);
      setSelectedObjects(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedObjects.length === 0) {
      props.showDialog({
        title: "خطا",
        text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید.",
      });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedObjects.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteObjects,
      });
    }
  };

  // Delete
  const deleteObjects = async () => {
    const resutlt = await props.deleteMainObjects(selectedObjects);
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
    setEditingObject(objectObject);
    setOpen(true);
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const result = await props.getMainObject(id);
    if (result) {
      setEditingObject(result);
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
        editingObject={editingObject}
        setOpen={setOpen}
        setEditingObject={setEditingObject}
        createMainObject={props.createMainObject}
        updateMainObject={props.updateMainObject}
        loadData={loadData}
        filter={filter}
        showDialog={props.showDialog}
        />

      <SubsModal
        open={subsOpen}
        setOpen={setSubsOpen}
        loadData={loadData}
        filter={filter}
        mainId={mainId}
        mainName={mainName}
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
          {objects.map((item) => {
            return (
              <ListItemWithCheckboxAndEditAndOther
                id={item.id}
                key={item.id}
                onClick={() => handleEditButtonClick(item.id)}
                onChange={() => handleSelectionChange(item.id)}
                onOther={() => {
                  setSubsOpen(true);
                  setMainId(item.id);
                  setMainName(item.name);
                }}
                otherTitle="کالا ها"
                otherIcon="th list"
              >
                <SubItems
                  data={["نام دسته بندی:", item.name]}
                />
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

export default withRouter(
  connect(null, {
    showDialog,
    getMainObject,
    getMainObjects,
    getSubObject,
    getSubObjects,
    createMainObject,
    createSubObject,
    deleteMainObjects,
    deleteSubObjects,
    updateMainObject,
    updateSubObject,
  })(MainObject)
);
