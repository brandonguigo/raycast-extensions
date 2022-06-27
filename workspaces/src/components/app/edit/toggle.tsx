import {AppInterface} from "../../../entities/app";
import {Action, Icon} from "@raycast/api";

function EditAppToggle(props: {app: AppInterface, onToggle: () => void}) {
    return (
        <Action
            icon={Icon.Pencil}
            title="Edit Application"
            onAction={props.onToggle}
    />
);
}

export default EditAppToggle
