import React from "react";
import View from "../views/highlights/View";
interface Props {
    didLogin: boolean;
    forceReboot: () => void;
    game: any;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
}
export default class Highlights extends React.Component<Props> {
    componentDidMount() {
        if (!this.props.didLogin) this.props.forceReboot();
    }
    render() {
        return <React.Fragment>{!this.props.didLogin ? <React.Fragment></React.Fragment> : <View role="highlights" game={this.props.game} prevComponent={this.props.prevComponent} setPrevComponent={this.props.setPrevComponent} redirectToAnyPath={this.props.redirectToAnyPath} />}</React.Fragment>;
    }
}
