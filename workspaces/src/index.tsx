import JsonParser from "./utils/json-parser";
import Logger from "./utils/logger";
import {List, ActionPanel} from "@raycast/api";
import {CreateAppAction} from "./components";
import CreateAppHandler from "./components/app/create/handler";
import State from "./components/State";
import {useState} from "react";
import Workspace from "./entities/workspace";


const CONFIG_FILE = "assets/config.json"

export default function Command() {
    Logger.info("Parsing JSON Configuration")
    const [config, setConfig] = useState<State>(State.import(CONFIG_FILE))
    Logger.info(config, "configuration :")
    if (config == undefined) {
        setConfig(new State([]))
    }

    Logger.info("Writing JSON Configuration")
    //JsonParser.writeJSONConfig(CONFIG_FILE, config)
    return buildUI(config)
}

function buildUI(config: State) {

    return (
        <List>
        {config.workspaces.map((workspace:Workspace, index) => (
            <List.Item key={index} title={workspace.name}/>
        ))}
        </List>
    )
}
