"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableSlot = void 0;
const typeorm_1 = require("typeorm");
const venue_entity_1 = require("./venue.entity");
let AvailableSlot = class AvailableSlot {
    id;
    venue;
    start_time;
    end_time;
    is_available;
};
exports.AvailableSlot = AvailableSlot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AvailableSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.Venue, venue => venue.slots),
    __metadata("design:type", venue_entity_1.Venue)
], AvailableSlot.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AvailableSlot.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AvailableSlot.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], AvailableSlot.prototype, "is_available", void 0);
exports.AvailableSlot = AvailableSlot = __decorate([
    (0, typeorm_1.Entity)()
], AvailableSlot);
//# sourceMappingURL=available-slot.entity.js.map