import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    let params = useParams();
    const [input, setInput] = useState({});
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/users/${params.id}`)
            .then((res) => {
                setInput(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const [errs, setErr] = useState();
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
                .put(`http://localhost:3001/users/${params.id}`, input)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
            setIsRedirect(true);
        }
    };

    return isRedirect ? (
        <Redirect to="/users"></Redirect>
    ) : (
        <div>
            <div>
                <h1 className="">Edit User</h1>
                <Link to="/users">
                    <button className="btn btn-primary">List</button>
                </Link>
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

export default Edit;
