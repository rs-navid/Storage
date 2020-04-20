import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon, Dropdown, Checkbox } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
import Modal from "../../UI/modal/Modal";
import permissions from "../../../configs/permissions";

import { getUsers, deleteUsers, createUser, updateUser, getUserPermissions } from "../../../store/actions/userActions";
import { showDialog } from "../../../store/actions/dialogActions";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "نام و نام خانوادگی", value: "name" },
  { key: 3, text: "نام کاربری", value: "username" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const User = (props) => {
  const [search, setSearch] = useState({ name: "", username: "" });
  const [orderby, setOrderby] = useState(orderbyValues[0].value);
  const [order, setOrder] = useState(orderValues[0].value);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState({ name: "", username: "", password: "", password_confirm: "", id: 0 });
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // Component did mount
  useEffect(() => {
    const query = qs.parse(props.location.search);
    loadData(qs.stringify(query));

    if (query.name || query.username) {
      setSearch({
        name: query.name || "",
        username: query.username || "",
      });
    }

    if (query.page) {
      setPage(+query.page + 1);
      console.log(+query.page + 1);
    }

    if (query.order) {
      if (["asc", "desc"].includes(query.order)) {
        setOrder(query.order);
      }
    }

    if (query.orderby) {
      if (["id", "name", "useername"].includes(query.orderby)) {
        setOrderby(query.orderby);
      }
    }

    // eslint-disable-next-line
  }, []);

  // Load users
  const loadData = async (query) => {
    const results = await props.getUsers(query);
    if (results) {
      setUsers(results.rows);
      setTotalPages(results.totalPages);
    }
  };

  // Push history
  const pushHistory = (query) => {
    props.history.replace({
      search: qs.stringify(query),
      hash: props.location.hash,
    });
  };

  // Handle sort inputs change
  const handleSortInputs = async (e, { value }, target) => {
    let query = qs.parse(props.location.search);

    if (target === "orderby") {
      setOrderby(value);
      query = {
        ...query,
        orderby: value,
        order: order,
      };
    } else {
      setOrder(value);
      query = {
        ...query,
        order: value,
        orderby: orderby,
      };
    }

    pushHistory(query);
    loadData(qs.stringify(query));
  };

  // Handle search inputs change
  const handleSearchInputs = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search click
  const handleSearchClick = () => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      name: search.name,
      username: search.username,
      order: order,
      orderby: orderby,
    };

    pushHistory(query);
    loadData(qs.stringify(query));
  };

  // Handle selection change
  const handleSelectionChange = (id) => {
    if (selectedUsers.indexOf(id) === -1) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      const newSelected = [...selectedUsers];
      newSelected.splice(selectedUsers.indexOf(id), 1);
      setSelectedUsers(newSelected);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedUsers.length === 0) {
      props.showDialog({ title: "خطا", text: "لطفا حداقل یک مورد را برای حذف انتخاب نمایید." });
    } else {
      props.showDialog({
        title: "حذف",
        text: `آیا مایل به حذف ${selectedUsers.length} مورد هستید؟`,
        type: "confirm",
        yes: deleteUsers,
      });
    }
  };

  // Delete
  const deleteUsers = async () => {
    const resutlt = await props.deleteUsers(selectedUsers);
    if (resutlt) {
      props.showDialog({ title: "حذف", text: "موارد انتخاب شده با موفقیت حذف شدند." });
      setSelectedUsers([]);
      setUsers([]);

      loadData(props.location.search);
    }
  };

  // Handle input vals
  const handleInput = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSaveUser = async () => {
    if (editingUser.name.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام و نام خانوادگی معتبر نمی باشد." });
    } else if (editingUser.username.trim() === "") {
      props.showDialog({ title: "خطا", text: "نام کاربری معتبر نمی باشد." });
    } else if (
      editingUser.id === 0 &&
      (editingUser.password.trim() === "" || editingUser.password_confirm.trim()) === ""
    ) {
      props.showDialog({ title: "خطا", text: "کلمه عبور معتبر نمی باشد." });
    } else if (editingUser.password.trim() !== editingUser.password_confirm.trim()) {
      props.showDialog({ title: "خطا", text: "کلمات عبور وارد شده یکسان نمی باشند." });
    } else if (editingUser.password.trim() !== "" && editingUser.password.trim().length < 8) {
      props.showDialog({ title: "خطا", text: "کلمه عبور باید حداقل 8 کاراکتر باشد." });
    } else {
      let result = null;
      if (editingUser.id === 0) {
        result = await props.createUser({ ...editingUser, permissions: selectedPermissions });
      } else {
        result = await props.updateUser({ ...editingUser, permissions: selectedPermissions });
      }

      if (result) {
        if (result.data) {
          setEditingUser({
            ...editingUser,
            id: result.data.id,
          });
        }

        props.showDialog({ title: "ثبت", text: "کاربر با موفقیت ثبت گردید." });
        setSelectedUsers([]);
        setUsers([]);

        const results = await props.getUsers();
        if (results) {
          setUsers(results.rows);
          setTotalPages(results.totalPages);
        }
      }
    }
  };

  // Click on new button
  const handleNewButtonClick = () => {
    setEditingUser({ name: "", username: "", password: "", password_confirm: "", id: 0 });
    setSelectedPermissions([]);
    setOpen(true);
  };

  // Click on edit button
  const handleEditButtonClick = async (id) => {
    const u = users.find((item) => item.id === id);
    setEditingUser({ name: u.name, username: u.username, password: "", password_confirm: "", id: id });
    const result = await props.getUserPermissions(id);
    setSelectedPermissions(result);
    setOpen(true);
  };

  // Handle checkboxes
  const handleCheckbox = (id) => {
    if (selectedPermissions.indexOf(id) === -1) {
      setSelectedPermissions([...selectedPermissions, id]);
    } else {
      const newSelected = [...selectedPermissions];
      newSelected.splice(selectedPermissions.indexOf(id), 1);
      setSelectedPermissions(newSelected);
    }
  };

  // Handle checkmark
  const handleCheckmark = (id) => {
    if (selectedPermissions.indexOf(id) === -1) {
      return false;
    }
    return true;
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      order: order,
      orderby: orderby,
      page: value - 1,
    };

    console.log(query);

    setPage(value);
    pushHistory(query);

    loadData(qs.stringify(query));
  };

  return (
    <div>
      {/* Start modal */}
      <Modal
        open={open}
        title={editingUser.id === 0 ? "کاربر جدید" : "ویرایش کاربر"}
        cancel={() => {
          setOpen(false);
        }}
        save={handleSaveUser}
      >
        <div className="field-wrapper field-50 right-50">
          <label>نام و نام خانوادگی:</label>
          <Input
            placeholder="نام و نام خانوادگی"
            type="text"
            name="name"
            value={editingUser.name}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام کاربری:</label>
          <Input
            placeholder="نام کاربری"
            type="text"
            name="username"
            value={editingUser.username}
            onChange={handleInput}
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="field-wrapper field-50 right-50">
          <label>کلمه عبور:</label>
          <Input
            placeholder="کلمه عبور"
            type="password"
            name="password"
            value={editingUser.password}
            onChange={handleInput}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>تکرار کلمه عبور:</label>
          <Input
            placeholder="تکرار کلمه عبور"
            type="password"
            name="password_confirm"
            value={editingUser.password_confirm}
            onChange={handleInput}
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="listbox p-2" style={{ height: "300px", overflowY: "auto", border: "1px solid #eee" }}>
          {permissions.map((item) => {
            if (!item.type && !item.isHidden) {
              return (
                <div key={item.id}>
                  <Checkbox
                    value={item.id}
                    label={item.text}
                    onClick={() => {
                      handleCheckbox(item.id);
                    }}
                    defaultChecked={handleCheckmark(item.id)}
                    className="checkbox py-1"
                    style={{ fontSize: ".875rem" }}
                  />
                </div>
              );
            }
          })}
        </div>
      </Modal>
      {/* End modal */}

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

      {/* Start search */}
      <div className="search-wrapper">
        <div className="field-wrapper field-50 right-50">
          <label>نام و نام خانوادگی:</label>
          <Input
            placeholder="نام و نام خانوادگی"
            type="text"
            name="name"
            value={search.name}
            onChange={handleSearchInputs}
          />
        </div>
        <div className="field-wrapper field-50 left-50">
          <label>نام کاربری:</label>
          <Input
            placeholder="نام کاربری"
            type="text"
            name="username"
            value={search.username}
            onChange={handleSearchInputs}
          />
        </div>
        <div className="clearfix"></div>
        <div className="line-break"></div>
        <div className="search-button align-left">
          <Button icon labelPosition="right" size="tiny" onClick={handleSearchClick}>
            جستجو
            <Icon name="search" />
          </Button>
        </div>
      </div>
      {/* End search */}

      <div className="divider"></div>

      {/* Start sort */}
      <div className="sort-wrapper d-flex align-items-center" style={{ flexWrap: "wrap" }}>
        <span style={{ display: "inline-block" }} className="pl-3 py-3">
          نمایش:
        </span>
        <Dropdown
          selection
          className="orderby ml-3 my-3"
          options={orderbyValues}
          style={{ minWidth: "180px" }}
          value={orderby}
          onChange={(e, value) => handleSortInputs(e, value, "orderby")}
          name="orderby"
        />
        <Dropdown
          selection
          className="order"
          options={orderValues}
          style={{ minWidth: "120px" }}
          value={order}
          onChange={(e, value) => handleSortInputs(e, value, "order")}
          name="order"
        />
      </div>
      {/* End sort */}

      {/* Start list */}
      {users.map((item) => {
        return (
          <ListItemWithCheckboxAndEdit
            id={item.id}
            key={item.id}
            onClick={() => handleEditButtonClick(item.id)}
            onChange={() => handleSelectionChange(item.id)}
          >
            <SubItems data={["نام و نام خانوادگی:", item.name, "نام کاربری:", item.username]} />
          </ListItemWithCheckboxAndEdit>
        );
      })}
      {/* End list */}

      <div>
        <Pagination
          className="pagination"
          count={totalPages}
          variant="outlined"
          shape="rounded"
          style={{ textAlign: "center" }}
          showFirstButton
          showLastButton
          siblingCount={0}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default withRouter(
  connect(null, { getUsers, showDialog, deleteUsers, createUser, updateUser, getUserPermissions })(User)
);
