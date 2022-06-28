import {AppInterface} from "../../../entities/app";
import {Action, Icon} from "@raycast/api";

function DeleteAppAction(props: {app: AppInterface, index: number, onToggle: (app: AppInterface, index: number) => void}) {
    return (
        <Action
            icon={Icon.Trash}
            title="Delete Application"
            onAction={() => props.onToggle(props.app, props.index)}
            shortcut={{ modifiers : ["cmd"], key:"delete"}}
        />
    );
}

export default DeleteAppAction
