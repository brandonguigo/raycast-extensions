import Logger from "./utils/logger";
import {List, ActionPanel, environment} from "@raycast/api";
import {CreateAppAction} from "./components";
import {useCallback, useEffect, useState} from "react";
import EmptyView from "./components/empty-view";
import {AppInterface} from "./entities/app";
import Utils from "./utils/utils";
import {State} from "./entities/state";
import JsonParser from "./utils/json-parser";


export const CONFIG_FILE = environment.assetsPath + "/config.json"

export default function Command() {
    Logger.info("Parsing JSON Configuration")
    const [state, setState] = useState<State>(Utils.getDefaultState())
    Logger.info(state, "configuration :")

    useEffect(() => {
        (() => {
            if (state.apps.length == 0) {
                Logger.info("No Applications detected, trying to parse JSON Configuration")
                const importedState = JsonParser.parseJSONConfig(CONFIG_FILE)
                setState((previous) => ({...previous,
                    apps: importedState.apps,
                    workspaces: importedState.workspaces,
                    searchText: importedState.searchText
                }))
            }
        })()
    }, [])

    useEffect(() => {
        Logger.info("Writing configuration at : " + CONFIG_FILE)
        JsonParser.writeJSONConfig(CONFIG_FILE, state)
    }, [state.apps]);

    Logger.info(state.apps.length, "test: ")

    const createHandler =
        useCallback(
            (app: AppInterface) => {
                Logger.info(app, "Add Application : ")
                const newApps = [...state.apps, {name: app.name, command: app.command, id: Utils.generateUID()}];
                Logger.info(newApps.toString())
                setState((previous) => ({...previous, apps: newApps}))
            },
            [state.apps, setState]
        );
    return (
        <List>
            <EmptyView contentType="Applications" filter={undefined} content={state.apps} searchText={state.searchText} onCreate={createHandler} />
            {state.apps.map((apps, index) => (
                <List.Item key={index} title={apps.name} />
            ))}
            <List.Item actions={<ActionPanel><CreateAppAction defaultTitle={state.searchText} onCreate={createHandler} /></ActionPanel>} title="Create Application"/>
        </List>
    )
}
