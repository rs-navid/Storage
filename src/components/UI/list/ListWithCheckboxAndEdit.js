import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";

const ListWithCheckboxAndEdit = (props) => {
  return (
    <div key={props.id} className="list-item d-flex align-items-center">
      <div className="checkbox">
        <Checkbox onChange={props.onChange} />
      </div>
      <div className="info">
        {props.items.map((item, index) => {
          if (!item.secondName) {
            return (
              <div className="data" key={index}>
                <div className="sub-data">
                  <div className="right">{item.firstName}</div>
                  <div className="left">{item.firstVal}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="data" key={index}>
                <div className="sub-data">
                  <div className="right">{item.firstName}</div>
                  <div className="left">{item.firstVal}</div>
                </div>
                <div className="sub-data">
                  <div className="right">{item.secondName}</div>
                  <div className="left">{item.secondVal}</div>
                </div>
              </div>
            );
          }
        })}

        <div className="action align-left mt-2 pl-3">
          <Button icon labelPosition="right" size="mini">
            ویرایش
            <Icon name="edit" />
          </Button>
        </div>
      </div>
    </div>
  );
};

ListWithCheckboxAndEdit.propTypes = {
  id: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default ListWithCheckboxAndEdit;
