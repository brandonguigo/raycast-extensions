import JsonParser from "./utils/json-parser";
import Logger from "./utils/logger";
import {List, ActionPanel} from "@raycast/api";
import {CreateAppAction} from "./components";
import CreateAppHandler from "./components/app/create/handler";
import State from "./components/State";
import App from "./entities/app";
import Workspace from "./entities/workspace";

const CONFIG_FILE = "assets/config.json"
export let config = State.import(CONFIG_FILE)

export default function Command() {
    Logger.info("Parsing JSON Configuration")
    //let config = JsonParser.parseJSONConfig(CONFIG_PATH)
    Logger.info(config, "configuration :")
    Logger.info(__filename)
    if (config == undefined) {
        config = new State([])
    }


    Logger.info("Writing JSON Configuration")
    JsonParser.writeJSONConfig(CONFIG_FILE, config)
    return
}

function buildUI(apps: App[], workspaces: Workspace[]) {
    return (
        <List
            actions={
            <ActionPanel>
                <CreateAppAction onCreate={CreateAppHandler.handleCreate}/>
            </ActionPanel>
            }>
        {workspaces.map((workspace, index) => (
            <List.Item key={index} title={workspace.name} />
        ))}
        </List>
    )
}
