class Utils {
    static generateUID() {
        return Date.now()
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
