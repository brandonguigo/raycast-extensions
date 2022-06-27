import {nanoid} from "nanoid";

class Utils {
    static generateUID() {
        //return Date.now()
        return nanoid()
    }

    static getDefaultState() {
        return {
            apps: [],
            workspaces: [],
            searchText: ""
        }
    }
}

export default Utils;
