import App from "../entities/app";
import fs from "fs";
import Logger from "../utils/logger";
import configJson from '../../assets/config.json';
import Workspace from "../entities/workspace";

class State {
   public apps: App[] = [];
   public workspaces: Workspace[] = [];


   constructor(apps: App[]) {
      this.apps = apps;
   }

   public processWorkspaces(payload: typeof configJson.workspaces) {
      this.workspaces = payload.map((value, _) => new Workspace(
          value.id,
          value.name,
          value.path,
          value.apps.map((appPayload, _) => this.apps.find((value: App) => value.id === appPayload)).filter(element => {
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
             value.id,
             value.name,
             value.command
         )),
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
