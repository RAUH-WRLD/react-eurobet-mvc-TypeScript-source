import {firebase} from "../../database";
import axios from "axios";
export default class Controller {
    static reset(
        email: string,
        enteredCode: string,
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
    ) {
        if (expectedCode === null) {
            const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
            const codeArr: Array<number> = [];
            for (let index = 0; index < 6; index++) {
                codeArr.push(getRandomNum(0, 9));
            }
            const code = codeArr.join("");
            const text = email_text.replace(/{email}/g, `${email}`).replace(/{code}/g, `${code}`);
            const data = {
                name: email,
                email: email,
                text: text,
                subject: email,
            };
            const processReset = (accounts: Array<{email: string; password: any}>, fail: string, success: string, req_fail: string) => {
                const match = accounts.filter((account: {email: string; password: string}) => `${email}` === `${account.email}`);
                if (match.length > 0) {
                    axios
                        .post("/api/sendMail", data)
                        .then((res) => {
                            alert(success);
                            setExpectedCode(`${code}`);
                            setDisableStatus(true, res);
                            setReset(true);
                        })
                        .catch((err) => {
                            alert(fail);
                            setDisableStatus(false, {});
                            console.log(err);
                        });
                }
                if (match.length === 0) {
                    alert(`${fail} ${req_fail}`);
                    setDisableStatus(false, {});
                }
            };
            firebase
                .database()
                .ref("/authorization/")
                .once("value", (snapshot: any) => processReset(snapshot.val().accounts, snapshot.val().reset.fail, snapshot.val().reset.success, snapshot.val().reset.req_fail));
        } else {
            const processVerification = (accounts: Array<{email: string; password: any}>, fail: string) => {
                if (`${enteredCode}` === `${expectedCode}`) {
                    setChangePasswordStatus(true);
                }
                if (`${enteredCode}` !== `${expectedCode}`) {
                    alert(fail);
                    clearVerificationCode();
                    setChangePasswordStatus(false);
                }
            };
            const processNewPassword = (accounts: Array<{email: string; password: string}>, success: string) => {
                const newAccount = {
                    email,
                    password: newPassword,
                };
                const newAccounts = accounts.filter((el: {email: string; password: string}) => `${newAccount.email}` !== `${el.email}`);
                firebase
                    .database()
                    .ref("/authorization/accounts/")
                    .set([...newAccounts, newAccount]);
                alert(success);
                setResetStatus(true);
            };
            firebase
                .database()
                .ref("/authorization/")
                .once("value", (snapshot: any) => (newPassword.length === 0 ? processVerification(snapshot.val().accounts, snapshot.val().reset.verification_fail) : processNewPassword(snapshot.val().accounts, snapshot.val().reset.success_pass)));
        }
    }
    static login(email: string, password: string, setLoginStatus: (status: boolean, account: any) => void, setDisableStatus: (status: boolean, data: any) => void, setRegistrationStatus: (status: boolean) => void, setResetStatus: (status: boolean) => void, email_text: string, setExpectedCode: (code: string) => void, clearVerificationCode: () => void, setReset: (status: boolean) => void) {
        const userAccount = {
            email,
            password,
        };
        const filter = (accounts: Array<{email: string; password: any}>, fail: string, success: string) => {
            const match = accounts.filter((account: {email: string; password: string}) => `${userAccount.email}` === `${account.email}` && `${userAccount.password}` === `${account.password}`);
            if (match.length > 0) {
                alert(success);
                setDisableStatus(true, {});
                setLoginStatus(true, match[0]);
            }
            if (match.length === 0) {
                alert(fail);
                setDisableStatus(false, {});
                setLoginStatus(false, null);
            }
        };
        firebase
            .database()
            .ref("/authorization/")
            .once("value", (snapshot: any) => filter(snapshot.val().accounts, snapshot.val().login.fail, snapshot.val().login.success));
    }
    static registration(email: string, password: string, setLoginStatus: (status: boolean, account: any) => void, setDisableStatus: (status: boolean, data: any) => void, setRegistrationStatus: (status: boolean) => void, setResetStatus: (status: boolean) => void, email_text: string, setExpectedCode: (code: string) => void, clearVerificationCode: () => void, setReset: (status: boolean) => void) {
        const userAccount = {
            email,
            password,
        };
        const filter = (accounts: Array<{email: string; password: any}>, fail: string, success: string) => {
            const match = accounts.filter((account: {email: string; password: string}) => `${userAccount.email}` === `${account.email}`);
            if (match.length > 0) {
                alert(fail);
                setDisableStatus(false, {});
                setRegistrationStatus(false);
            }
            if (match.length === 0) {
                firebase
                    .database()
                    .ref("/authorization/accounts/")
                    .set([...accounts, userAccount]);
                alert(success);
                setDisableStatus(true, {});
                setRegistrationStatus(true);
            }
        };
        firebase
            .database()
            .ref("/authorization/")
            .once("value", (snapshot: any) => filter(snapshot.val().accounts, snapshot.val().registration.fail, snapshot.val().registration.success));
    }
}
