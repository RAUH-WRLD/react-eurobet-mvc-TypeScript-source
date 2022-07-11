import React from "react";
interface Props {
    forceReboot: () => void;
}
export default class Custom404 extends React.Component<Props> {
    componentDidMount() {
        this.props.forceReboot();
    }
    componentDidUpdate() {
        this.props.forceReboot();
    }
    componentWillUnmount() {
        this.props.forceReboot();
    }
    render() {
        return <React.Fragment></React.Fragment>;
    }
}
