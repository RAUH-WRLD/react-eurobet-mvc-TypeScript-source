import {firebase} from "../../database";
const getPlayersDataToModel = (callback: any) =>
    firebase
        .database()
        .ref("/players/")
        .on("value", (snapshot: any) => callback(snapshot.val()));
export default getPlayersDataToModel;
