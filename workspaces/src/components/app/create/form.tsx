import App, {AppInterface} from "../../../entities/app";
import {Action, ActionPanel, Form, List, useNavigation} from "@raycast/api";
import {nanoid} from "nanoid";
import Utils from "../../../utils/utils";
import {useCallback} from "react";

function CreateAppForm(props: { onCreate: (app: AppInterface) => void}){
    const { pop } = useNavigation();

    const handleSubmit = useCallback(
        (values: { name: string, command: string }) => {
            props.onCreate({  name: values.name, command: values.command });
            pop();
        },
        [props.onCreate, pop]
    );

    return (
        <Form
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Create App" onSubmit={handleSubmit}/>
            </ActionPanel>
            }>
        <Form.TextField id="name" title="Name"/>
        <Form.TextField id="command" title="Command"/>
        </Form>
);
}
export default CreateAppForm;
