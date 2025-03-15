"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const _1741898667622_CreateUserTable_1 = require("./migrations/1741898667622-CreateUserTable");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'mydb',
    entities: [user_entity_1.User],
    migrations: [_1741898667622_CreateUserTable_1.CreateUserTable1741898667622],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map