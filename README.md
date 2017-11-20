# open-api-demo
Demonstration/Prototype of the FDC3 proposed Open API

## setup
```
npm install
npm start
cd demo
openfin -l app.json
```

## usage

The *open* API will resolve an App name in the **Financial App Directory** and pass a context object to the called App.  If the App is already running, then just the context is passed, a second instance is not launched.

```javascript
fin.plugin.open("appName","context");
```

**Note:** Demo is currently using a plugin of the API as a shim.  Namespace of the *open* API is still TBD.