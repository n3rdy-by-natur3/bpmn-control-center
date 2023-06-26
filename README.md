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

## Concepts
### Securing the password
The Camunda Rest API doesn't provide a token for authentication. That means we have to provide the username and password with every request (Http basic authentication).

But we don't want that the user has to enter his credentials every time a function is called from the REST API. And we also don't have an own backend for storing such things.

This is our way to provide security:
- we encrypt the password with a secret
- the encrypted password is stored within the session
- the encrypted secret is stored in a cookie for 12 hours
- we don't use signal words for the variable names in the session and the cookie

Everything is done in the AuthStore.js.

For sure with the Javascript code and access to someones browser you can steal the credentials. But we minimized the risk as much as we could.