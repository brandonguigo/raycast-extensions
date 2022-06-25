import fs from "fs";
import Logger from "./logger";

class JsonParser {
    static parseJSONConfig(filename: string) {
        try {
            const rawConf = fs.readFileSync('config.json', 'utf8')
            const conf = JSON.parse(rawConf)
            return conf
        } catch (e: any) {
            Logger.error(e.message)
            return null
        }

    }

    static writeJSONConfig(filename: string, content: object) {
        try {
            const jsonString = JSON.stringify(content)
            fs.writeFileSync(filename, jsonString, 'utf8')
        } catch (e: any) {
            Logger.error(e.message)
            return null
        }
    }
}

export default JsonParser;
