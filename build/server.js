"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var product_route_1 = __importDefault(require("./handlers/product_route"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_route_1 = __importDefault(require("./handlers/user_route"));
var orders_route_1 = __importDefault(require("./handlers/orders_route"));
var order_product_rout_1 = __importDefault(require("./handlers/order_product_rout"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
var port = process.env.PORT || 5000;
app.get('', function (req, res) {
    res.json('server for my company ');
});
(0, order_product_rout_1.default)(app);
(0, user_route_1.default)(app);
(0, product_route_1.default)(app);
(0, orders_route_1.default)(app);
app.listen(port, function () {
    console.log("company server run on : http://localhost:".concat(port));
});
exports.default = app;
