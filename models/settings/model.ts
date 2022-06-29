import {firebase} from "../../database";
const getSettingsDataToModel = (callback: any) =>
    firebase
        .database()
        .ref("/settings/")
        .on("value", (snapshot: any) => callback(snapshot.val()));
export default getSettingsDataToModel;
