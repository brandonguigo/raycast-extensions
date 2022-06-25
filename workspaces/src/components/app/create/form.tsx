import {App} from "../../../entities/app";
import {Action, ActionPanel, Form, List, useNavigation} from "@raycast/api";
import {useState} from "react";

function CreateAppForm(props: { onCreate: (app: App) => void}){
    const { pop } = useNavigation();

    function handleSubmit(values: { name: string, command: string }) {
        props.onCreate({ name: values.name, command: values.command });
        pop();
    }

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
