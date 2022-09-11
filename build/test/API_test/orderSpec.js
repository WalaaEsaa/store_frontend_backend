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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_rest_1 = require("../../modules/order_rest");
var DBconnection_1 = __importDefault(require("../../DBconnection"));
var user_rest_1 = require("../../modules/user_rest");
var product_rest_1 = require("../../modules/product_rest");
var oStore = new order_rest_1.Orders_store();
var uStore = new user_rest_1.User_Store();
var pStore = new product_rest_1.product_store();
describe('orders Model', function () {
    // if functions found in user modules or not
    describe('orders functions defined ', function () {
        it('should have an create method', function () {
            expect(oStore.create).toBeDefined();
        });
        it('should have a get all order method', function () {
            expect(oStore.getALL).toBeDefined();
        });
        it('should have a delete order method', function () {
            expect(oStore.deleteOrder).toBeDefined();
        });
        it('should have a show  order method', function () {
            expect(oStore.showCurrentOrders).toBeDefined();
        });
        it('should have a update order method', function () {
            expect(oStore.updateOrders).toBeDefined();
        });
    });
    describe('order  CRUD modules', function () {
        var testOrder = {
            quantity: 5,
            statuse: 'complete',
            product_id: 0,
            user_id: 0
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oStore.create(testOrder)];
                    case 1:
                        createOrder = _a.sent();
                        testOrder.id = createOrder.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE from orders;";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('create order should return a new order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oStore.create({
                            product_quantity: 5,
                            order_status: 'complete',
                            product_id: 0,
                            user_id: 0
                        })];
                    case 1:
                        createOrder = _a.sent();
                        expect(createOrder).toEqual({
                            id: createOrder.id,
                            product_quantity: 5,
                            order_status: 'complete',
                            product_id: 0,
                            user_id: 0
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('get all order data ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oStore.getALL()];
                    case 1:
                        orders = _a.sent();
                        expect(orders.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('get orders of an user  ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var anorder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oStore.showCurrentOrders(testOrder.user_id)];
                    case 1:
                        anorder = _a.sent();
                        expect(anorder === null || anorder === void 0 ? void 0 : anorder.length).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('update order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oStore.updateOrders(testOrder.id, testOrder.product_quantity, testOrder.order_status, testOrder.product_id, testOrder.user_id)];
                    case 1:
                        updateOrder = _a.sent();
                        expect(updateOrder.id).toBe(testOrder.id);
                        expect(updateOrder.product_quantity).toBe(testOrder.product_quantity);
                        expect(updateOrder.order_status).toBe(testOrder.order_status);
                        expect(updateOrder.product_id).toBe(testOrder.product_id);
                        expect(updateOrder.user_id).toBe(testOrder.user_id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete an order data ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deleteorder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oStore.deleteOrder(testOrder.id)];
                    case 1:
                        deleteorder = _a.sent();
                        expect(deleteorder.id).toBe(testOrder.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
