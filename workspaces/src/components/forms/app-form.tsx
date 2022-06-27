import {AppInterface} from "../../entities/app";
import {Action, ActionPanel, Form, Icon, List, useNavigation} from "@raycast/api";
import {useCallback} from "react";
import fs from "fs";
import {ICONS_PATH} from "../../utils/constants";
import Utils from "../../utils/utils";
import Logger from "../../utils/logger";

function CreateAppForm(props: { onCreate: (app: AppInterface) => void}){
    const { pop } = useNavigation();

    const handleSubmit = useCallback(
        (values: { name: string, command: string, iconFilename: string }) => {
            props.onCreate({  name: values.name, command: values.command, iconFilename: values.iconFilename, id: Utils.generateUID()});
            pop();
        },
        [props.onCreate, pop]
    );

    const iconFiles = fs.readdirSync(ICONS_PATH, 'utf8')
    function generateIconName(iconName: string) {
        iconName = iconName.split('.')[0]
        return iconName.charAt(0).toUpperCase() + iconName.slice(1)
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
        <Form.Dropdown id="iconFilename" title="App Icon" defaultValue="">
            <Form.DropdownItem value="default.png" title="Default" icon={{ source: "icons/default.png"}}/>
            {iconFiles.map((iconFile, index) => (
                <Form.DropdownItem key={index} icon={{ source: "icons/"+iconFile }} value={iconFile} title={generateIconName(iconFile)}/>
            ))}
        </Form.Dropdown>
        </Form>
);
}
export default CreateAppForm;
