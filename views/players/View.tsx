import React from "react";
import Head from "next/head";
import Router from "next/router";
import getPlayersDataToModel from "../../models/players/model";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
interface Props {
    role: string;
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
        this.props.setPrevComponent("/players");
    };
    search = () => alert((this.state.model as any).search_placeholder);
    redirectToMatches = () => this.props.redirectToAnyPath("/players", "/matches");
    redirectToFavorites = () => this.props.redirectToAnyPath("/players", "/favorites");
    redirectToSettings = () => this.props.redirectToAnyPath("/players", "/settings");
    componentDidMount() {
        const model = (model: any) => this.setState({model});
        getPlayersDataToModel(model);
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
                        <Header data={model} role={this.state.role} callbacks={[this.exit, this.search]} />
                        <main className={`${this.state.role}__body body`}>
                            <div className={`${this.state.role}__body_main body__main`}>
                                <p className="body__main_no">{model.body.error}</p>
                            </div>
                        </main>
                        <Footer data={model} role={this.state.role} callbacks={[this.redirectToMatches, null, this.redirectToFavorites, this.redirectToSettings]} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
