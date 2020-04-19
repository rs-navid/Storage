import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon, Dropdown } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";

import ListItemWithCheckboxAndEdit, { SubItems } from "../../UI/list/ListItemWithCheckboxAndEdit";
import { getUsers } from "../../../store/actions/userActions";

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
    console.log(results);
    if (results) {
      setUsers(results.rows);
    }
  };

  // Push history
  const pushHistory = (query) => {
    props.history.push({
      search: qs.stringify(query),
      hash: props.location.hash
    });
  }

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
      orderby: orderby
    };

    pushHistory(query);
    loadData(qs.stringify(query));
  };

  // Handle edit click
  const handleEditClick = (id) => {};

  // Handle selection change
  const handleSelectionChange = (id) => {};

  return (
    <div>
      {/* Start actions */}
      <div className="actions pt-4 pb-5 align-left">
        <Button icon labelPosition="right" color="blue" size="small">
          حذف
          <Icon name="trash" />
        </Button>
        <Button icon labelPosition="right" size="small" color="blue">
          جدید
          <Icon name="add" />
        </Button>
      </div>
      {/* End actions */}

      {/* Start search */}
      <div className="search-wrapper">
        <div className="field-wrapper field-50 right-50 label-sm">
          <label>نام و نام خانوادگی:</label>
          <Input
            placeholder="نام و نام خانوادگی"
            type="text"
            name="name"
            value={search.name}
            onChange={handleSearchInputs}
          />
        </div>
        <div className="field-wrapper field-50 left-50 label-sm">
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
          مرتب سازی:
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
            onClick={() => handleEditClick(item.id)}
            onChange={() => handleSelectionChange(item.id)}
          >
            <SubItems data={["نام و نام خانوادگی:", item.name, "نام کاربری:", item.username]} />
          </ListItemWithCheckboxAndEdit>
        );
      })}
      {/* End list */}
    </div>
  );
};

export default withRouter(connect(null, { getUsers })(User));
