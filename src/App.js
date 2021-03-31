import "./App.css";
import UserIndex from "./components/users/Index";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import UserCreate from "./components/users/Create";
import UserEdit from "./components/users/Edit";

function App() {
    return (
        <div className="container">
            <Link to="/">Home</Link>
            <span> &gt; </span>
            <Link to="/users">User Manager</Link>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={UserIndex} />
                <Route path="/users/create" component={UserCreate} />
                <Route path="/users/:id/edit" component={UserEdit} />
            </Switch>
        </div>
    );
}

export default App;
