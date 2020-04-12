import React, { useState, useEffect } from "react";
import platform from "platform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import Input from "../../forms/Input";
import Checkbox from "../../forms/Checkbox";
import Button from "../../forms/Button";

import { showDialog } from "../../../store/actions/dialogActions";
import { login } from "../../../store/actions/userActions";

import profile from "../../../assets/images/profile.png";

const Login = (props) => {
  useEffect(() => {
    document.title = "ورود";
  }, []);

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
        <div className="image-container">
          <img src={profile} alt="Login" />
        </div>
        <form autoComplete="off">
          <Input
            type="text"
            name="username"
            placeholder="نام کاربری"
            icon={<FontAwesomeIcon fixedWidth icon={faUserAlt} />}
            iconstyle={{ color: "#777", backgroundColor: "#ccc" }}
            style={{ backgroundColor: "#eee", color: "#000", padding: "12px" }}
            onChange={setUsername}
          />
          <Input
            type="password"
            name="password"
            placeholder="کلمه عبور"
            icon={<FontAwesomeIcon fixedWidth icon={faLock} />}
            iconstyle={{ color: "#777", backgroundColor: "#ccc" }}
            style={{ backgroundColor: "#eee", color: "#000", padding: "12px" }}
            onChange={setPassword}
          />
          <Checkbox name="remember" cls="remember" onChange={setRemember}>
            مرا به خاطر بسپار
          </Checkbox>
          <Button
            cls="primary w-100 p-4 border-rounded mt-5"
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

export default connect(null, { showDialog, login })(Login);
