"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const _1741898667622_CreateUserTable_1 = require("./migrations/1741898667622-CreateUserTable");
const _1742414729093_CreateVenuesAndBookings_1 = require("./migrations/1742414729093-CreateVenuesAndBookings");
const _1742646024196_CreateBookingTable_1 = require("./migrations/1742646024196-CreateBookingTable");
const venue_entity_1 = require("./venue/venue.entity");
const booking_entity_1 = require("./booking/booking.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'mydb',
    entities: [user_entity_1.User, venue_entity_1.Venue, booking_entity_1.Booking],
    migrations: [_1741898667622_CreateUserTable_1.CreateUserTable1741898667622, _1742414729093_CreateVenuesAndBookings_1.CreateVenuesAndBookings1742414729093, _1742646024196_CreateBookingTable_1.CreateBookingTable1742646024196],
    synchronize: false,
    migrationsRun: true,
    logging: true,
});
//# sourceMappingURL=data-source.js.map