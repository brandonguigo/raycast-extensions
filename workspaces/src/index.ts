import JsonParser from "./utils/json-parser";
import Logger from "./utils/logger";

const CONFIG_PATH = "../config.json"
export default function Command() {
    Logger.info("Parsing JSON Configuration")
    const config = JsonParser.parseJSONConfig(CONFIG_PATH)
    Logger.info(config, "configuration :")

    Logger.info("Writing JSON Configuration")
    JsonParser.writeJSONConfig(CONFIG_PATH, config)
    return
}
