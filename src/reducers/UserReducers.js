import {
    CREATE_USER,
    EDIT_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../constants/UserType";

// let initialState = [
//     {
//         a: 1
//     },
//     {
//         b: 2
//     }
// ];

const UserReducers = (state = [], action) => {
    switch (action.type) {
        case CREATE_USER:
            return [
                {
                    id: state.length === 0 ? 0 : state[0].id + 1,
                    name: action.name,
                    email: action.email,
                    password: action.password,
                    editing: false,
                },
                ...state,
            ];

        case EDIT_USER:
            return state.map((user) =>
                user.id === action.id
                    ? { ...user, editing: !user.editing }
                    : user
            );

        case UPDATE_USER:
            return state.map((user) => {
                return user.id === action.id
                    ? {
                        ...user,
                        name: action.name,
                        email: action.email,
                        password: action.password,
                        editing: !user.editing,
                    }
                    : user;
            });

        case DELETE_USER:
            return state.filter((user) => user.id !== action.id);

        default:
            return state;
    }
};

export default UserReducers;
