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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
const user_entity_1 = require("../user.entity");
const venue_entity_1 = require("../venue/venue.entity");
let BookingService = class BookingService {
    bookingRepository;
    userRepository;
    venueRepository;
    constructor(bookingRepository, userRepository, venueRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.venueRepository = venueRepository;
    }
    async create(createBookingDto) {
        const user = await this.userRepository.findOneBy({ id: createBookingDto.user_id });
        if (!user) {
            throw new common_1.NotFoundException('Користувач не знайдений');
        }
        const venue = await this.venueRepository.findOneBy({ id: createBookingDto.venue_id });
        if (!venue) {
            throw new common_1.NotFoundException('Стадіон не знайдений');
        }
        const booking = this.bookingRepository.create({
            ...createBookingDto,
            user,
            venue,
        });
        return this.bookingRepository.save(booking);
    }
    async findByUser(user_id) {
        return this.bookingRepository.find({ where: { user: { id: user_id } }, relations: ['venue'] });
    }
    async cancel(bookingId) {
        await this.bookingRepository.update(bookingId, { status: 'cancelled' });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(venue_entity_1.Venue)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map