import React from "react";
import Head from "next/head";
import Router from "next/router";
import getSettingsDataToModel from "../../models/settings/model";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import Controller from "../../controllers/settings/controller";
interface Props {
    role: string;
    prevComponent: string;
    setPrevComponent: (prevComponent: string) => void;
    redirectToAnyPath: (from: string, to: string) => void;
    account: any;
    logout: () => void;
}
export default class View extends React.Component<Props> {
    state = {
        model: {},
        role: this.props.role,
    };
    exit = () => {
        Router.push(this.props.prevComponent);
        this.props.setPrevComponent("/settings");
    };
    search = () => alert((this.state.model as any).search_placeholder);
    redirectToMatches = () => this.props.redirectToAnyPath("/settings", "/matches");
    redirectToFavorites = () => this.props.redirectToAnyPath("/settings", "/favorites");
    redirectToPlayers = () => this.props.redirectToAnyPath("/settings", "/players");
    componentDidMount() {
        const model = (model: any) => this.setState({model});
        getSettingsDataToModel(model);
    }
    render() {
        const model = this.state.model as any;
        const settingsFunctions = [Controller.delete, this.props.logout];
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
                                <div className="body__main_settings">
                                    {model.body.buttons.map((button: {name: string}, index: number) => {
                                        return (
                                            <button className="body__main_settings_button" key={`${Math.random()}-${index}`} onClick={() => settingsFunctions[index](this.props.account, this.props.logout)}>
                                                {button.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </main>
                        <Footer data={model} role={this.state.role} callbacks={[this.redirectToMatches, this.redirectToPlayers, this.redirectToFavorites, null]} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
