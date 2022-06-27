import {AppInterface} from "../../../entities/app";
import {Action, ActionPanel, Form, List, useNavigation} from "@raycast/api";
import {useCallback, useEffect} from "react";
import Logger from "../../../utils/logger";
import {State} from "../../../entities/state";
import JsonParser from "../../../utils/json-parser";
import {CONFIG_FILE} from "../../../apps";

function EditApp(props: { app: AppInterface, index: number, state: State, setState: any}){
    const { pop } = useNavigation();

    let name = props.app.name
    let command = props.app.command

    const setName = (newName: string) => name = newName;
    const setCommand = (newCommand: string) => command = newCommand;


    const handleSubmit = useCallback(
        (values: { name: string, command: string }) => {
            Logger.info(JSON.stringify({  name: values.name, command: values.command }), "New app saving:")
            const newApps = props.state.apps
            newApps[props.index] = {...newApps[props.index], name: values.name, command: values.command}
            props.setState((previous: State) => ({...previous, apps: newApps}))
            JsonParser.writeJSONConfig(CONFIG_FILE, props.state)
            pop();
        },
        [pop]
    );

    return (
        <Form
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Edit App" onSubmit={handleSubmit}/>
            </ActionPanel>
            }>
        <Form.TextField autoFocus={true} id="name" title="Name" defaultValue={name} onChange={() => setName}/>
        <Form.TextField id="command" title="Command" defaultValue={command} onChange={setCommand}/>
        </Form>
);
}
export default EditApp;
