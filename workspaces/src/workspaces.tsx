import Logger from "./utils/logger";
import {List, ActionPanel, Action, environment, useNavigation, Icon} from "@raycast/api";
import {CreateAppAction} from "./components";
import {useCallback, useEffect, useState} from "react";
import AppEmptyView from "./components/views/app/app-empty-view";
import {AppInterface} from "./entities/app";
import Utils from "./utils/utils";
import {State} from "./entities/state";
import JsonParser from "./utils/json-parser";
import EditApp from "./components/views/app/app-edit";
import EditAppAction from "./components/actions/app/edit";
import {WorkspaceInterface} from "./entities/workspace";
import EditWorkspace from "./components/views/workspace/workspace-edit";
import WorkspaceEmptyView from "./components/views/workspace/workspace-empty-view";
import EditWorkspaceAction from "./components/actions/workspace/edit";
import CreateWorkspaceAction from "./components/actions/workspace/create";
import {CONFIG_FILE} from "./utils/constants";

export default function Command() {
    Logger.info("Parsing JSON Configuration")
    const [state, setState] = useState<State>(Utils.getDefaultState())
    const {push, pop} = useNavigation();
    Logger.info(state, "configuration :")

    useEffect(() => {
        (() => {
            if (state.workspaces.length == 0) {
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
    }, [state.workspaces]);

    const createHandler =
        useCallback(
            (workspace: WorkspaceInterface) => {
                Logger.info(workspace, "Add Workspace : ")
                const newWorkspaces = [...state.workspaces, {name: workspace.name, path: workspace.path, apps: workspace.apps, id: Utils.generateUID()}];
                Logger.info(newWorkspaces.toString())
                setState((previous) => ({...previous, workspaces: newWorkspaces}))
            },
            [state.workspaces, setState]
        );

    const editHandler =
        useCallback(
            (workspace: WorkspaceInterface, index: number) => {
                Logger.info(workspace,"Pushing Workspace editing view :")
                push((<EditWorkspace workspace={workspace} state={state} setState={setState} appList={state.apps} index={index}></EditWorkspace>))
            }
        ,[state.apps, setState])

    const deleteHandler =
        useCallback(
            (workspace: WorkspaceInterface, index: number) => {
                Logger.info("Deleting Application : " + index)
                delete state.workspaces[index]
                setState((prevState) => ({...prevState, workspaces: state.workspaces}))
                JsonParser.writeJSONConfig(CONFIG_FILE, state)
                Logger.info(workspace.name + " deleted")
            }, [state.workspaces, setState]
        )

    return (
        <List>
            <WorkspaceEmptyView appList={state.apps} filter={undefined} workspaces={state.workspaces} searchText={state.searchText} onCreate={createHandler} />
            {state.workspaces.map((workspace, index) => (
                <List.Item
                    icon={workspace.icon != undefined ? workspace.icon : workspace.iconFilename != undefined ? {source : "icons/"+workspace.iconFilename} : Icon.Finder}
                    actions={
                    <ActionPanel>
                        <ActionPanel.Section>
                            <EditWorkspaceAction workspace={workspace} onToggle={() => editHandler(workspace, index)}></EditWorkspaceAction>
                            <Action
                                icon={Icon.Trash}
                                title="Delete Workspace"
                                onAction={() => deleteHandler(workspace, index)}
                                shortcut={{ modifiers : ["cmd"], key:"delete"}}
                            />
                        </ActionPanel.Section>
                    </ActionPanel>
                    }
                    key={index} title={workspace.name} />
            ))}
            <List.Item actions={<ActionPanel><CreateWorkspaceAction appList={state.apps} defaultTitle={state.searchText} onCreate={createHandler} /></ActionPanel>} icon={Icon.Plus} title="Create Workspace"/>
        </List>
    )
}
