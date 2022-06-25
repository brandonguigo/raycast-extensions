import JsonParser from "./utils/json-parser";
import Logger from "./utils/logger";

//DONE(conf): config persistance in JSON file
//DONE(log): configure logger
//DONE(conf): reload config each time the command is run
//DROP(conf): manual reload
//TODO(app): create app and persist it
//TODO(app): edit app and persist it
//TODO(app): delete app and persist
//TODO(workspace): create workspace and persist it
//TODO(workspace): edit workspace and persist it
//TODO(workspace): delete workspace and persist

const CONFIG_PATH = "../config.json"
export default function Command() {
    Logger.info("Parsing JSON Configuration")
    const config = JsonParser.parseJSONConfig(CONFIG_PATH)
    Logger.info(config, "configuration :")

    Logger.info("Writing JSON Configuration")
    JsonParser.writeJSONConfig(CONFIG_PATH, config)
    return
}
