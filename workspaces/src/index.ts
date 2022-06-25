import * as fs from "fs";
import JsonParser from "./utils/json-parser";

//DONE(conf): config persistance in JSON file
//DONE(log): configure logger
//TODO(conf): reload config every 10 minutes
//TODO(conf): manual reload
//TODO(app): create app and persist it
//TODO(app): edit app and persist it
//TODO(app): delete app and persist
//TODO(workspace): create workspace and persist it
//TODO(workspace): edit workspace and persist it
//TODO(workspace): delete workspace and persist

const CONFIG_PATH = "../config.json"
export default function Command() {
    console.info("Parsing JSON Configuration")
    const config = JsonParser.parseJSONConfig(CONFIG_PATH)
    console.info(config)

    console.debug("TOTO " + process.env.LOG_LEVEL)


    console.info("Writing JSON Configuration")
    JsonParser.writeJSONConfig(CONFIG_PATH, config)
    return
}
