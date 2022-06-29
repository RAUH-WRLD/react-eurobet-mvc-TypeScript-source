import React from "react";
import Head from "next/head";
import Router from "next/router";
import getHighlightsDataToModel from "../../models/highlights/model";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import Highlights from "../../components/highlights/Highlights";
interface Props {
    role: string;
    game: any;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
}
export default class View extends React.Component<Props> {
    state = {
        model: {},
        role: this.props.role,
        choosedItem: "Highlights",
    };
    exit = () => {
        Router.push(this.props.prevComponent);
        this.props.setPrevComponent("/highlights");
    };
    setFavorite = () => alert((this.state.model as any).favorite_placeholder);
    getMoment = () => {
        const moment = (this.state.model as any).body.highlights_moments.filter((moment: any) => moment.id === this.props.game.id && moment.status === this.props.game.status);
        return moment[0];
    };
    redirectToPlayers = () => this.props.redirectToAnyPath("/matches", "/players");
    redirectToFavorites = () => this.props.redirectToAnyPath("/matches", "/favorites");
    redirectToSettings = () => this.props.redirectToAnyPath("/matches", "/settings");
    componentDidMount() {
        const model = (model: any) => this.setState({model});
        getHighlightsDataToModel(model);
    }
    render() {
        const model = this.state.model as any;
        return (
            <React.Fragment>
                {Object.keys(model).length === 0 ? null : (
                    <Head>
                        <title>{model.title}</title>
                    </Head>
                )}
                {Object.keys(model).length === 0 ? null : (
                    <React.Fragment>
                        <Header data={model} role={this.state.role} callbacks={[this.exit, this.setFavorite]} />
                        <div className={`${this.state.role}__body`}>
                            <div className={`${this.state.role}__body_info body__info`}>
                                <div className={`${this.state.role}__body_info_player body__info_player`}>
                                    <img className={`${this.state.role}__body_info_player_icon body__info_player_icon`} src={this.props.game.player_1.country} alt={this.props.game.player_1.name} />
                                    <span className={`${this.state.role}__body_info_player_name body__info_player_name`}>{this.props.game.player_1.name}</span>
                                </div>
                                <div className={`${this.state.role}__body_info_result body__info_result`}>
                                    <span className={`${this.state.role}__body_info_result_round body__info_result_round`}>{model.round}</span>
                                    <span className={`${this.state.role}__body_info_result_item body__info_result_item`}>{this.props.game.time ? `${this.props.game.time}` : `${this.props.game.player_1.score} - ${this.props.game.player_2.score}`}</span>
                                    <span className={`${this.state.role}__body_info_result_status body__info_result_status`}>{this.props.game.status}</span>
                                </div>
                                <div className={`${this.state.role}__body_info_player body__info_player`}>
                                    <img className={`${this.state.role}__body_info_player_icon body__info_player_icon`} src={this.props.game.player_2.country} alt={this.props.game.player_2.name} />
                                    <span className={`${this.state.role}__body_info_player_name body__info_player_name`}>{this.props.game.player_2.name}</span>
                                </div>
                            </div>
                        </div>
                        <main className={`${this.state.role}__body body highlights`}>
                            <div className={`${this.state.role}__body_main body__main`}>
                                <div className={`${this.state.role}__body_main_menu body__main_menu`}>
                                    {model.body.menu.map((menuItem: {isChoosed: boolean; name: string}, index: number) => {
                                        return (
                                            <button className={`${this.state.role}__body_main_menu_item body__main_menu_item`} disabled={this.state.choosedItem === menuItem.name ? true : false} key={`${Math.random()}-${index}`} onClick={() => this.setState({choosedItem: menuItem.name})}>
                                                {menuItem.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                {this.state.choosedItem === "Highlights" ? <Highlights moment={this.getMoment()} extra={[model.body.extra[0], model.body.extra[1]]} /> : <p className="body__main_no">{`NO ${this.state.choosedItem.toUpperCase()}`}</p>}
                            </div>
                        </main>
                        <Footer data={model} role={this.state.role} callbacks={[null, this.redirectToPlayers, this.redirectToFavorites, this.redirectToSettings]} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
