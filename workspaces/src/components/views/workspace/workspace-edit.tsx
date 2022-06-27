import {AppInterface} from "../../../entities/app";
import {Action, ActionPanel, Form, List, useNavigation} from "@raycast/api";
import {useCallback, useEffect} from "react";
import Logger from "../../../utils/logger";
import {State} from "../../../entities/state";
import {WorkspaceInterface} from "../../../entities/workspace";

function EditWorkspace(props: { workspace: WorkspaceInterface, index: number, state: State, setState: any}){
    const { pop } = useNavigation();

    let name = props.workspace.name
    let path = props.workspace.path
    let apps = props.workspace.apps

    const setName = (newName: string) => name = newName;
    const setPath= (newPath: string) => path = newPath;
    const setApps= (newApps: AppInterface[]) => apps = newApps;


    const handleSubmit = useCallback(
        (values: { name: string, command: string }) => {
            Logger.info("Adding apps to workspace")
            // Logger.info(JSON.stringify({  name: values.name, command: values.command }), "New app saving:")
            // const newApps = props.state.apps
            // newApps[props.index] = {...newApps[props.index], name: values.name, command: values.command}
            // props.setState((previous: State) => ({...previous, apps: newApps}))
            // JsonParser.writeJSONConfig(CONFIG_FILE, props.state)
            // pop();
        },
        [pop]
    );

    return (
        <Form
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Edit Workspace" onSubmit={handleSubmit}/>
            </ActionPanel>
            }>
        <Form.TextField autoFocus={true} id="name" title="Name" defaultValue={name} onChange={() => setName}/>
        <Form.TextField id="path" title="Command" defaultValue={path} onChange={setPath}/>
        </Form>
);
}
export default EditWorkspace;
