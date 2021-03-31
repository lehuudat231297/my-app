import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const Index = (props) => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        console.log(props.userssss);
        axios
            .get("http://localhost:3001/users")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const deleteUser = (id) => {
        axios
            .delete(`http://localhost:3001/users/${id}`)
            .then((res) => {
                setUser(users.filter((userDelete) => userDelete.id !== id));
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <div>
                <h1 className="">User Manager</h1>
                <Link to="/users/create">
                    <button className="btn btn-primary">Create</button>
                </Link>
            </div>
            <hr></hr>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/users/${user.id}/edit`}>
                                            <button className="btn btn-success">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-danger ml-1"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <th>Not found record</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userssss: state.UserReducers
    }
}

export default connect(mapStateToProps, null)(Index);
