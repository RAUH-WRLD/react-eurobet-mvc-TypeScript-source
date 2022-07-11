import React from "react";
import View from "../views/players/View";
interface Props {
    didLogin: boolean;
    forceReboot: () => void;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
}
export default class Players extends React.Component<Props> {
    componentDidMount() {
        if (!this.props.didLogin) this.props.forceReboot();
    }
    render() {
        return <React.Fragment>{!this.props.didLogin ? <React.Fragment></React.Fragment> : <View role="players" prevComponent={this.props.prevComponent} setPrevComponent={this.props.setPrevComponent} redirectToAnyPath={this.props.redirectToAnyPath} />}</React.Fragment>;
    }
}
