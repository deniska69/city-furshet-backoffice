# React + TypeScript + Vite + Electron

Desktop backoffice-app for [`City Furshet`](https://city-furshet.ru/)

## Install

1. Init [`Vite + React + TypeScript`](https://vite.dev/) & install all dependencies

```
yarn create vite
```

```
yarn install
```

2. Move all files from `src` to `src/react`

```
cd src &&
shopt -s extglob &&
mkdir react &&
mv !(react) react &&
cd ..
```

3. Change React entry point `index.html` from:

```html
<script type="module" src="/src/main.tsx"></script>
```

to:

```html
<script type="module" src="/src/react/main.tsx"></script>
```

4. Add rules to `vite.config.ts`:

```json
"build": {
    "base": "./",
    "outDir": "dist-react",
}
```

5. Add `dist`, `dist-react` and `dist-electron` to `.gitignore`.

6. Add scripts to `package.json`:

```json
"scripts": {
    "dev:r": "vite",
    "build:r": "tsc -b && vite build",
    "build:r:ts": "tsc -b && vite build && rm -rf dist-react",
    "preview:r": "vite preview",
    "dev:e": "electron .",
    "transpile:e": "tsc --project src/electron/tsconfig.json",
    "build:e:win": "npm run transpile:e && npm run build:r && electron-builder --win --x64"
}
```

7. Add file `src/electron/main.ts` to run Electron app:

```javascript
import { app, BrowserWindow } from "electron";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
});
```

8. Add `TS` config for Electron app to `src/electron/tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ESNext",
    "module": "NodeNext",
    "outDir": "../../dist-electron",
    "skipLibCheck": true
  }
}
```

9. Add `TS` rule to `tsconfig.app.json` and `tsconfig.node.json`:

```json
{
  "exclude": ["src/electron"]
}
```

10. Add Electron libs:

```

yarn add -D electron electron-builder

```

## Start dev mode React

```

yarn dev:r

```

## Start dev mode Electron

```

yarn dev:e

```

## Build poduction Electron app for Windows OS

```

yarn build:e:win

```
