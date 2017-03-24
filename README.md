# PedalPath Server

This is a basic template for creating CRUD Node APIs which serve data from MongoDB using Mongoose

# Overview

This application uses inheritance based handling of endpoints. When a request comes in it calls a method on an Endpoint which then calls a method of a Service which will then use methods found on a Model which is an extension of a mongoose model. To see the base classes take a look in `server/utilities`. These base classes are overwritten with custom functionality in `server/api/model`. If there are no custom classes found then the base class is used this loading logic is performed by `server/routes.js`

# Development

## Installation 

```
npm install
```

## Server

```
npm start
```

## Testing

```
npm test
```

## Test Driven Develoment

```
npm run tdd
```

# Licence

Scafolding created by Henry. Give credit where due