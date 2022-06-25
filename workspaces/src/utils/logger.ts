class Logger {
    static info(toLog: any, prefix?: string) {
        console.info("[INFO] " + (prefix != undefined ? prefix + " " : "")  + toLog)
    }

    static error(toLog: any, prefix?: string) {
        console.info("[ERROR] " + (prefix != undefined ? prefix + " " : "") + toLog)
    }
}
export default Logger;
