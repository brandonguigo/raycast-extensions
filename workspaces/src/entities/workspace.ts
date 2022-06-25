import App from "./app";

class Workspace {
    public id: number;
    public name = "";
    public path = "";
    public apps: App[] = [];


    constructor(id: number, name: string, path: string, apps: App[]) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.apps = apps;
    }

    public export() {
        return {
            "id": this.id,
            "name": this.name,
            "path": this.path,
            "apps": this.apps.map((val, _) => val.export()),
        }
    }
}

export default Workspace;
