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
    generateCaptcha();
    // eslint-disable-next-line
  }, []);

  const generateCaptcha = () => {
    const canvas = document.getElementById("captcha");
    const ctx = canvas.getContext("2d");
    let captchaText = generateCaptchaText();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";

    for(let i=0;i<captchaText.length; i++){
      let y = Math.floor(Math.random() * (45 - 25 + 1) + 25);
      let s = Math.floor(Math.random() * (35 - 25 + 1) + 25);
      ctx.font= `bold ${s}px Arial`;
      ctx.fillText(captchaText.charAt(i), 10*i+28, y);
    }

    // ctx.fillText(captchaText, 200, 40);
    ctx.beginPath();
    for (let i = 0; i < 25; i++) {
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    }
    ctx.strokeStyle = "#000";
    ctx.stroke();
    setCaptcha(captchaText.replaceAll(" ", ""));
  };
  
  const generateCaptchaText = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ023456789";
    let captchaText = "";
    for (let i = 0; i < 5; i++) {
      captchaText += "  " +chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captchaText;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [remember, setRemember] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const plat = JSON.stringify({
    name: platform.name,
    os: platform.os.family + " " + platform.os.version,
    product: platform.product,
  });

  // Handle reload button click 
  const handleReloadButtonClick = () => {
    generateCaptcha();
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

          {/* <img src={captcha} alt="captcha" /> */}
          <div style={{marginTop: 28}}>
            <canvas id="captcha" width="200" height="50"></canvas>
          </div>

          {/* <Checkbox name="remember" cls="remember" onChange={setRemember}>
            مرا به خاطر بسپار
          </Checkbox> */}
          <Button
            cls="primary w-100 p-4 border-rounded mt-5"
            onClick={(e) => {
              e.preventDefault();
              if (captcha.toLowerCase() !== captchaValue.toLowerCase()) {
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
