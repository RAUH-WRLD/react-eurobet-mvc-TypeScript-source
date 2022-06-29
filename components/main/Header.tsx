import React from "react";
interface Props {
    data: any;
    role: string;
    callbacks: Array<() => void>;
}
export default class Header extends React.Component<Props> {
    render() {
        return (
            <header className={`${this.props.role}__header header`}>
                <div className={`${this.props.role}__header_action header__action`}>
                    <button className={`${this.props.role}__header_action_button header__action_button not-selectable`} onClick={() => this.props.callbacks[0]()}>
                        <img src={this.props.data.header.actions[0]} alt="Action" className="header__action_button_icon not-selectable" />
                    </button>
                </div>
                <div className={`${this.props.role}__header_title header__title`}>
                    <span className={`${this.props.role}__header_title_inner header__title_inner`}>{this.props.data.header.title}</span>
                </div>
                <div className={`${this.props.role}__header_action header__action`}>
                    <button className={`${this.props.role}__header_action_button header__action_button not-selectable`} onClick={() => this.props.callbacks[1]()}>
                        <img src={this.props.data.header.actions[1]} alt="Action" className="header__action_button_icon not-selectable" />
                    </button>
                </div>
            </header>
        );
    }
}
