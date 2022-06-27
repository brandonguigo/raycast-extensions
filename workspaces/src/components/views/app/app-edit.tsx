import {AppInterface} from "../../../entities/app";
import {Action, ActionPanel, Form, Icon, List, useNavigation} from "@raycast/api";
import {useCallback, useEffect} from "react";
import Logger from "../../../utils/logger";
import {State} from "../../../entities/state";
import JsonParser from "../../../utils/json-parser";
import {CONFIG_FILE, ICONS_PATH} from "../../../utils/constants";
import fs from "fs";

function EditApp(props: { app: AppInterface, index: number, state: State, setState: any}){
    const { pop } = useNavigation();

    let name = props.app.name
    let command = props.app.command

    const setName = (newName: string) => name = newName;
    const setCommand = (newCommand: string) => command = newCommand;


    const handleSubmit = useCallback(
        (values: { name: string, command: string, iconFilename: string }) => {
            Logger.info(JSON.stringify({  name: values.name, command: values.command }), "New app saving:")
            const newApps = props.state.apps
            newApps[props.index] = {...newApps[props.index], name: values.name, command: values.command, iconFilename: values.iconFilename}
            props.setState((previous: State) => ({...previous, apps: newApps}))
            JsonParser.writeJSONConfig(CONFIG_FILE, props.state)
            pop();
        },
        [pop]
    );

    const iconFiles = fs.readdirSync(ICONS_PATH, 'utf8')
    function generateIconName(iconName: string) {
        iconName = iconName.split('.')[0]
        return iconName.charAt(0).toUpperCase() + iconName.slice(1)
    }

    return (
        <Form
            navigationTitle="Edit Application"
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Edit App" onSubmit={handleSubmit}/>
            </ActionPanel>
            }>
        <Form.TextField autoFocus={true} id="name" title="Name" defaultValue={name} onChange={() => setName}/>
        <Form.TextField id="command" title="Command" defaultValue={command} onChange={setCommand}/>
        <Form.Dropdown id="iconFilename" title="App Icon" defaultValue={props.app.iconFilename}>
            <Form.DropdownItem value="default.png" title="Default" icon={{ source: "icons/default.png"}}/>
            {iconFiles.map((iconFile, index) => (
                <Form.DropdownItem key={index} icon={{ source: "icons/"+iconFile }} value={iconFile} title={generateIconName(iconFile)}/>
            ))}
        </Form.Dropdown>
        </Form>
);
}
export default EditApp;
