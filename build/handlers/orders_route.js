"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var order_rest_1 = require("../modules/order_rest");
var dotenv_1 = __importDefault(require("dotenv"));
var authZuser_1 = __importDefault(require("../authmiddelware/authZuser"));
dotenv_1.default.config();
var secretToken = process.env.SECRET_TOKEN;
var oStore = new order_rest_1.Orders_store();
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                order = {
                    quantity: req.body.product_quantity,
                    statuse: req.body.order_status,
                    product_id: req.body.product_id,
                    user_id: req.body.user_id,
                };
                console.log(order);
                return [4 /*yield*/, oStore.create(order)];
            case 1:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, orders, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = parseInt(req.params.user_id);
                return [4 /*yield*/, oStore.showCurrentOrders(user_id)];
            case 1:
                orders = _a.sent();
                if (!orders) {
                    res.json('error in modules');
                }
                if (orders) {
                    res.json({
                        status: 'success',
                        data: __assign({}, orders),
                        message: 'user ordered',
                    });
                }
                else {
                    res.json({
                        status: 'no order',
                        message: 'user not ordered',
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(401); //unautherize
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getALL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderAll;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, oStore.getALL()];
            case 1:
                orderAll = _a.sent();
                res.json(orderAll);
                return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, auser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, oStore.deleteOrder(id)];
            case 1:
                auser = _a.sent();
                // if (!auser) {res.json('user id not found ')}
                res.json("auser deleted");
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, quantity, statues, product_id, user_id, orderupdate, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                quantity = parseInt(req.body.product_quantity);
                statues = req.body.order_status;
                product_id = parseInt(req.body.product_id);
                user_id = parseInt(req.body.user_id);
                return [4 /*yield*/, oStore.updateOrders(id, quantity, statues, product_id, user_id)];
            case 1:
                orderupdate = _a.sent();
                console.log(orderupdate);
                if (!orderupdate)
                    res.json('errrrrr');
                res.json({
                    states: 'succes',
                    data: orderupdate,
                    message: "auser updated",
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var orderRout = function (app) {
    app.get('/orders/', getALL);
    app.get('/orders/:user_id', authZuser_1.default, showOrders);
    app.post('/orders', create);
    app.delete('/orders/:id', deleteOrder);
    app.put('/orders/:id', updateOrders);
};
exports.default = orderRout;
