import {format} from "../utils/string";

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogObject = {
  level: LogLevel;
  message: string;
  timestamp: Date;
}

export class Logger {
  public level: LogLevel = 'debug';
  public format: string = '{{level}} [{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}] {{message}}';
  private logs: LogObject[] = [];

  public getLevelIndex(): number {
    return ['debug', 'info', 'warn', 'error'].indexOf(this.level);
  }

  public info(...args: any[]): void {
    if (this.getLevelIndex() > 0) {
      return;
    }

    this.log('info', ...args);
  }

  public warn(...args: any[]): void {
    if (this.getLevelIndex() > 1) {
      return;
    }

    this.log('warn', ...args);
  }

  public error(...args: any[]): void {
    if (this.getLevelIndex() > 2) {
      return;
    }

    this.log('error', ...args);
  }

  public debug(...args: any[]): void {
    if (this.getLevelIndex() > 3) {
      return;
    }

    this.log('debug', ...args);
  }

  public colorize(level: LogLevel | 'default'): string {
    switch (level) {
      case 'info':
        return '\x1b[32m';
      case 'warn':
        return '\x1b[33m';
      case 'error':
        return '\x1b[31m';
      case 'debug':
        return '\x1b[34m';
      case 'default':
      default:
        return '\x1b[0m';
    }
  }

  public log(level: LogLevel, ...args: any[]): void {
    const now = new Date();
    const replacements = {
      level: level.toUpperCase(),
      year: now.getFullYear().toString().padStart(4, '0'),
      month: (now.getMonth() + 1).toString().padStart(2, '0'),
      day: now.getDate().toString().padStart(2, '0'),
      hour: now.getHours().toString().padStart(2, '0'),
      minute: now.getMinutes().toString().padStart(2, '0'),
      message: args.join(' '),
    };

    const message = format(this.format, replacements);
    this.logs.push({
      level: level,
      message: message,
      timestamp: now,
    });

    console.log(
      this.colorize(level),
      message,
      this.colorize('default'),
    );
  }
}
