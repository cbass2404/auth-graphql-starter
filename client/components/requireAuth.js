import React, { Component } from "react";
import graphql from "graphql-tag";
import currentUserQuery from "../queries/currentUser";
import { hashHistory } from "react-router";

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push("/login");
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(currentUserQuery)(RequireAuth);
};
