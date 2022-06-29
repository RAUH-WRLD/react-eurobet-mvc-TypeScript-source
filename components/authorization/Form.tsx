import React from "react";
interface Props {
    setRole: (role: string) => void;
    data: any;
    role: string;
    callback: (
        email: string,
        password: string,
        setLoginStatus: (status: boolean, account: any) => void,
        setDisableStatus: (status: boolean, data: any) => void,
        setRegistrationStatus: (status: boolean) => void,
        setResetStatus: (status: boolean) => void,
        email_text: string,
        setExpectedCode: (code: string) => void,
        expectedCode: any,
        setChangePasswordStatus: (status: boolean) => void,
        clearVerificationCode: () => void,
        setReset: (status: boolean) => void,
        newPassword: string,
    ) => void;
    didLogin: boolean;
    setLoginStatus: (status: boolean, account: any) => void;
    didRegister: boolean;
    setRegistrationStatus: (status: boolean) => void;
    didReset: boolean;
    setResetStatus: (status: boolean) => void;
}
export default class Form extends React.Component<Props> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    private codeRef: React.RefObject<HTMLInputElement>;
    private newPasswordRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.codeRef = React.createRef();
        this.newPasswordRef = React.createRef();
    }
    state = {
        isDisabled: true,
        forceDisable: false,
        resetDisable: true,
        shouldCheckCode: false,
        checkCodeDisable: true,
        expectedCode: null,
        canChangePassword: false,
    };
    processForm = (disable: boolean) => {
        const email = this.emailRef.current;
        const password = this.passwordRef.current;
        if (email && password) {
            if (email.value.length >= 3 && email.value.length <= 70 && password.value.length >= 3 && password.value.length <= 70) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        } else return false;
    };
    processReset = (disable: boolean) => {
        const email = this.emailRef.current;
        const code = this.codeRef.current;
        const newPassword = this.newPasswordRef.current;
        if (email) {
            if (email.value.length >= 3 && email.value.length <= 70) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        }
        if (this.state.shouldCheckCode && code) {
            if (code.value.length === 6) {
                this.setState({shouldCheckCode: !disable});
                this.setState({resetDisable: disable});
            } else this.setState({shouldCheckCode: disable});
        }
        if (this.state.canChangePassword && newPassword) {
            if (newPassword.value.length >= 3 && newPassword.value.length <= 70) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        }
    };
    setExpectedCode = (code: string) => this.setState({expectedCode: code});
    clearPasswordInput = () => setTimeout(() => ((this.newPasswordRef.current as any).value = ""), 0);
    setChangePasswordStatus = (status: boolean) => {
        this.setState({canChangePassword: status});
        if (status) {
            this.setState({resetDisable: !status});
            this.clearPasswordInput();
        }
    };
    setReset = (status: boolean) => this.setState({resetDisable: status});
    clearVerificationCode = () => {
        this.setState({resetDisable: false});
        this.setState({shouldCheckCode: true});
        (this.codeRef.current as any).value = "";
    };
    setDisableStatus = (status: boolean, data: any) => {
        this.setState({isDisabled: status});
        this.setState({forceDisable: status});
        return data.data ? this.setState({shouldCheckCode: true}) : this.setState({shouldCheckCode: false});
    };
    render() {
        return (
            <React.Fragment>
                <form
                    className={`${this.props.role}__main_form authorization__main_form`}
                    onChange={() => (this.props.role === "login" || this.props.role === "registration" ? this.processForm(true) : this.processReset(true))}
                    onSubmit={(event: any) => {
                        event.preventDefault();
                        this.setDisableStatus(true, {});
                        if (this.props.role === "login" || this.props.role === "registration")
                            this.emailRef.current && this.passwordRef.current
                                ? this.props.callback(this.emailRef.current.value, this.passwordRef.current.value, this.props.setLoginStatus, this.setDisableStatus, this.props.setRegistrationStatus, this.props.setResetStatus, "", this.setExpectedCode, this.state.expectedCode, this.setChangePasswordStatus, this.clearVerificationCode, this.setReset, this.newPasswordRef.current as any)
                                : null;
                        else {
                            if (this.emailRef.current && this.codeRef.current) {
                                this.props.callback(this.emailRef.current.value, this.codeRef.current.value, this.props.setLoginStatus, this.setDisableStatus, this.props.setRegistrationStatus, this.props.setResetStatus, this.props.data.text, this.setExpectedCode, this.state.expectedCode, this.setChangePasswordStatus, this.clearVerificationCode, this.setReset, "");
                            }
                            if (this.emailRef.current && this.newPasswordRef.current) {
                                this.setState({resetDisable: true});
                                this.props.callback(this.emailRef.current.value, "", this.props.setLoginStatus, this.setDisableStatus, this.props.setRegistrationStatus, this.props.setResetStatus, this.props.data.text, this.setExpectedCode, this.state.expectedCode, this.setChangePasswordStatus, this.clearVerificationCode, this.setReset, this.newPasswordRef.current.value);
                            }
                        }
                    }}
                >
                    {this.props.role === "login" || this.props.role === "registration" ? (
                        <React.Fragment>
                            <input type="email" placeholder={this.props.data.inputs[0]} ref={this.emailRef} className={`${this.props.role}__main_form_input authorization__main_form_input`} disabled={this.state.forceDisable} />
                            <input type="password" placeholder={this.props.data.inputs[1]} ref={this.passwordRef} className={`${this.props.role}__main_form_input authorization__main_form_input`} disabled={this.state.forceDisable} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {this.state.shouldCheckCode ? (
                                <React.Fragment>
                                    <input type="email" placeholder={this.props.data.inputs[0]} ref={this.emailRef} className={`${this.props.role}__main_form_input authorization__main_form_input reset_input`} disabled={true} />
                                    <input type="text" placeholder={this.props.data.inputs[1]} ref={this.codeRef} className={`${this.props.role}__main_form_input authorization__main_form_input reset_input`} disabled={false} />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <input type="email" placeholder={this.props.data.inputs[0]} ref={this.emailRef} className={`${this.props.role}__main_form_input authorization__main_form_input reset_input`} disabled={this.state.forceDisable} />
                                    {this.state.canChangePassword ? (
                                        <input type="text" placeholder={this.props.data.inputs[2]} ref={this.newPasswordRef} className={`${this.props.role}__main_form_input authorization__main_form_input reset_input`} disabled={this.state.resetDisable} />
                                    ) : (
                                        <input type="text" placeholder={this.props.data.inputs[1]} ref={this.codeRef} className={`${this.props.role}__main_form_input authorization__main_form_input reset_input`} disabled={this.state.resetDisable} />
                                    )}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                    <button type="submit" disabled={this.state.shouldCheckCode ? this.state.checkCodeDisable : this.state.isDisabled} className={`${this.props.role}__main_form_submit authorization__main_form_submit`}>
                        {this.state.canChangePassword ? <React.Fragment>{this.props.data.button_extra_pass}</React.Fragment> : <React.Fragment>{this.state.shouldCheckCode || (this.codeRef.current?.value.length === 6 && !this.state.shouldCheckCode) ? this.props.data.button_extra : this.props.data.button}</React.Fragment>}
                    </button>
                </form>
                <button className={`${this.props.role}__main_action authorization__main_action`} onClick={() => this.props.setRole(this.props.data.action_role)} disabled={this.state.forceDisable}>
                    {this.props.data.action}
                </button>
                {this.props.role === "login" || this.props.role === "registration" ? (
                    <button className={`${this.props.role}__main_reset authorization__main_reset`} onClick={() => this.props.setRole("reset")} disabled={this.state.forceDisable}>
                        {this.props.data.reset}
                    </button>
                ) : (
                    <button className={`${this.props.role}__main_action authorization__main_action`} onClick={() => this.props.setRole(this.props.data.action_role_extra)} disabled={this.state.forceDisable}>
                        {this.props.data.action_extra}
                    </button>
                )}
            </React.Fragment>
        );
    }
}
