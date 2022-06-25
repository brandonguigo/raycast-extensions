import configJson from '../../assets/config.json';
import {nanoid} from "nanoid";
import Utils from "../utils/utils";

class App {
    public id: number;
    public name = "";
    public command = "";

    constructor(id: number, name: string, command: string) {
        this.id = id;
        this.name = name;
        this.command = command;
    }

    public export() {
        return {
            "id": this.id,
            "name": this.name,
            "command": this.command
        }
    }

    static import(payload: typeof configJson.apps[1]) {
        return new App(
            payload.id,
            payload.name,
            payload.command
        )
    }

    public toString() {
        return JSON.stringify(this.export())
    }
}

export default App;
