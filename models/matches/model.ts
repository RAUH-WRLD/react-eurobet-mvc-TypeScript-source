import {firebase} from "../../database";
const getMatchesDataToModel = (callback: any) =>
    firebase
        .database()
        .ref("/matches/")
        .on("value", (snapshot: any) => callback(snapshot.val()));
export default getMatchesDataToModel;
