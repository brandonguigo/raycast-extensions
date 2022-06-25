//tslint
import App from "./app";
import fs from "fs";
import Logger from "../utils/logger";
import configJson from '../../assets/config.json';
import Workspace from "./workspace";
import Filter from "./filter";

class State {
   public apps: App[] = [];
   public workspaces: Workspace[] = [];
   public searchText = "";
   public filter?: Filter = undefined;


   constructor(apps: App[], searchText: string, filter?: Filter) {
      this.apps = apps;
      this.searchText = searchText;
      this.filter = filter;
   }

   public processWorkspaces(payload: typeof configJson.workspaces) {
      this.workspaces = payload.map((value, _) => new Workspace(
          value["id"],
          value["name"],
          value["path"],
          (value["apps"] as []).map((appPayload: number, _: any) => this.apps.find((value: App) => value.id === appPayload)).filter((element: any) => {
             return element !== undefined;
          }) as App[]
      ))
   }

   public export(filename: string) {
      //TODO: do export with configJson
      const payload = {
         "apps": this.apps.map((val, _) => val.export()),
         "workspaces": this.workspaces.map((val, _) => val.export())
      }
      try {
         const jsonString = JSON.stringify(payload)
         fs.writeFileSync(filename, jsonString, 'utf8')
      } catch (e: any) {
         Logger.error(e.message)
         return false
      }
      return true
   }

   static import(filename: string) {
      const state =  new State(
         configJson.apps.map((value, _) => new App(
             value.name,
             value.command,
             value.id
         )),
          configJson.searchText,
          configJson.filter != null ? configJson.filter : undefined
      )
      state.processWorkspaces(configJson.workspaces)
      return state
   }

   public toString() {
      return JSON.stringify({
         apps: this.apps,
         workspaces: this.workspaces
      })
   }
}

export default State
