# React + TypeScript + Vite + Electron

Desktop backoffice-app for [`City Furshet`](https://city-furshet.ru/)

## Install

1. Init [`Vite`](https://vite.dev/) & install all dependencies

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

4. Add to `vite.config.ts`:

```javascript
build: {
    base: "./",
    outDir: "dist-react",
}
```

5. Add `dist-react` to `.gitignore`.

6. Add scripts to `package.json`:

```javascript
scripts: {
    "dev:r": "vite",
    "dev:e": "electron .",
    "build": "tsc -b && vite build",
},
```

7. Add file `src/electron/main.js` to run Electron app:

```javascript
import { app, BrowserWindow } from "electron";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
});
```

## Start dev mode React

```
yarn dev:r
```

## Start dev mode Electron

> Before start Electron app: requreds build React app `yarn build`

```
yarn dev:e
```
