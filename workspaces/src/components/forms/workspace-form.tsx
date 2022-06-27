import {AppInterface} from "../../entities/app";
import {Action, ActionPanel, Form, useNavigation} from "@raycast/api";
import {useCallback, useState} from "react";
import {WorkspaceInterface} from "../../entities/workspace";
import Logger from "../../utils/logger";
import Utils from "../../utils/utils";
import {WorkspaceAppSettings} from "../../utils/constants";
import {inflate} from "zlib";

function CreateWorkspaceForm(props: {appList: AppInterface[], onCreate: (workspace: WorkspaceInterface) => void}){
    const { pop } = useNavigation();

    const [name, setName] = useState<string>("");
    const [path, setPath] = useState<string>("");
    const [selectedApps, setSelectedApps] = useState<string[]>([])
    const [selectedAppsOptions, setSelectedAppsOptions] = useState<boolean[][]>([[]])


    const handleSubmit = useCallback(
        (values: { name: string, path: string, apps: string[], appsOptions: boolean[][]}) => {
            Logger.info(JSON.stringify({"apps": values.apps, "appsOptions": values.appsOptions}))
            const workspaceApps = values.apps.map((value, index) => {
                return {
                    "appId": value,
                    "options": {
                        "automaticLaunch": values.appsOptions[index][0]
                    }
                }
            })
            props.onCreate({  name: values.name, path: values.path, apps: workspaceApps, id: Utils.generateUID() });
            pop();
        },
        [props.onCreate, pop]
    );
    Logger.info(props.appList.length)
    return (
        <Form
            navigationTitle="Create Workspace"
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Create Workspace" onSubmit={() => handleSubmit({name: name, path: path, apps: selectedApps, appsOptions: selectedAppsOptions})}/>
            </ActionPanel>
            }>
        <Form.Description title="Create a new Workspace" text="Enter your Workspace name and path, then select and configure Applications."/>
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
export default CreateWorkspaceForm;
