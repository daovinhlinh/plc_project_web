import React from "react";
import "./index.css";

const handleSubmit = (e) => {
    e.preventDefault();
    // lấy value của các element trong một form
    const { username, password } = e.target;

    console.log(username.value);
    // onSubmit({ username: username.value, password: password.value });
};

const Register = () => {
    return (
        <div className="container">
            <h1>Plc Project</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="text-field">
                    <label htmlFor="username" className="field-label">
                        Email
                    </label>
                    <input id="username" type="text" />
                </div>
                <div className="text-field">
                    <label htmlFor="password" className="field-label">
                        Mật khẩu
                    </label>
                    <input id="password" type="password" />
                </div>

                <button type="submit" className="button">
                    submit
                </button>
            </form>
        </div>
    );
};

export default Register;
