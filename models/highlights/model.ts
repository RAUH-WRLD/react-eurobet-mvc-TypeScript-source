import {firebase} from "../../database";
const getHighlightsDataToModel = (callback: any) =>
    firebase
        .database()
        .ref("/highlights/")
        .on("value", (snapshot: any) => callback(snapshot.val()));
export default getHighlightsDataToModel;
