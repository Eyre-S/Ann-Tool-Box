import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiInterface } from './api';

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
