import { createStore } from "redux";
import reducer from './reducer'
// import createHistory from 'history/createBrowserHistory';

// export const history = createHistory();

export const store = createStore(reducer);
