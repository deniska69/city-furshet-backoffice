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

3. Change React entry point (`index.html`) from:

```html
<script type="module" src="/src/main.tsx"></script>
```

to

```html
<script type="module" src="/src/react/main.tsx"></script>
```

4. Add to `vite.config.ts`:

```js
build: {
    outDir: "dist-react",
}
```

5. Add `dist-react` to `.gitignore`

## Start dev mode

```
yarn dev
```

Open in browser: [http://localhost:5173/](http://localhost:5173/)
