import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import React, { Component } from "react";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
class App extends Component {
    state = {};

    componentDidMount() {
        try {
            const user = auth.getCurrentUser();
            this.setState({ user });
        } catch (ex) {}
    }

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>
                <ToastContainer
                    position="bottom-left"
                    theme="colored"
                    autoClose={2000}
                />
                <NavBar user={user} />
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/register" component={RegisterForm} />
                        <ProtectedRoute
                            path="/movies/:id"
                            component={MovieForm}
                        />
                        <Route
                            path="/movies"
                            render={props => <Movies {...props} user={user} />}
                        />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
