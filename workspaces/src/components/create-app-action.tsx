import { Action, Icon } from "@raycast/api";
import {App} from "../entities/app";
import CreateAppForm from "./create-app-form";

function CreateAppAction(props: { defaultTitle?: string; onCreate: (app: App) => void }) {
    return (
        <Action.Push
            icon={Icon.Pencil}
    title="Create App"
    shortcut={{ modifiers: ["cmd"], key: "n" }}
    target={<CreateAppForm onCreate={props.onCreate} />}
    />
);
}

export default CreateAppAction;
