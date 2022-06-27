import {Action, ActionPanel, Form, Icon, useNavigation} from "@raycast/api";
import {useCallback, useState} from "react";
import {WorkspaceInterface} from "../../../entities/workspace";
import {AppInterface} from "../../../entities/app";
import Logger from "../../../utils/logger";
import {State} from "../../../entities/state";
import {CONFIG_FILE, ICONS_PATH, WorkspaceAppSettings} from "../../../utils/constants";
import JsonParser from "../../../utils/json-parser";
import fs from "fs";

function EditWorkspaceForm(props: {workspace: WorkspaceInterface, appList: AppInterface[], index: number;state: State, setState: any}){
    const { pop } = useNavigation();

    const [name, setName] = useState<string>(props.workspace.name);
    const [icon, setIconState] = useState<string|undefined>(props.workspace.icon);
    const setIcon = (type: string, content: Icon|string) => {
        switch (type) {
            case "icon":
                setIconState(content as Icon)
                break;
            case "file":
                setIconFilenameState(content as string)
                break;
        }
    }
    const [iconFilename, setIconFilenameState] = useState<string|undefined>(props.workspace.iconFilename);
    const [path, setPath] = useState<string>(props.workspace.path);
    const [customIcons, setCustomIcons] = useState<boolean>(false);
    const [selectedApps, setSelectedApps] = useState<string[]>(props.workspace.apps.map((value) => value.appId))
    const [selectedAppsOptions, setSelectedAppsOptions] = useState<boolean[][]>(props.workspace.apps.map((value: { options: { automaticLaunch: boolean; }; }, _: any) => {
        if (value.options != undefined) return [value.options.automaticLaunch]
        else return [false]
    }))


    const handleSubmit = useCallback(
        (values: { name: string, path: string, apps: string[], appsOptions: boolean[][], icon?: string, file?: string}) => {
            Logger.info(JSON.stringify({"apps": values.apps, "appsOptions": values.appsOptions, "icon": icon}))
            const newWorkspaces = props.state.workspaces
            const newApps = values.apps.map((value, index) => {
                return {
                    "appId": value,
                    "options": {
                        "automaticLaunch": values.appsOptions[index][0]
                    }
                }
            })
            newWorkspaces[props.index] = {
                id: props.state.workspaces[props.index].id,
                name: values.name,
                path: values.path,
                apps: newApps,
                icon: values.icon,
                iconFilename: values.file
            }
            props.setState((previous: any) => ({...previous, workspaces: newWorkspaces}))
            JsonParser.writeJSONConfig(CONFIG_FILE, props.state)
            pop();
        },
        [pop]
    );

    Logger.info(selectedApps, "Selected apps: ")
    const iconFiles = fs.readdirSync(ICONS_PATH, 'utf8')
    function generateIconName(iconName: string) {
        iconName = iconName.split('.')[0]
        return iconName.charAt(0).toUpperCase() + iconName.slice(1)
    }

    function generateIconPicker(customIcons: boolean) {
        if (customIcons){
            return (
                <Form.Dropdown id="file" title="Workspace Icon" value={iconFilename} onChange={(value) => setIcon("file", value)}>
                    <Form.DropdownItem value="default.png" title="Default" icon={{ source: "icons/default.png"}}/>
                    {iconFiles.map((iconFile, index) => (
                        <Form.DropdownItem key={index} icon={{ source: "icons/"+iconFile }} value={iconFile} title={generateIconName(iconFile)}/>
                    ))}
                </Form.Dropdown>)
        } else {
            return (
                <Form.Dropdown id="icon" title="Workspace Icon" value={iconFilename} onChange={(value) => setIcon("icon", value)}>
                    <Form.DropdownItem value={Icon.Finder} title="Default" icon={Icon.Finder}/>
                    {Object.entries(Icon).map((icon, index) => (
                        <Form.DropdownItem key={index} icon={icon[1]} value={icon[1]} title={generateIconName(icon[0])}/>
                    ))}
                </Form.Dropdown>)
        }
    }
    return (
        <Form
            navigationTitle="Edit Workspace"
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Edit Workspace" onSubmit={() => handleSubmit({name: name, path: path, apps: selectedApps, appsOptions: selectedAppsOptions, icon: icon, file: iconFilename})}/>
            </ActionPanel>
            }>
        <Form.Description title="Edit a new Workspace" text="Enter your Workspace name and path, then select and configure Applications."/>
        <Form.Checkbox id="customIcons" label="Use custom icons" value={customIcons} onChange={setCustomIcons}/>
            {generateIconPicker(customIcons)}
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
