import React from "react";
import Head from "next/head";
import getAuthorizationDataToModel from "../../models/authorization/model";
import Form from "../../components/authorization/Form";
import Controller from "../../controllers/authorization/controller";
interface Props {
    role: string;
    didLogin: boolean;
    setLoginStatus: (status: boolean, account: any) => void;
    didRegister: boolean;
    setRegistrationStatus: (status: boolean) => void;
    didReset: boolean;
    setResetStatus: (status: boolean) => void;
}
export default class View extends React.Component<Props> {
    state = {
        model: {},
        role: this.props.role,
    };
    componentDidMount() {
        const model = (model: any) => this.setState({model});
        getAuthorizationDataToModel(model);
    }
    setRole = (role: string) => this.setState({role});
    render() {
        const model = this.state.model as any;
        return (
            <React.Fragment>
                {Object.keys(model).length === 0 ? null : <Head>{this.state.role === "reset" ? <title>{model.reset.title}</title> : <React.Fragment>{this.state.role === "login" ? <title>{model.login.title}</title> : <title>{model.registration.title}</title>}</React.Fragment>}</Head>}
                {Object.keys(model).length === 0 ? null : (
                    <main className={`${this.state.role} authorization`}>
                        <div className={`${this.state.role}__main authorization__main`}>
                            <div className={`${this.state.role}__main_logo authorization__main_logo not-selectable`}>
                                <img src={`/${model.logo}`} alt={this.state.role} className={`${this.state.role}__main_logo_img authorization__main_logo_img not-selectable`} />
                                <span className={`${this.state.role}__main_logo_span authorization__main_logo_span not-selectable`}>{model.slogan}</span>
                            </div>
                            {this.state.role === "reset" ? (
                                <Form data={model.reset} setRole={this.setRole} role={"reset"} callback={Controller.reset} didLogin={this.props.didLogin} setLoginStatus={this.props.setLoginStatus} didRegister={this.props.didRegister} setRegistrationStatus={this.props.setRegistrationStatus} didReset={this.props.didReset} setResetStatus={this.props.setResetStatus} />
                            ) : (
                                <React.Fragment>
                                    {this.state.role === "login" ? (
                                        <Form data={model.login} setRole={this.setRole} role={"login"} callback={Controller.login} didLogin={this.props.didLogin} setLoginStatus={this.props.setLoginStatus} didRegister={this.props.didRegister} setRegistrationStatus={this.props.setRegistrationStatus} didReset={this.props.didReset} setResetStatus={this.props.setResetStatus} />
                                    ) : (
                                        <Form data={model.registration} setRole={this.setRole} role={"registration"} callback={Controller.registration} didLogin={this.props.didLogin} setLoginStatus={this.props.setLoginStatus} didRegister={this.props.didRegister} setRegistrationStatus={this.props.setRegistrationStatus} didReset={this.props.didReset} setResetStatus={this.props.setResetStatus} />
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </main>
                )}
            </React.Fragment>
        );
    }
}
