# api
API Example with TypeScript &amp; NodeJS

#### System Depencendies:
- NodesJS >= 12.16.3
- MongoDB >= 4.1.2

#### Install & run

`$ npm install`
`$ npm run build`
`$ npm run start`

#### Development or Production
`$ npm run run`
`$ npm run build&run`

#### Migrations
Migrations can be only executed from dist folder, as the depenendy doesn't recognize typescript file extension. Migrations class has been used to initialize database structure upon first start, but can be used in cli.

`$ npm run migrate:run:up`

`$ npm run migrate:run:down`

`$ npx db-migrate -e dev -m ./dist/services/migrations -v --config ./database.json create new_entitiy_table`


#### Features

- Account Authorization ( jwt )
- User Management RestFull API
- Roles & Permissions RestFull API
