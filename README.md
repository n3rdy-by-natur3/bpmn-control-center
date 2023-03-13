# BPMN Control Center
Monitoring the processes of your process engine (starting with Camunda, Flowable is planned). 

## Vue.js
### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

## License
This project is licensed under the terms of the MIT license.

## Get Started
### Configuration
You need a local configuration file `app.config.json` that contains the Camunda hosts.

Example:
```sh
{
  "hosts": [
    "http://localhost:8080/engine-rest"
  ]
}
```

If there is only one host name the application will start with this host globally configured.
Otherwise you have to choose the host at the dashboard.