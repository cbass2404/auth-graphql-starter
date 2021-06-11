import React, { Component } from "react";
import { hashHistory } from "react-router";
import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import mutation from "../mutations/login";
import query from "../queries/currentUser";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
        };
    }

    componentWillUpdate(nextProps) {
        // this.props // current props
        // nextProps // next set of props when the component rerenders
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push("/dashboard");
        }
    }

    onSubmit({ email, password }) {
        this.props
            .mutate({
                variables: { email, password },
                refetchQueries: [{ query }],
            })
            .catch((err) => {
                const errors = err.graphQLErrors.map((err) => err.message);
                this.setState({ errors });
            });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(query)(graphql(mutation)(LoginForm));
