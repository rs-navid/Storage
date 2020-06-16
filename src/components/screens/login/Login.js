import React, { useState, useEffect } from "react";
import platform from "platform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faLock, faKey, faSync } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import Input from "../../forms/Input";
import Checkbox from "../../forms/Checkbox";
import Button from "../../forms/Button";

import { showDialog } from "../../../store/actions/dialogActions";
import { login } from "../../../store/actions/userActions";
import { getCaptcha } from "../../../store/actions/captchaActions";

import profile from "../../../assets/images/profile.png";

const Login = (props) => {
  useEffect(() => {
    document.title = "ورود";
    loadCaptcha();
    // eslint-disable-next-line
  }, []);

  const loadCaptcha = async () => {
    const results = await props.getCaptcha();

    if (results) {
      let image = btoa(
        new Uint8Array(results.data.buffer.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setCaptcha(`data:image/png;base64,${image}`);
      setCaptchaText(results.data.text);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [remember, setRemember] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const plat = JSON.stringify({
    name: platform.name,
    os: platform.os.family + " " + platform.os.version,
    product: platform.product,
  });

  // Handle reload button click 
  const handleReloadButtonClick = () => {
    loadCaptcha();
  }

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

          <Input
            type="text"
            name="captcha"
            placeholder="کد امنیتی"
            icon={<FontAwesomeIcon fixedWidth icon={faKey} />}
            iconstyle={{ color: "#777", backgroundColor: "#ccc" }}
            style={{ backgroundColor: "#eee", color: "#000", padding: "12px" }}
            onChange={setCaptchaValue}
            button={<FontAwesomeIcon fixedWidth icon={faSync} color="#39ace7"/> }
            onButtonClick = {handleReloadButtonClick}
          />

          <img src={captcha} alt="captcha" />

          <Checkbox name="remember" cls="remember" onChange={setRemember}>
            مرا به خاطر بسپار
          </Checkbox>
          <Button
            cls="primary w-100 p-4 border-rounded mt-5"
            onClick={(e) => {
              e.preventDefault();
              if (captchaText.toLowerCase() !== captchaValue.toLowerCase()) {
                props.showDialog({
                  type: "ok",
                  title: "خطا",
                  text: "کد امنیتی صحیح نمی باشد.",
                  yes: null,
                });
              } else if (!username || !password) {
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

export default connect(null, { showDialog, login, getCaptcha })(Login);
