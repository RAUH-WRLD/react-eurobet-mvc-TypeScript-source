import React from "react";
import View from "../views/authorization/View";
interface Props {
    didLogin: boolean;
    setLoginStatus: (status: boolean, account: any) => void;
    didRegister: boolean;
    setRegistrationStatus: (status: boolean) => void;
    didReset: boolean;
    setResetStatus: (status: boolean) => void;
}
export default class Authorization extends React.Component<Props> {
    render() {
        return <View role="login" didLogin={this.props.didLogin} setLoginStatus={this.props.setLoginStatus} didRegister={this.props.didRegister} setRegistrationStatus={this.props.setRegistrationStatus} didReset={this.props.didReset} setResetStatus={this.props.setResetStatus} />;
    }
}
