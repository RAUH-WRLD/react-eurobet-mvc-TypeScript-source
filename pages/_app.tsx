import React from "react";
import Head from "next/head";
import App from "next/app";
import Router from "next/router";
import "../sass/main.scss";
export default class MyApp extends App {
    state = {
        didLogin: false,
        didRegister: false,
        didReset: false,
        game: {},
        account: null,
        prevComponent: "/",
    };
    getCondition = () => {
        const {Component} = this.props;
        const restrictedComponents = ["Matches()", "Error()", "Highlights()", "Players()", "Favorites()", "Settings()"];
        return restrictedComponents.includes(`${Component}`.split(" ")[1]);
    };
    check = () => (this.getCondition() ? Router.push("/authorization") : false);
    forceReboot = () => Router.push("/authorization");
    setLoginStatus = (status: boolean, account: any) => {
        this.setState({didLogin: status});
        this.setState({account});
        return status ? this.redirectToStart() : false;
    };
    setRegistrationStatus = (status: boolean) => {
        this.setState({didRegister: status});
        setTimeout(() => this.setState({didRegister: false}));
        return status ? Router.push("/") : false;
    };
    setResetStatus = (status: boolean) => {
        this.setState({didReset: status});
        setTimeout(() => this.setState({didReset: false}));
        return status ? Router.push("/") : false;
    };
    redirectToStart = () => {
        this.setPrevComponent("/");
        Router.push("/matches");
    };
    redirectToHighligts = () => Router.push("/highlights");
    chooseGame = (game: any) => {
        this.setState({game});
        return this.redirectToHighligts();
    };
    redirectToAnyPath = (from: string, to: string) => {
        this.setPrevComponent(from);
        Router.push(to);
    };
    setPrevComponent = (prevComponent: string) => this.setState({prevComponent});
    componentDidMount() {
        this.check();
    }
    render() {
        const {Component, pageProps} = this.props;
        return (
            <React.Fragment>
                <Head>
                    <meta name="viewport" content="width=750,user-scalable=no" />
                </Head>
                <Component
                    {...pageProps}
                    forceReboot={this.forceReboot}
                    didLogin={this.state.didLogin}
                    setLoginStatus={this.setLoginStatus}
                    didRegister={this.state.didRegister}
                    setRegistrationStatus={this.setRegistrationStatus}
                    didReset={this.state.didReset}
                    setResetStatus={this.setResetStatus}
                    game={this.state.game}
                    chooseGame={this.chooseGame}
                    setPrevComponent={this.setPrevComponent}
                    prevComponent={this.state.prevComponent}
                    redirectToAnyPath={this.redirectToAnyPath}
                    account={this.state.account}
                />
            </React.Fragment>
        );
    }
}
