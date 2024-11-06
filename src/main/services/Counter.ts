import {Service} from "../skeleton/Service";
import {ipcMain} from 'electron';
import {app} from "../utils/app";
import {debug} from "../utils/logger";

export class Counter extends Service {
  private count: number = 0;

  public increment(): void {
    this.count++;

    app()
      .getMainWindow()
      .webContents
      .send('onCountChange', this.count);

    debug(`Count is now ${this.count}`);
  }

  public decrement(): void {
    this.count--;

    app()
      .getMainWindow()
      .webContents
      .send('onCountChange', this.count);

    debug(`Count is now ${this.count}`);
  }

  public setValue(value: number): void {
    this.count = value;

    app()
      .getMainWindow()
      .webContents
      .send('onCountChange', this.count);

    debug(`Count is now ${this.count}`);
  }

  public load(): void {
    ipcMain.handle('increment', () => {
      this.increment();
    });

    ipcMain.handle('decrement', () => {
      this.decrement();
    });

    ipcMain.handle('setValue', (event, value: number) => {
      this.setValue(value);
    });
  }

  public unload(): void {
    ipcMain.removeHandler('increment');
  }
}
