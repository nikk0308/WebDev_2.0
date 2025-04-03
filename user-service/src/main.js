"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
var users_service_1 = require("./users.service");
var venue_service_1 = require("./venue/venue.service");
var booking_service_1 = require("./booking/booking.service");
var common_1 = require("@nestjs/common");
var rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, rabbitMQService, _a, _b, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _d.sent();
                    rabbitMQService = app.get(rabbitmq_service_1.RabbitMQService);
                    // Подключаем глобальные пайпы
                    app.useGlobalPipes(new common_1.ValidationPipe());
                    // Запускаем HTTP-сервер
                    return [4 /*yield*/, app.listen(3000)];
                case 2:
                    // Запускаем HTTP-сервер
                    _d.sent();
                    _b = (_a = console).log;
                    _c = "Application is running on: ".concat;
                    return [4 /*yield*/, app.getUrl()];
                case 3:
                    _b.apply(_a, [_c.apply("Application is running on: ", [_d.sent()])]);
                    // Потребление сообщений из очереди
                    rabbitMQService.consumeMessages('user_service_queue', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                        var message, response, _a, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!msg) return [3 /*break*/, 17];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 14, 15, 16]);
                                    message = JSON.parse(msg.content.toString());
                                    response = void 0;
                                    _a = message.action;
                                    switch (_a) {
                                        case 'register': return [3 /*break*/, 2];
                                        case 'create_venue': return [3 /*break*/, 4];
                                        case 'create_booking': return [3 /*break*/, 6];
                                        case 'get_user_bookings': return [3 /*break*/, 8];
                                        case 'cancel_booking': return [3 /*break*/, 10];
                                    }
                                    return [3 /*break*/, 12];
                                case 2: return [4 /*yield*/, app.get(users_service_1.UsersService).register(message.data)];
                                case 3:
                                    response = _b.sent();
                                    return [3 /*break*/, 13];
                                case 4: return [4 /*yield*/, app.get(venue_service_1.VenueService).create(message.data)];
                                case 5:
                                    response = _b.sent();
                                    return [3 /*break*/, 13];
                                case 6: return [4 /*yield*/, app.get(booking_service_1.BookingService).create(message.data)];
                                case 7:
                                    response = _b.sent();
                                    return [3 /*break*/, 13];
                                case 8: return [4 /*yield*/, app.get(booking_service_1.BookingService).findByUser(message.user_id)];
                                case 9:
                                    response = _b.sent();
                                    return [3 /*break*/, 13];
                                case 10: return [4 /*yield*/, app.get(booking_service_1.BookingService).cancel(message.bookingId)];
                                case 11:
                                    response = _b.sent();
                                    return [3 /*break*/, 13];
                                case 12: throw new Error('Unknown action');
                                case 13:
                                    // Отправляем ответ обратно в очередь
                                    rabbitMQService.sendMessage(msg.properties.replyTo, response, { correlationId: msg.properties.correlationId });
                                    return [3 /*break*/, 16];
                                case 14:
                                    error_1 = _b.sent();
                                    console.error('Error processing message:', error_1.message);
                                    rabbitMQService.sendMessage(msg.properties.replyTo, { error: error_1.message }, { correlationId: msg.properties.correlationId });
                                    return [3 /*break*/, 16];
                                case 15:
                                    rabbitMQService.channel.ack(msg);
                                    return [7 /*endfinally*/];
                                case 16: return [3 /*break*/, 18];
                                case 17:
                                    console.error('Received null message from queue.');
                                    _b.label = 18;
                                case 18: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
