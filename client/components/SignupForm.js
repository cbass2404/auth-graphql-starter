import React, { Component } from "react";
import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import mutation from "../mutations/login";
import query from "../queries/currentUser";

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
        };
    }
    onSubmit({ email, password }) {
        this.props
            .mutate({
                variables: { email, password },
                refetchQueries: [{ query }],
            })
            .then(() => hashHistory.push("/"))
            .catch((err) => {
                const errors = err.graphQLErrors.map((err) => err.message);
                this.setState({ errors });
            });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(mutation)(SignupForm);
