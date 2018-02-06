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

The *fdc3.open* API will resolve an App name and/or intent in the **Financial App Directory** and pass a context object to the called App.  If the App is already running, then just the context is passed, a second instance is not launched.

The *fdc3.get* API will return any number of matching records from the **Financial App Directory**.  It will match on string searches for *name* and matches on *intent*.   ToDO: more robust name and intent filtering.

```javascript
fdc3.open(appname,intent,context);

fdc3.get(name, intent);
//returns promise
```

**Note:** Demo is currently using a plugin of the API as a shim.  Namespace of the *open* API is still TBD.