#!/bin/sh

curl -d '{}' -X POST sqlitedocker-node-1:3000/api/table
echo -en '\n'
curl sqlitedocker-node-1:3000/api/users
echo -en '\n'
curl -d '{"name": "John Doe","email": "jondoe@gamil.com","phone": "067765434567","address": "John Doe Street, Innsbruck","country": "Austria"}' -H "Content-Type: application/json" -X POST sqlitedocker-node-1:3000/api/users
echo -en '\n'
curl -d '{"name": "John Doe","email": "jondoe@gamil.com","phone": "067765434567","address": "John Doe Street, Innsbruck","country": "Austria"}' -H "Content-Type: application/json" -X POST sqlitedocker-node-1:3000/api/users
echo -en '\n'
curl sqlitedocker-node-1:3000/api/users/2
echo -en '\n'
curl -X "DELETE" sqlitedocker-node-1:3000/api/users/2
echo -en '\n'
curl sqlitedocker-node-1:3000/api/users