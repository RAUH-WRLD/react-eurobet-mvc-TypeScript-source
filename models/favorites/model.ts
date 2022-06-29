import {firebase} from "../../database";
const getFavoritesDataToModel = (callback: any) =>
    firebase
        .database()
        .ref("/favorites/")
        .on("value", (snapshot: any) => callback(snapshot.val()));
export default getFavoritesDataToModel;
