import {AppInterface} from "../../entities/app";
import {Action, ActionPanel, Form, List, useNavigation} from "@raycast/api";
import {useCallback} from "react";
import {WorkspaceInterface} from "../../entities/workspace";
import Logger from "../../utils/logger";

function CreateWorkspaceForm(props: {appList: AppInterface[], onCreate: (workspace: WorkspaceInterface) => void}){
    const { pop } = useNavigation();

    const handleSubmit = useCallback(
        (values: { name: string, path: string, apps: AppInterface[] }) => {
            props.onCreate({  name: values.name, path: values.path, apps: values.apps });
            pop();
        },
        [props.onCreate, pop]
    );
    Logger.info(props.appList.length)
    return (
        <Form
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Create Workspace" onSubmit={handleSubmit}/>
            </ActionPanel>
            }>
        <Form.TextField id="name" title="Name"/>
        <Form.TextField id="path" title="Command"/>
        <Form.TagPicker id="apps" title="Applications">
            {props.appList.map((app: AppInterface) => {
                Logger.info(app.id)
                return <Form.TagPicker.Item key={app.id} value={app.id.toString()} title={app.name} />
            })}
        </Form.TagPicker>
        </Form>
);
}
export default CreateWorkspaceForm;
