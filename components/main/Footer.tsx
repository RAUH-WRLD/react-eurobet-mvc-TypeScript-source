import React from "react";
interface Props {
    data: any;
    role: string;
    callbacks: Array<any>;
}
export default class Footer extends React.Component<Props> {
    render() {
        return (
            <footer className={`${this.props.role}__footer footer`}>
                {this.props.data.footer.buttons.map((button: any, index: number) => {
                    return (
                        <button className={`${this.props.role}__footer_button footer__button not-selectable`} disabled={button.isChoosed} key={`${Math.random()}-${index}`} onClick={() => this.props.callbacks[index]()}>
                            {
                                <React.Fragment>
                                    <img className={`${this.props.role}__footer_button_icon footer__button_icon not-selectable`} src={button.icon} alt={button.name} />
                                    <p className={`${this.props.role}__footer_button_inner footer__button_inner`}>{button.name}</p>
                                </React.Fragment>
                            }
                        </button>
                    );
                })}
            </footer>
        );
    }
}
