import {Service} from "./skeleton/Service";
import {Counter} from "./services/Counter";
import {BrowserWindow} from "electron";
import {Logger} from "./skeleton/Logger";
import {debug, error, info} from "./utils/logger";
import {Meta} from "./skeleton/Meta";

export class Application {
  private static instance: Application;
  private static mainWindow: BrowserWindow;
  private static logger: Logger;

  public services: Service[] = [
    new Counter(),
  ];

  public static getInstance(): Application {
    if (!Application.instance) {
      Application.instance = new Application();
    }

    return Application.instance;
  };

  public setMainWindow(mainWindow: BrowserWindow): void {
    debug("Setting main window");
    Application.mainWindow = mainWindow;
  }

  public getMainWindow(): BrowserWindow {
    return Application.mainWindow;
  }

  public start(): void {
    // Log application information
    info(`Starting ${Meta.get().name}...`);
    info(`Version: ${Meta.get().version} (${Meta.get().build})`);
    info(`Signature: ${Meta.get().signature}`);
    info(`Running in ${Meta.get().isProduction ? "production" : "development"} mode`);

    // Load services
    info("Loading services...");
    for (const service of this.services) {
      debug(`Loading service [${service.name()}]`);
      try {
        service.load();
      } catch (e) {
        error(`Failed to load service [${service.name()}]`);
        error(e);
        continue;
      }
      debug(`Service [${service.name()}] loaded`);
    }
    info("Services loaded");
  }

  public stop(): void {
    // Unload services
    info("Unloading services...");
    for (const service of this.services) {
      debug(`Unloading service [${service.name()}]`);
      try {
        service.unload();
      } catch (e) {
        error(`Failed to unload service [${service.name()}]`);
        error(e);
        continue;
      }
      debug(`Service [${service.name()}] unloaded`);
    }
    info("Services unloaded");
  }

  public logger(): Logger {
    if (!Application.logger) {
      Application.logger = new Logger();
    }

    return Application.logger;
  }
}
