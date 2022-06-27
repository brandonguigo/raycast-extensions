interface AppInterface {
    id: string;
    name: string;
    command: string;
}
// class App {
//     public id: number = Utils.generateUID();
//     public name = "";
//     public command = "";
//
//     constructor(name: string, command: string, id?: number) {
//         if (id != undefined) this.id = id;
//         this.name = name;
//         this.command = command;
//     }
//
//     public export() {
//         return {
//             "id": this.id,
//             "name": this.name,
//             "command": this.command
//         }
//     }
//
//     static import(payload: typeof configJson.apps[1]) {
//         return new App(
//             payload.name,
//             payload.command,
//             payload.id
//         )
//     }
//
//     public toString() {
//         return JSON.stringify(this.export())
//     }
// }
//
// export default App;
export type {AppInterface};
