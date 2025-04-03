"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./user.entity");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./users.service");
var venue_module_1 = require("./venue/venue.module");
var booking_module_1 = require("./booking/booking.module");
var post_module_1 = require("./post/post.module");
var image_processing_module_1 = require("./image-processing/image-processing.module");
var venue_entity_1 = require("./venue/venue.entity");
var booking_entity_1 = require("./booking/booking.entity");
var post_entity_1 = require("./post/post.entity");
var available_slot_entity_1 = require("./venue/available-slot.entity");
var comment_entity_1 = require("./post/comment.entity");
var like_entity_1 = require("./post/like.entity");
var rabbitmq_module_1 = require("./rabbitmq/rabbitmq.module"); // Импортируем RabbitMQModule
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: '127.0.0.1',
                    port: 5432,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'mydb',
                    entities: [user_entity_1.User, venue_entity_1.Venue, booking_entity_1.Booking, post_entity_1.Post, available_slot_entity_1.AvailableSlot, comment_entity_1.Comment, like_entity_1.Like],
                    synchronize: true,
                }),
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, venue_entity_1.Venue, booking_entity_1.Booking, available_slot_entity_1.AvailableSlot]),
                venue_module_1.VenueModule,
                booking_module_1.BookingModule,
                post_module_1.PostModule,
                image_processing_module_1.ImageProcessingModule,
                rabbitmq_module_1.RabbitMQModule, // Добавляем RabbitMQModule
            ],
            controllers: [users_controller_1.UsersController],
            providers: [users_service_1.UsersService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
