import { Action, Icon } from "@raycast/api";
import {AppInterface} from "../../../entities/app";
import CreateAppForm from "./form";

function CreateAppAction(props: { defaultTitle?: string; onCreate: (app: AppInterface) => void }) {
    return (
        <Action.Push
            icon={Icon.Plus}
    title="Create App"
    shortcut={{ modifiers: ["cmd"], key: "n" }}
    target={<CreateAppForm onCreate={props.onCreate} />}
    />
);
}

export default CreateAppAction;
