import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { getCurrentUser, login } from "../services/authService";
import Form from "./common/form";

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
        },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        // Server work
        try {
            const { username, password } = this.state.data;
            await login(username, password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                if (ex.response.data.toLowerCase().includes("password"))
                    errors.password = ex.response.data;
                else errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        if (getCurrentUser()) return <Redirect to="/" />;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
