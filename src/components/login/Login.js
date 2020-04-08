import React, { useState } from "react";
import platform from "platform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import Input from "../forms/Input";
import Checkbox from "../forms/Checkbox";
import Button from "../forms/Button";

import { showDialog } from "../../store/actions/dialogActions";
import { login } from "../../store/actions/userActions";
import { showSpinner } from "../../store/actions/spinnerActions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const plat = JSON.stringify({
    name: platform.name,
    os: platform.os.family + " " + platform.os.version,
    product: platform.product,
  });

  return (
    <div className="login-screen">
      <div className="container">
        <div className="check-container">
          <div className="check"></div>
        </div>
        <form>
          <Input
            type="text"
            name="username"
            placeholder="نام کاربری"
            icon={<FontAwesomeIcon fixedWidth icon={faUserAlt} />}
            iconstyle={{ color: "#fff", backgroundColor: "#2e3856" }}
            style={{ backgroundColor: "#262e49", color: "#fff", padding: "10px" }}
            onChange={setUsername}
          />
          <Input
            type="password"
            name="password"
            placeholder="کلمه عبور"
            icon={<FontAwesomeIcon fixedWidth icon={faLock} />}
            iconstyle={{ color: "#fff", backgroundColor: "#2e3856" }}
            style={{ backgroundColor: "#262e49", color: "#fff", padding: "10px" }}
            onChange={setPassword}
          />
          <Checkbox name="remember" cls="remember" onChange={setRemember}>
            مرا به خاطر بسپار
          </Checkbox>
          <Button
            cls="violet w-100 p-4 border-pill mt-5"
            onClick={(e) => {
              e.preventDefault();
              if (!username || !password) {
                props.showDialog({
                  type: "ok",
                  title: "خطا",
                  text: "نام کاربری و یا کلمه عبور صحیح نمی باشد.",
                  yes: null,
                });
              } else {
                props.showSpinner();
                props.login(username, password, plat, remember);
              }
            }}
          >
            ورود
          </Button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { showDialog, login, showSpinner })(Login);
