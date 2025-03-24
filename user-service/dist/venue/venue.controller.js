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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueController = void 0;
const common_1 = require("@nestjs/common");
const venue_service_1 = require("./venue.service");
const create_venue_dto_1 = require("./dto/create-venue.dto");
let VenueController = class VenueController {
    venueService;
    constructor(venueService) {
        this.venueService = venueService;
    }
    async create(createVenueDto) {
        return this.venueService.create(createVenueDto);
    }
    findAll() {
        return this.venueService.findAll();
    }
    findSlots(id) {
        return this.venueService.findSlots(id);
    }
};
exports.VenueController = VenueController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_venue_dto_1.CreateVenueDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VenueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/slots'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VenueController.prototype, "findSlots", null);
exports.VenueController = VenueController = __decorate([
    (0, common_1.Controller)('venues'),
    __metadata("design:paramtypes", [venue_service_1.VenueService])
], VenueController);
//# sourceMappingURL=venue.controller.js.map