import React from "react";
import View from "../views/settings/View";
interface Props {
    didLogin: boolean;
    setLoginStatus: (status: boolean, account: any) => void;
    forceReboot: () => void;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
    account: string;
}
export default class Settings extends React.Component<Props> {
    logout = () => {
        this.props.setLoginStatus(false, null);
        this.props.forceReboot();
    };
    componentDidMount() {
        if (!this.props.didLogin) this.props.forceReboot();
    }
    render() {
        return <React.Fragment>{!this.props.didLogin ? <React.Fragment></React.Fragment> : <View role="settings" prevComponent={this.props.prevComponent} setPrevComponent={this.props.setPrevComponent} redirectToAnyPath={this.props.redirectToAnyPath} account={this.props.account} logout={this.logout} />}</React.Fragment>;
    }
}
