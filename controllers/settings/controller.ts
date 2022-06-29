import {firebase} from "../../database";
export default class Controller {
    static delete(account: any, logout: () => void) {
        const check = (data: any) => {
            const accounts = data.accounts;
            const newAccounts = accounts.filter((el: {email: string; password: string}) => `${el.email}` !== `${account.email}`);
            firebase
                .database()
                .ref("/authorization/accounts/")
                .set([...newAccounts]);
            logout();
        };
        firebase
            .database()
            .ref("/authorization/")
            .once("value", (snapshot: any) => check(snapshot.val()));
    }
}
