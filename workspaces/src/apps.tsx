import Logger from "./utils/logger";
import {Action, ActionPanel, Icon, List, useNavigation} from "@raycast/api";
import {CreateAppAction} from "./components";
import {useCallback, useEffect, useState} from "react";
import AppEmptyView from "./components/views/app/app-empty-view";
import {AppInterface} from "./entities/app";
import Utils from "./utils/utils";
import {State} from "./entities/state";
import JsonParser from "./utils/json-parser";
import EditApp from "./components/views/app/app-edit";
import EditAppAction from "./components/actions/app/edit";
import {CONFIG_FILE} from "./utils/constants";

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
                const newApps = [...state.apps, {name: app.name, command: app.command, id: Utils.generateUID(), iconFilename: app.iconFilename}];
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

    const deleteHandler =
        useCallback(
            (app: AppInterface, index: number) => {
                Logger.info("Deleting Application : " + index)
                delete state.apps[index]
                setState((prevState) => ({...prevState, apps: state.apps}))
                JsonParser.writeJSONConfig(CONFIG_FILE, state)
                Logger.info(app.name + " deleted")
            }, [state.apps, setState]
        )
    Logger.info(state.workspaces.length)
    function generateAppListItem(iconFilename: string) {
        if (iconFilename == "") {
            return Icon.Window
        }
        return
    }
    return (
        <List>
            <AppEmptyView filter={undefined} apps={state.apps} searchText={state.searchText} onCreate={createHandler} />
            {state.apps.map((app, index) => (
                <List.Item
                    icon={{ source: "icons/"+app.iconFilename}}
                    actions={
                    <ActionPanel>
                        <ActionPanel.Section>
                            <EditAppAction app={app} onToggle={() => editHandler(app, index)}></EditAppAction>
                            <Action
                                icon={Icon.Trash}
                                title="Delete Application"
                                onAction={() => deleteHandler(app, index)}
                                shortcut={{ modifiers : ["cmd"], key:"delete"}}
                            />
                        </ActionPanel.Section>
                    </ActionPanel>
                    }
                    key={index} title={app.name} />
            ))}
            <List.Item actions={<ActionPanel><CreateAppAction defaultTitle={state.searchText} onCreate={createHandler} /></ActionPanel>} icon={Icon.Plus} title="Create Application"/>
        </List>
    )
}
