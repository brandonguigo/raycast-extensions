import * as fs from "fs";
import JsonParser from "./utils/json-parser";

//TODO(conf): config persistance in JSON file
//TODO(conf): reload config every 10 minutes
//TODO(conf): manual reload
//TODO(app): create app and persist it
//TODO(app): edit app and persist it
//TODO(app): delete app and persist
//TODO(workspace): create workspace and persist it
//TODO(workspace): edit workspace and persist it
//TODO(workspace): delete workspace and persist

export default function Command() {
    const conf = JsonParser.parseJSONConfig("../config.json")
    console.log(conf)


    return
}
