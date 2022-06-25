import fs from "fs";

class JsonParser {
    static parseJSONConfig(filename: string) {
        try {
            const rawConf = fs.readFileSync('config.json', 'utf8')
            const conf = JSON.parse(rawConf)
            return conf
        } catch (e: any) {
            console.debug(e.message)
            return null
        }

    }

    static writeJSONConfig(filename: string, content: object) {
        try {
            const jsonString = JSON.stringify(content)
            fs.writeFileSync(filename, jsonString, 'utf8')
        } catch (e: any) {
            console.debug(e.message)
            return null
        }
    }
}

export default JsonParser;
