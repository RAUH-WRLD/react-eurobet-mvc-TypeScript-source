import {firebase} from "../../database";
const getAuthorizationDataToModel = (callback: any) =>
    firebase
        .database()
        .ref("/authorization/")
        .on("value", (snapshot: any) => callback(snapshot.val()));
export default getAuthorizationDataToModel;
