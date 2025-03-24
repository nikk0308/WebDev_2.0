"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const venue_module_1 = require("./venue/venue.module");
const booking_module_1 = require("./booking/booking.module");
const post_module_1 = require("./post/post.module");
const image_processing_module_1 = require("./image-processing/image-processing.module");
const venue_entity_1 = require("./venue/venue.entity");
const booking_entity_1 = require("./booking/booking.entity");
const post_entity_1 = require("./post/post.entity");
const available_slot_entity_1 = require("./venue/available-slot.entity");
const comment_entity_1 = require("./post/comment.entity");
const like_entity_1 = require("./post/like.entity");
const venue_service_1 = require("./venue/venue.service");
const venue_controller_1 = require("./venue/venue.controller");
const booking_service_1 = require("./booking/booking.service");
const booking_controller_1 = require("./booking/booking.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'postgres',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'mydb',
                entities: [user_entity_1.User, venue_entity_1.Venue, booking_entity_1.Booking, post_entity_1.Post, available_slot_entity_1.AvailableSlot, comment_entity_1.Comment, like_entity_1.Like],
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, venue_entity_1.Venue, booking_entity_1.Booking, available_slot_entity_1.AvailableSlot]),
            venue_module_1.VenueModule,
            booking_module_1.BookingModule,
            post_module_1.PostModule,
            image_processing_module_1.ImageProcessingModule,
        ],
        controllers: [users_controller_1.UsersController, venue_controller_1.VenueController, booking_controller_1.BookingController],
        providers: [users_service_1.UsersService, venue_service_1.VenueService, booking_service_1.BookingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map