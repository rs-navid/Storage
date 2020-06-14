import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { Input, Button, Icon, Dropdown, Checkbox } from "semantic-ui-react";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { Menu } from "../../UI/sidemenu/Sidemenu";

const Filter = (props) => {
  // Handle search inputs change
  const handleSearchInputs = (e) => {
    props.setFilter({
      ...props.filter,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search status change
  const handleSearchStatus = (e, { value }, target) => {
    props.setFilter({
      ...props.filter,
      [target]: value,
    });
  };

  // Handle search click
  const handleSearchClick = () => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      name: props.filter.name,
      requester: props.filter.requester,
      startNum: props.filter.startNum,
      endNum: props.filter.endNum,
      isStartDate: props.filter.isStartDate,
      isEndDate: props.filter.isEndDate,
      status: props.filter.status,
      paid: props.filter.paid,
      order: props.filter.order,
      orderby: props.filter.orderby,
    };

    props.replaceHistory(query);
    props.loadData(qs.stringify(query));
  };

  // Handle sort inputs change
  const handleSortInputs = async (e, { value }, target) => {
    let query = qs.parse(props.location.search);
    props.setFilter({
      ...props.filter,
      [target]: value,
    });

    if (target === "orderby") {
      query = {
        ...query,
        orderby: value,
        order: props.filter.order,
      };
    } else {
      query = {
        ...query,
        order: value,
        orderby: props.filter.orderby,
      };
    }

    props.replaceHistory(query);
    props.loadData(qs.stringify(query));
  };

  const handleCheckboxInputs = (name) => {
    props.setFilter({
      ...props.filter,
      [name]: +props.filter[name] === 0 ? 1 : 0,
    });
  };

  // Handle date changes
  const handleDateChanges = (data, target) => {
    props.setFilter({
      ...props.filter,
      [target]: data,
    });
  };

  return (
    <Fragment>
      {/* Start search */}
      <Menu title="جستجو">
        <div className="search-wrapper">
          <div className="field-wrapper field-100 wrap">
            <label>از شماره درخواست:</label>
            <Input
              placeholder="شماره درخواست"
              type="text"
              name="startNum"
              value={props.filter.startNum}
              onChange={handleSearchInputs}
            />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>تا شماره درخواست:</label>
            <Input
              placeholder="شماره درخواست"
              type="text"
              name="endNum"
              value={props.filter.endNum}
              onChange={handleSearchInputs}
            />
          </div>

          <div className="field-wrapper field-100 wrap">
            <label>از تاریخ:</label>
            <Checkbox
              value={1}
              checked={+props.filter.isStartDate === 0 ? false : true}
              style={{ flexGrow: 0, marginTop: "10px", marginLeft: "2px" }}
              onChange={(e) => {
                handleCheckboxInputs("isStartDate", e.target.value);
              }}
            />
            {console.log(props.filter.startDate)}
            <DatePicker
              value={props.filter.startDate}
              onChange={(val) => {
                handleDateChanges(val, "startDate");
              }}
              shouldHighlightWeekends
              locale="fa"
            />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>تا تاریخ:</label>
            <Checkbox
              value={1}
              checked={+props.filter.isEndDate === 0 ? false : true}
              style={{ flexGrow: 0, marginTop: "10px", marginLeft: "2px" }}
              onChange={(e) => {
                handleCheckboxInputs("isEndDate", e.target.value);
              }}
            />
            <DatePicker
              value={props.filter.endDate}
              onChange={(val) => {
                handleDateChanges(val, "endDate");
              }}
              shouldHighlightWeekends
              locale="fa"
            />
          </div>

          <div className="field-wrapper field-100 wrap">
            <label>نام مشتری:</label>
            <Input
              placeholder="نام مشتری"
              type="text"
              name="name"
              value={props.filter.name}
              onChange={handleSearchInputs}
            />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>نام درخواست کننده:</label>
            <Input
              placeholder="نام درخواست کننده"
              type="text"
              name="requester"
              value={props.filter.requester}
              onChange={handleSearchInputs}
            />
          </div>

          <div className="clearfix"></div>
          <div className="line-break"></div>
          <div className="field-wrapper field-100 wrap">
            <label>وضعیت:</label>
            <Dropdown
              selection
              fluid
              className="order"
              options={props.statusValues}
              style={{ minWidth: "120px" }}
              value={props.filter.status}
              onChange={(e, value) => handleSearchStatus(e, value, "status")}
              name="order"
            />
          </div>

          <div className="clearfix"></div>
          <div className="line-break"></div>
          <div className="field-wrapper field-100 wrap">
            <label>تسویه حساب:</label>
            <Dropdown
              selection
              fluid
              className="order"
              options={props.isPaidValues}
              style={{ minWidth: "120px" }}
              value={props.filter.paid}
              onChange={(e, value) => handleSearchStatus(e, value, "paid")}
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
      </Menu>
      {/* End search */}

      {/* Start sort */}
      <Menu title="مرتب سازی">
        <div className="sort-wrapper d-flex align-items-center" style={{ flexWrap: "wrap" }}>
          <Dropdown
            selection
            className="orderby my-3"
            options={props.orderbyValues}
            style={{ minWidth: "180px" }}
            fluid
            value={props.filter.orderby}
            onChange={(e, value) => handleSortInputs(e, value, "orderby")}
            name="orderby"
          />
          <Dropdown
            selection
            fluid
            className="order"
            options={props.orderValues}
            style={{ minWidth: "120px" }}
            value={props.filter.order}
            onChange={(e, value) => handleSortInputs(e, value, "order")}
            name="order"
          />
        </div>
      </Menu>
      {/* End sort */}
    </Fragment>
  );
};

Filter.propTypes = {
  orderbyValues: PropTypes.array.isRequired,
  orderValues: PropTypes.array.isRequired,
  statusValues: PropTypes.array.isRequired,
  isPaidValues: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  replaceHistory: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default withRouter(Filter);
