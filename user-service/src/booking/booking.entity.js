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
exports.Booking = void 0;
// src/booking/booking.entity.ts
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user.entity");
var venue_entity_1 = require("../venue/venue.entity");
var Booking = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('bookings')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _venue_decorators;
    var _venue_initializers = [];
    var _venue_extraInitializers = [];
    var _start_time_decorators;
    var _start_time_initializers = [];
    var _start_time_extraInitializers = [];
    var _end_time_decorators;
    var _end_time_initializers = [];
    var _end_time_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var Booking = _classThis = /** @class */ (function () {
        function Booking_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0)); // Поле `user` повинно бути визначене
            this.venue = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _venue_initializers, void 0));
            this.start_time = (__runInitializers(this, _venue_extraInitializers), __runInitializers(this, _start_time_initializers, void 0));
            this.end_time = (__runInitializers(this, _start_time_extraInitializers), __runInitializers(this, _end_time_initializers, void 0));
            this.status = (__runInitializers(this, _end_time_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.created_at = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
        return Booking_1;
    }());
    __setFunctionName(_classThis, "Booking");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.bookings; })];
        _venue_decorators = [(0, typeorm_1.ManyToOne)(function () { return venue_entity_1.Venue; }, function (venue) { return venue.id; })];
        _start_time_decorators = [(0, typeorm_1.Column)()];
        _end_time_decorators = [(0, typeorm_1.Column)()];
        _status_decorators = [(0, typeorm_1.Column)({ default: 'pending' })];
        _created_at_decorators = [(0, typeorm_1.Column)({ default: function () { return 'CURRENT_TIMESTAMP'; } })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _venue_decorators, { kind: "field", name: "venue", static: false, private: false, access: { has: function (obj) { return "venue" in obj; }, get: function (obj) { return obj.venue; }, set: function (obj, value) { obj.venue = value; } }, metadata: _metadata }, _venue_initializers, _venue_extraInitializers);
        __esDecorate(null, null, _start_time_decorators, { kind: "field", name: "start_time", static: false, private: false, access: { has: function (obj) { return "start_time" in obj; }, get: function (obj) { return obj.start_time; }, set: function (obj, value) { obj.start_time = value; } }, metadata: _metadata }, _start_time_initializers, _start_time_extraInitializers);
        __esDecorate(null, null, _end_time_decorators, { kind: "field", name: "end_time", static: false, private: false, access: { has: function (obj) { return "end_time" in obj; }, get: function (obj) { return obj.end_time; }, set: function (obj, value) { obj.end_time = value; } }, metadata: _metadata }, _end_time_initializers, _end_time_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Booking = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Booking = _classThis;
}();
exports.Booking = Booking;
