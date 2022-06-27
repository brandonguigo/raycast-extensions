import {Action, ActionPanel, Form, useNavigation} from "@raycast/api";
import {useCallback, useState} from "react";

import {inflate} from "zlib";
import {WorkspaceInterface} from "../../../entities/workspace";
import {AppInterface} from "../../../entities/app";
import Logger from "../../../utils/logger";
import {State} from "../../../entities/state";
import {CONFIG_FILE, WorkspaceAppSettings} from "../../../utils/constants";
import JsonParser from "../../../utils/json-parser";

function EditWorkspaceForm(props: {workspace: WorkspaceInterface, appList: AppInterface[], index: number;state: State, setState: any}){
    const { pop } = useNavigation();

    const [name, setName] = useState<string>(props.workspace.name);
    const [path, setPath] = useState<string>(props.workspace.path);
    const [selectedApps, setSelectedApps] = useState<string[]>(props.workspace.apps.map((value) => value.appId))
    const [selectedAppsOptions, setSelectedAppsOptions] = useState<boolean[][]>(props.workspace.apps.map((value: { options: { automaticLaunch: boolean; }; }, _: any) => {
        if (value.options != undefined) return [value.options.automaticLaunch]
        else return [false]
    }))


    const handleSubmit = useCallback(
        (values: { name: string, path: string, apps: string[], appsOptions: boolean[][]}) => {
            Logger.info(JSON.stringify({"apps": values.apps, "appsOptions": values.appsOptions}))
            const newWorkspaces = props.state.workspaces
            const newApps = values.apps.map((value, index) => {
                return {
                    "appId": value,
                    "options": {
                        "automaticLaunch": values.appsOptions[index][0]
                    }
                }
            })
            newWorkspaces[props.index] = {id: props.state.workspaces[props.index].id, name: values.name, path: values.path, apps: newApps}
            props.setState((previous: any) => ({...previous, workspaces: newWorkspaces}))
            JsonParser.writeJSONConfig(CONFIG_FILE, props.state)
            pop();
        },
        [pop]
    );

    Logger.info(selectedApps, "Selected apps: ")
    return (
        <Form
            navigationTitle="Edit Workspace"
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Edit Workspace" onSubmit={() => handleSubmit({name: name, path: path, apps: selectedApps, appsOptions: selectedAppsOptions})}/>
            </ActionPanel>
            }>
        <Form.Description title="Edit a new Workspace" text="Enter your Workspace name and path, then select and configure Applications."/>
        <Form.TextField id="name" title="Name" value={name} onChange={setName}/>
        <Form.TextField id="path" title="Path" value={path} onChange={setPath}/>
        <Form.TagPicker id="apps" title="Applications" value={selectedApps} onChange={setSelectedApps}>
            {props.appList.map((app: AppInterface) => {
                Logger.info(app.id)
                return <Form.TagPicker.Item key={app.id} value={app.id.toString()} title={app.name} />
            })}
        </Form.TagPicker>
        <Form.Separator/>
        <Form.Description title="Applications" text="Configure how applications are run in your Workspace."/>
        {selectedApps.map((appId: string, index) => {
            const app = props.appList.find((value, index) => value.id == appId)
            if (app != undefined) {
                return [
                    <Form.Description text={app.name}/>,
                    <Form.Checkbox id={app.id + "-AUTO"} label={WorkspaceAppSettings.getLabelFromName("AUTO")} value={selectedAppsOptions[index][0]} onChange={(newValue) => {
                        selectedAppsOptions[index][0] = newValue
                        setSelectedAppsOptions(selectedAppsOptions)
                    }}/>
                ]
            } else
                return null
        })}
        </Form>
);
}
export default EditWorkspaceForm;
