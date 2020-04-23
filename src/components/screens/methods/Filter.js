import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { Menu } from "../../UI/sidemenu/Sidemenu";

const Filter = (props) => {
  useEffect(() => {
    props.loadData();
    // eslint-disable-next-line
  }, [props.filter.orderby, props.filter.order]);

  // Handle search inputs change
  const handleSearchInputs = (e) => {
    props.setFilter({
      ...props.filter,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search click
  const handleSearchClick = () => {
    props.loadData();
  };

  // Handle sort inputs change
  const handleSortInputs = (e, { value }, target) => {
    props.setFilter({
      ...props.filter,
      [target]: value,
    });
  };

  return (
    <Fragment>
      {/* Start search */}
      <Menu title="جستجو">
        <div className="search-wrapper">
          <div className="field-wrapper field-100 wrap">
            <label>کد آزمون:</label>
            <Input
              placeholder="کد آزمون"
              type="text"
              name="code"
              value={props.filter.code}
              onChange={handleSearchInputs}
            />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>نام آزمون:</label>
            <Input
              placeholder="نام آزمون"
              type="text"
              name="name"
              value={props.filter.name}
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
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default withRouter(Filter);
