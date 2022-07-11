import React from "react";
import View from "../views/matches/View";
interface Props {
    didLogin: boolean;
    forceReboot: () => void;
    chooseGame: (game: any) => void;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
}
export default class Matches extends React.Component<Props> {
    componentDidMount() {
        if (!this.props.didLogin) this.props.forceReboot();
    }
    render() {
        return <React.Fragment>{!this.props.didLogin ? <React.Fragment></React.Fragment> : <View role="matches" chooseGame={this.props.chooseGame} prevComponent={this.props.prevComponent} setPrevComponent={this.props.setPrevComponent} redirectToAnyPath={this.props.redirectToAnyPath} />}</React.Fragment>;
    }
}
