import * as types from "../constants/UserType";

export const crateUser = (name, email, password) => ({
    type: types.CREATE_USER,
    name,
    email,
    password,
});

export const editUser = (id) => ({
    type: types.EDIT_USER,
    id,
});

export const updateUser = (id, name, email, password) => ({
    type: types.UPDATE_USER,
    id,
    name,
    email,
    password,
});

export const deleteUser = (id) => ({
    type: types.DELETE_USER,
    id,
});
