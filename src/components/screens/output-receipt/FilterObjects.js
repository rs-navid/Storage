import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { Menu } from "../../UI/sidemenu/Sidemenu";

const Filter = (props) => {
  const [name, setName] = useState("")

  // Handle search inputs change
  const handleSearchInputs = (e) => {
    setName(e.target.value);
  };

  // Handle search click
  const handleSearchClick = () => {
    props.loadData(name);
  };

  return (
    <Fragment>
      {/* Start search */}
      <Menu title="جستجو">
        <div className="search-wrapper">
          <div className="field-wrapper field-100 wrap">
            <label>نام کالا:</label>
            <Input placeholder="نام کالا" type="text" name="name" value={name} onChange={handleSearchInputs} />
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
  loadData: PropTypes.func.isRequired,
};

export default withRouter(Filter);
