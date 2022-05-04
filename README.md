# Monujo

## What is Monujo

Monujo is a wallet app for [local
currencies](https://en.wikipedia.org/wiki/Local_currency) provided by
[Lokavaluto](https://lokavaluto.fr/) an association gathering local
currencies.

It support deploying as a web app or, thanks to
[capacitor](https://capacitorjs.com/docs) as a mobile phone app
(android and iOS).

It is a graphical user interface relying on an administrative backend
(currently [odoo](https://www.odoo.com/), through [lokavaluto's
addons](https://github.com/Lokavaluto/lokavaluto-addons)) and one or
several transaction backends (currently supporting
[com-chain](https://www.com-chain.org/) and
[cyclos](https://www.cyclos.org/)).

It is written in [typescript](https://www.typescriptlang.org/)
leveraging [VueJS](https://vuejs.org/) for the GUI and
[vuex](https://vuex.vuejs.org/) for the reactive store. The
communication towards the different backends and odoo is abstracted by
the [lokapi](https://github.com/Lokavaluto/lokapi) library.

## Getting Started

### Project setup

To gather all dependencies to build the app and tools for development
you need to run the following command:

```
npm install
```

### Deploying the app for development on computer

The following command transpiles and serve the app with hot-reload
feature:

```
npm run serve
```

You'll need to provide a valid `public/config.json` along the live assets
to run the app.

Yon can find an example in `public/config.sample.json`.

### Building assets for production (web or mobile)

This will compile and produce the final javascript and css files in
`dist/` from the typescript files in `src/` and assets of the
`public/` directory.

```
npm run build
```

Note that if you provided a `public/config.json` file prior to running
the build command, you'll end up having a copy in `dist/config.json`
along your release file.

#### Web deployment

When serving these files (on any front-end), you'll need to make sure
you provided a `config.json` along with the content of the `dist`
directory.

You can find an example of a valid configuration file in
`public/config.sample.json`.

#### Baking the release into a mobile app

In order to be able to build the mobile app from the content of the
`dist/` directory, you will need to follow these instructions first:

[capacitor environment setup
instructions](https://capacitorjs.com/docs/getting-started/environment-setup)

Note that the `npm install` command you did to setup the project,
installs `cap` and `cordova-res` which we will use in the next
steps. Please note that these commands all accept the platform (`ios`
or `android`) as first argument, and will ask for it if it can't apply
to all platform at once.

##### Generating splash screens and icons

Put your icon and splash files in `resources/icon.png` and
`resources/splash.png` respectively (see the files for minimum sizes)
and then run:

```
npx cordova-res --skip-config --copy
```

##### Customization

We'll need to bake in the `config.json`, so make sure to provide a
fully configured `dist/config.json` file.

Note that you can theme your app's colors, you might want to check the
`public/config.sample.json` for a complete example of customizing
your theme and the main variable.

##### Sync app folders with the build assets

This will copy the assets from `dist/` folder into the android and iOS
directories and make sure the platforms have all their needed
dependencies

```
npx cap sync
```

##### Run in simulator or physical device

The following command will prompt you to choose from a list of
installed simulators or your physical device(s) if connected via USB
cable and properly set up.

```
npx cap run
```

You should then be able to test the app.

##### Using full platform specific user interfaces

If you have installed the required studios (graphical user interface),
you can open it through:

```
npx cap open
```

From there you can sign package, upload to store, etc... the way you
would do it for any mobile app.
