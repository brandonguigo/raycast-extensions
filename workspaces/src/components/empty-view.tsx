import { ActionPanel, List } from "@raycast/api";
import {AppInterface} from "../entities/app";
import CreateAppAction from "./app/create/action";
import Logger from "../utils/logger";

function EmptyView(props: { content: any[]; filter?: any; searchText: string; contentType: string; onCreate: (app: AppInterface) => void }) {
    function getAction(contentType: string) {
        switch (contentType) {
            case "Workspaces":
                return null
                break;
            case "Applications":
                return <ActionPanel><CreateAppAction defaultTitle={props.searchText} onCreate={props.onCreate} /></ActionPanel>
        }
        return null
    }
    Logger.info(props.content.length)
    const createAction = getAction(props.contentType)
    if (props.content.length == 0) {
        return (
            <List.EmptyView
                icon="😕"
                title={`No matching ${props.contentType} found`}
                description={`Can't find ${props.contentType} matching ${props.searchText}.\nCreate it now!`}
                actions={createAction}

            />
        );
    }
    return null;
}
export default EmptyView;
