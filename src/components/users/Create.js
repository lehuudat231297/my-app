import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Create = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errs, setErr] = useState();
    const [notifi, setNotifi] = useState(false);

    const changeInputValue = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        let errs = [];
        let formIsValid = true;

        if (input.name.length === 0) {
            errs["name"] = "Name can't be empty";
            formIsValid = false;
        }

        if (input.email.length < 5) {
            errs["email"] = "Email should be at least 5 charcters long";
            formIsValid = false;
        }
        if (input.email.split("").filter((x) => x === "@").length !== 1) {
            errs["email"] = "Email should contain a @";
            formIsValid = false;
        }
        if (input.email.indexOf(".") === -1) {
            errs["email"] = "Email should contain at least one dot";
            formIsValid = false;
        }

        if (input.password.length < 6) {
            errs["password"] = "Password should be at least 6 characters long";
            formIsValid = false;
        }

        setErr(errs);
        return formIsValid;
    };

    const submit = (e) => {
        e.preventDefault();
        let formIsValid = validate();

        if (!formIsValid) {
            return;
        } else {
            axios
                .post("http://localhost:3001/users", input)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
            setNotifi(true);
        }
    };

    return (
        <div>
            <div>
                <h1 className="">Create User</h1>
                <Link to="/users">
                    <button className="btn btn-primary">List</button>
                </Link>
                {notifi ? (
                    <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Create success
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => setNotifi(!notifi)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ) : null}
            </div>
            <hr></hr>
            <form onSubmit={(e) => submit(e)}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Name"
                            onChange={changeInputValue}
                            value={input.name}
                        ></input>
                        <div className="text-danger">
                            {typeof errs != "undefined" ? errs["name"] : ""}
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            onChange={changeInputValue}
                            value={input.email}
                        ></input>
                        <div className="text-danger">
                            {typeof errs != "undefined" ? errs["email"] : ""}
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={changeInputValue}
                            value={input.password}
                        ></input>
                        <div className="text-danger">
                            {typeof errs != "undefined" ? errs["password"] : ""}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
