import type { ConsolaInstance } from "consola";
import { createConsola } from "consola";
import dotenv from "dotenv";

dotenv.config();

class LoggerService {
  private consola;
  debugMode = false;

  constructor() {
    const maybeWindow =
      typeof globalThis === "object" ? (globalThis as any).window : undefined;

    if (maybeWindow) {
      const storedDebugFlag = (() => {
        try {
          return maybeWindow.localStorage?.getItem("og:debug");
        } catch (_error) {
          return undefined;
        }
      })();

      this.debugMode =
        process.env.NODE_ENV === "development"
          ? true
          : JSON.parse(storedDebugFlag ?? "{}");
    } else {
      this.debugMode = true;
    }

    this.consola = createConsola({
      level: this.debugMode ? 4 : -999, // 4 for debug level, -999 for silent
    });
  }

  public get log(): ConsolaInstance["log"] {
    return this.consola.log.bind(this.consola);
  }

  public get debug(): ConsolaInstance["debug"] {
    return this.consola.debug.bind(this.consola);
  }

  public get info(): ConsolaInstance["info"] {
    return this.consola.info.bind(this.consola);
  }

  public get warn(): ConsolaInstance["warn"] {
    return this.consola.warn.bind(this.consola);
  }

  public get error(): ConsolaInstance["error"] {
    return this.consola.error.bind(this.consola);
  }

  public get success(): ConsolaInstance["success"] {
    return this.consola.success.bind(this.consola);
  }

  public get start(): ConsolaInstance["start"] {
    return this.consola.start.bind(this.consola);
  }

  public get ready(): ConsolaInstance["ready"] {
    return this.consola.ready.bind(this.consola);
  }

  public get trace(): ConsolaInstance["trace"] {
    return this.consola.trace.bind(this.consola);
  }

  public get fatal(): ConsolaInstance["fatal"] {
    return this.consola.fatal.bind(this.consola);
  }

  public get box(): ConsolaInstance["box"] {
    return this.consola.box.bind(this.consola);
  }

  public get table() {
    return this.debugMode ? console.table.bind(console) : () => undefined;
  }

  public prompt(...args: Parameters<typeof this.consola.prompt>) {
    return this.consola.prompt(...args);
  }
}

const logger = new LoggerService();

export default logger;
