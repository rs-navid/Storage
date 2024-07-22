import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { Menu } from "../../UI/sidemenu/Sidemenu";

const Filter = (props) => {
  // Handle search inputs change
  const handleSearchInputs = (e) => {
    props.setFilter({
      ...props.filter,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search click
  const handleSearchClick = () => {
    let query = qs.parse(props.location.search);
    query = {
      ...query,
      object: props.filter.object,
      number: props.filter.number,
      client: props.filter.client,
      storage: props.filter.storage,
      date: props.filter.date,
      order: props.filter.order,
      orderby: props.filter.orderby,
      page: props.filter.page
    };

    props.replaceHistory(query);
    props.loadData(query);
  };

  // Handle sort inputs change
  const handleSortInputs = async (e, { value }, target) => {
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
            <label>کد یکتا کالا:</label>
            <Input placeholder="کد یکتا کالا" type="text" name="number" value={props.filter.number} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>مشتری:</label>
            <Input placeholder="مشتری" type="text" name="client" value={props.filter.client} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>نام کالا:</label>
            <Input placeholder="نام کالا" type="text" name="object" value={props.filter.object} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>نام انبار:</label>
            <Input placeholder="نام انبار" type="text" name="storage" value={props.filter.storage} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
          <label>تاریخ انقضاء:</label>
          <Dropdown
            selection
            className="orderby"
            options={props.dateValues}
            style={{ minWidth: "180px" }}
            fluid
            value={props.filter.date}
            onChange={(e, value) => handleSortInputs(e, value, "date")}
            name="date"
          />
          </div>
          <div className="field-wrapper field-100 wrap">
          <label>مرتب سازی بر اساس:</label>
          <Dropdown
            selection
            className="orderby"
            options={props.orderbyValues}
            style={{ minWidth: "180px" }}
            fluid
            value={props.filter.orderby}
            onChange={(e, value) => handleSortInputs(e, value, "orderby")}
            name="orderby"
          />
          </div>
          <div className="field-wrapper field-100 wrap">
          <label>نوع مرتب سازی:</label>
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
    </Fragment>
  );
};

Filter.propTypes = {
  orderbyValues: PropTypes.array.isRequired,
  orderValues: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  replaceHistory: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default withRouter(Filter);
