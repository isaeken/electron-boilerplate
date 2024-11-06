import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('app', {
  increment: () => ipcRenderer.invoke('increment'),
  decrement: () => ipcRenderer.invoke('decrement'),
  setValue: (value: number) => ipcRenderer.invoke('setValue', value),
  onCountChange: (callback: (count: number) => void) => {
    ipcRenderer.addListener('onCountChange', (_event, count) => {
      callback(count);
    });
  },
});
