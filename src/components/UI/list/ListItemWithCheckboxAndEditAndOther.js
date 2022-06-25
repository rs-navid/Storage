import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Checkbox } from "semantic-ui-react";
// import ReactWOW from "react-wow";

const ListItemWithCheckboxAndEdit = (props) => {
  return (
    // <ReactWOW animation="fadeInUp" key={props.id} duration="2s">
    <div className="list-item d-flex align-items-center">
      <div className="checkbox">
        <Checkbox onChange={props.onChange} />
      </div>
      <div className="info">{props.children}</div>
      <div className="action align-left mt-2 pl-3">
        <Button icon labelPosition="right" size="mini" onClick={props.onClick}>
          {" ویرایش "}
          <Icon name="edit" />
        </Button>
        <div className="break"></div>
        <Button icon labelPosition="right" size="mini" onClick={props.onOther}>
          {props.otherTitle}
          <Icon name={props.otherIcon} />
        </Button>
        {props.onPrint && (
          <Fragment>
            <div className="break"></div>
            <Button icon labelPosition="right" size="mini" onClick={props.onPrint}>
              {props.printTitle}
              <Icon name="print" />
            </Button>
          </Fragment>
        )}
      </div>
    </div>
    // {/* </ReactWOW> */}
  );
};

ListItemWithCheckboxAndEdit.propTypes = {
  id: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onOther: PropTypes.func.isRequired,
  otherTitle: PropTypes.string.isRequired,
  otherIcon: PropTypes.string.isRequired,
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

export default ListItemWithCheckboxAndEdit;
