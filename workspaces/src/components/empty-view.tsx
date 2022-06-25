import { ActionPanel, List } from "@raycast/api";
import App, {AppInterface} from "../entities/app";
import Filter from "../entities/filter";
import CreateAppAction from "./app/create/action";

function EmptyView(props: { content: any[]; filter?: Filter; searchText: string; contentType: string; onCreate: (app: AppInterface) => void }) {
    function getAction(contentType: string) {
        switch (contentType) {
            case "Workspaces":
                return null
                break;
            case "Applications":
                return <CreateAppAction defaultTitle={props.searchText} onCreate={props.onCreate} />
        }
    }
    if (props.content.length == 0) {
        return (
            <List.EmptyView
                icon="😕"
                title={`No matching ${props.contentType} found`}
                description={`Can't find ${props.contentType} matching ${props.searchText}.\nCreate it now!`}
                actions={
                    <ActionPanel>
                        ${getAction(props.contentType)}
                    </ActionPanel>
                }
            />
        );
    }
    return null;
    // switch (props.filter) {
    //     case Filter.Open: {
    //         return (
    //             <List.EmptyView
    //                 icon="🎉"
    //                 title="All done"
    //                 description="All todos completed - way to go! Why not create some more?"
    //                 actions={
    //                     <ActionPanel>
    //                         <CreateTodoAction defaultTitle={props.searchText} onCreate={props.onCreate} />
    //                     </ActionPanel>
    //                 }
    //             />
    //         );
    //     }
    //     case Filter.Completed: {
    //         return (
    //             <List.EmptyView
    //                 icon="😢"
    //                 title="No todos completed"
    //                 description="Uh-oh, looks like you haven't completed any todos yet."
    //             />
    //         );
    //     }
    //     case Filter.All:
    //     default: {
    //         return (
    //             <List.EmptyView
    //                 icon="📝"
    //                 title="No todos found"
    //                 description="You don't have any todos yet. Why not add some?"
    //                 actions={
    //                     <ActionPanel>
    //                         <CreateTodoAction defaultTitle={props.searchText} onCreate={props.onCreate} />
    //                     </ActionPanel>
    //                 }
    //             />
    //         );
    //     }
    // }
}
export default EmptyView;
