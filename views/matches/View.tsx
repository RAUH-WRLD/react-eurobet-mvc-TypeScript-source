import React from "react";
import Head from "next/head";
import Router from "next/router";
import getMatchesDataToModel from "../../models/matches/model";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import Match from "../../components/matches/Match";
interface Props {
    role: string;
    chooseGame: (game: any) => void;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
}
export default class View extends React.Component<Props> {
    state = {
        model: {},
        role: this.props.role,
    };
    exit = () => {
        Router.push(this.props.prevComponent);
        this.props.setPrevComponent("/matches");
    };
    search = () => alert((this.state.model as any).search_placeholder);
    redirectToPlayers = () => this.props.redirectToAnyPath("/matches", "/players");
    redirectToFavorites = () => this.props.redirectToAnyPath("/matches", "/favorites");
    redirectToSettings = () => this.props.redirectToAnyPath("/matches", "/settings");
    componentDidMount() {
        const model = (model: any) => this.setState({model});
        getMatchesDataToModel(model);
    }
    render() {
        const model = this.state.model as any;
        const date = new Date().toISOString().substr(0, 19);
        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const dayWithTime = date.split("-")[2];
        const day = dayWithTime.split("T")[0];
        return (
            <React.Fragment>
                {Object.keys(model).length === 0 ? null : (
                    <Head>
                        <title>{model.title}</title>
                    </Head>
                )}
                {Object.keys(model).length === 0 ? null : (
                    <React.Fragment>
                        <Header data={model} role={this.state.role} callbacks={[this.exit, this.search]} />
                        <main className={`${this.state.role}__body body`}>
                            <div className={`${this.state.role}__body_main body__main`}>
                                {model.body.matches.map((match: string, index: number) => {
                                    return (
                                        <React.Fragment key={`${Math.random()}-${index}`}>
                                            <div className={`${this.state.role}__body_main_info body__main_info`}>
                                                <span className={`${this.state.role}__body_main_info_inner body__main_info_inner`}>
                                                    {match}
                                                    {` ${parseInt(day) + index}.${month}.${year}`}
                                                </span>
                                                <span className={`${this.state.role}__body_main_info_inner body__main_info_inner`}>{model.body.round}</span>
                                            </div>
                                            {index === 0 ? (
                                                <React.Fragment>
                                                    {model.games.map((game: any, _index: number) => {
                                                        return _index < 3 ? (
                                                            <a
                                                                key={`${Math.random()}-${_index}`}
                                                                className="matches__body_main_button body__main_button"
                                                                onClick={() => {
                                                                    this.props.setPrevComponent("/matches");
                                                                    this.props.chooseGame(model.games[_index]);
                                                                }}
                                                            >
                                                                <Match game={model.games[_index]} />
                                                            </a>
                                                        ) : null;
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                            {index === 1 ? (
                                                <React.Fragment>
                                                    {model.games.map((game: any, _index: number) => {
                                                        return _index >= 3 && _index < 6 ? (
                                                            <a
                                                                key={`${Math.random()}-${_index}`}
                                                                className="matches__body_main_button body__main_button"
                                                                onClick={() => {
                                                                    this.props.setPrevComponent("/matches");
                                                                    this.props.chooseGame(model.games[_index]);
                                                                }}
                                                            >
                                                                <Match game={model.games[_index]} />
                                                            </a>
                                                        ) : null;
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                            {index === 2 ? (
                                                <React.Fragment>
                                                    {model.games.map((game: any, _index: number) => {
                                                        return _index >= 6 ? (
                                                            <a
                                                                key={`${Math.random()}-${_index}`}
                                                                className="matches__body_main_button body__main_button"
                                                                onClick={() => {
                                                                    this.props.setPrevComponent("/matches");
                                                                    this.props.chooseGame(model.games[_index]);
                                                                }}
                                                            >
                                                                <Match game={model.games[_index]} />
                                                            </a>
                                                        ) : null;
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </main>
                        <Footer data={model} role={this.state.role} callbacks={[null, this.redirectToPlayers, this.redirectToFavorites, this.redirectToSettings]} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
