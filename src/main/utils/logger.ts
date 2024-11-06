import {app} from "./app";

export function info(...args: any[]): void {
  app().logger().info(...args);
}

export function warn(...args: any[]): void {
  app().logger().warn(...args);
}

export function error(...args: any[]): void {
  app().logger().error(...args);
}

export function debug(...args: any[]): void {
  app().logger().debug(...args);
}
