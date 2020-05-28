import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

const ListItemWithSelect = (props) => {
  return (
      <div className="list-item d-flex align-items-center with-select">
        <div className="info">{props.children}</div>
        <div className="action align-left mt-2 pl-3">
          <Button icon labelPosition="right" size="mini" onClick={props.onClick}>
            {props.title ? props.title : "انتخاب"}
            <Icon name={props.icon ? props.icon : "hand pointer"} />
          </Button>
        </div>
      </div>
  );
};

ListItemWithSelect.propTypes = {
  id: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const SubItems = (props) => {
  return (
    <div className="data">
      <div className="sub-data">
        <div className="right">{props.data[0]}</div>
        <div className="left">{props.data[1]}</div>
      </div>
      <div className="sub-data">
        <div className="right">{props.data[2]}</div>
        <div className="left">{props.data[3]}</div>
      </div>
    </div>
  );
};

SubItems.propTypes = {
  data: PropTypes.array.isRequired,
};

export const SubItem = (props) => {
  return (
    <div className="data">
      <div className="sub-data">
        <div className="right">{props.data[0]}</div>
        <div className="left">{props.data[1]}</div>
      </div>
    </div>
  );
};

SubItem.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ListItemWithSelect;
