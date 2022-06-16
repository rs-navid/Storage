import React, { Fragment, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Select = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <div style={{ position: "relative", margin: 0 }}>
        <Input
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
        <span
          style={{ position: "absolute", left: "7px", top: "10px", cursor: "pointer" }}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} fixedWidth color="#2185d0" />
        </span>
      </div>
      <Modal
        open={isOpen}
        title={props.title}
        cancel={() => {
          setIsOpen(false);
        }}
        maxWidth={"md"}
      >
        {props.items.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                padding: "10px",
                "border-radius": "5px",
                margin: "5px 0",
              }}
              onClick={() => {
                props.onChange(item);
                setIsOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} fixedWidth color="#000" />
              {item}
            </div>
          );
        })}
      </Modal>
    </Fragment>
  );
};

export default Select;
