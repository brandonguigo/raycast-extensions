import {AppInterface} from "../../../entities/app";
import {Action, Icon} from "@raycast/api";

function OpenAppAction(props: {app: AppInterface, index: number, onToggle: (app: AppInterface, index: number) => void}) {
    return (
        <Action
            icon={Icon.Window}
            title="Open Application"
            onAction={() => props.onToggle(props.app, props.index)}
        />
    );
}

export default OpenAppAction
