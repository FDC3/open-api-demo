# FDC3 Open Api Demo
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

## Contributing

1. Fork it (<https://github.com/FDC3/open-api-demo/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Read our [contribution guidelines](.github/CONTRIBUTING.md) and [Community Code of Conduct](https://www.finos.org/code-of-conduct)
4. Commit your changes (`git commit -am 'Add some fooBar'`)
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request

## License

The code in this repository is distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Copyright 2019 FDC3