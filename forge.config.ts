import fs from 'fs';
import path from 'path';
import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {MakerZIP} from '@electron-forge/maker-zip';
import MakerRpm from "@electron-forge/maker-rpm";
import VitePlugin from "@electron-forge/plugin-vite";
import FusesPlugin from "@electron-forge/plugin-fuses";
import AutoUnpackNativesPlugin from "@electron-forge/plugin-auto-unpack-natives";
import {FuseV1Options, FuseVersion} from "@electron/fuses";
import type {ForgeConfig} from '@electron-forge/shared-types';

const buildFilePath = path.join(__dirname, 'src/app.json');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      authors: 'IZEATECH',
      owners: 'IZEATECH',
    }, ['win32']),

    new MakerZIP({}, ['darwin']),

    new MakerDeb({
      options: {
        maintainer: 'IZEATECH',
        homepage: 'https://izeatech.com',
      },
    }, ['linux']),

    new MakerRpm({}, ['linux']),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'config/vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/renderer/preload.ts',
          config: 'config/vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'config/vite.renderer.config.ts',
        }
      ],
    }),

    new AutoUnpackNativesPlugin({}),

    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    preMake: async () => {
      const buildNumber = parseInt(packageJson.build, 10) + 1;

      let contents = {
        name: packageJson.name ?? 'app',
        signature: packageJson.signature ?? packageJson.name ?? 'app',
        version: packageJson.version ?? '0.0.0',
        build: buildNumber.toString(),
      };

      if (fs.existsSync(buildFilePath)) {
        contents = JSON.parse(fs.readFileSync(buildFilePath, 'utf-8'));
      }

      fs.writeFileSync(buildFilePath, JSON.stringify(contents, null, 2));
    },
  }
};

export default config;
