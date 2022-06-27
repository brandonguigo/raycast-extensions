import Logger from "./utils/logger";
import {List, ActionPanel, environment, useNavigation} from "@raycast/api";
import {CreateAppAction} from "./components";
import {useCallback, useEffect, useState} from "react";
import EmptyView from "./components/empty-view";
import {AppInterface} from "./entities/app";
import Utils from "./utils/utils";
import {State} from "./entities/state";
import JsonParser from "./utils/json-parser";
import EditAppToggle from "./components/app/edit/toggle";
import EditApp from "./edit";


export const CONFIG_FILE = environment.assetsPath + "/config.json"

export default function Command() {
    Logger.info("Parsing JSON Configuration")
    const [state, setState] = useState<State>(Utils.getDefaultState())
    const {push, pop} = useNavigation();
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

    const editHandler =
        useCallback(
            (app: AppInterface, index: number) => {
                Logger.info(app,"Pushing Application editing view :")
                push((<EditApp app={app} state={state} setState={setState} index={index}></EditApp>))
            }
        ,[state.apps, setState])
    return (
        <List>
            <EmptyView contentType="Applications" filter={undefined} content={state.apps} searchText={state.searchText} onCreate={createHandler} />
            {state.apps.map((app, index) => (
                <List.Item
                    actions={
                    <ActionPanel>
                        <ActionPanel.Section>
                            <EditAppToggle app={app} onToggle={() => editHandler(app, index)}></EditAppToggle>
                        </ActionPanel.Section>
                    </ActionPanel>
                    }
                    key={index} title={app.name} />
            ))}
            <List.Item actions={<ActionPanel><CreateAppAction defaultTitle={state.searchText} onCreate={createHandler} /></ActionPanel>} title="Create Application"/>
        </List>
    )
}
