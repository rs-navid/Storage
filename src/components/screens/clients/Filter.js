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
      name: props.filter.name,
      codeEghtesadi: props.filter.codeEghtesadi,
      shomareSabt: props.filter.shomareSabt,
      shenaseMeli: props.filter.shenaseMeli,
      state: props.filter.state,
      city: props.filter.city,
      order: props.filter.order,
      orderby: props.filter.orderby,
      page: props.filter.page
    };

    props.replaceHistory(query);
    props.loadData(query);
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
    props.loadData(query);
  };

  return (
    <Fragment>
      {/* Start search */}
      <Menu title="جستجو">
        <div className="search-wrapper">
          <div className="field-wrapper field-100 wrap">
            <label>نام:</label>
            <Input placeholder="نام" type="text" name="name" value={props.filter.name} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>کد اقتصادی:</label>
            <Input placeholder="کد اقتصادی" type="text" name="codeEghtesadi" value={props.filter.codeEghtesadi} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>شماره ثبت:</label>
            <Input placeholder="شماره ثبت" type="text" name="shomareSabt" value={props.filter.shomareSabt} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>شناسه ملی:</label>
            <Input placeholder="شناسه ملی" type="text" name="shenaseMeli" value={props.filter.shenaseMeli} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>استان:</label>
            <Input placeholder="استان" type="text" name="state" value={props.filter.state} onChange={handleSearchInputs} />
          </div>
          <div className="field-wrapper field-100 wrap">
            <label>شهر:</label>
            <Input placeholder="شهر" type="text" name="city" value={props.filter.city} onChange={handleSearchInputs} />
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
  replaceHistory: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default withRouter(Filter);
