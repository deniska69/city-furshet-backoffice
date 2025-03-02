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

```
<script type="module" src="/src/main.tsx"></script>
```

to

```
<script type="module" src="/src/react/main.tsx"></script>
```

4. Add to `vite.config.ts`:

```
build: {
    outDir: "dist-react",
}
```

## Start dev mode

```
yarn dev
```

Open in browser: [http://localhost:5173/](http://localhost:5173/)
