import fs from "fs";

class JsonParser {
    static parseJSONConfig(filename: string) {
        const rawConf = fs.readFileSync('config.json', 'utf8')
        const conf = JSON.parse(rawConf)
        return conf
    }
}

export default JsonParser;
