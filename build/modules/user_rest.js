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
exports.User_Store = exports.hashPassword = void 0;
var DBconnection_1 = __importDefault(require("../DBconnection"));
var bcrypt_1 = __importDefault(require("bcrypt"));
/*
Users
Index [token required]
Show [token required]
Create N[token required]

id
firstName
lastName
password
*/
var saltRound = process.env.SALT_AROUND;
var pepper = process.env.SECRET_PASSWORD;
var hashPassword = function (password) {
    var salt = parseInt(saltRound, 10);
    return bcrypt_1.default.hashSync("".concat(password).concat(pepper), salt);
};
exports.hashPassword = hashPassword;
var User_Store = /** @class */ (function () {
    function User_Store() {
    }
    User_Store.prototype.create = function (firstName, lastName, userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "INSERT INTO users (firstname,lastname,username,userpassword) VALUES($1,$2,$3,$4) RETURNING *";
                        return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                firstName,
                                lastName,
                                userName,
                                (0, exports.hashPassword)(password),
                            ])];
                    case 2:
                        result = _a.sent();
                        console.log((0, exports.hashPassword)(password));
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("can not insert new user ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User_Store.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT userpassword FROM users WHERE username=($1)';
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            user = result.rows[0];
                            if (bcrypt_1.default.compareSync("".concat(password).concat(pepper), user.userpassword)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    User_Store.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT firstname,lastname,username FROM users';
                        return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        user = result.rows;
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("can not show suer ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User_Store.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT firstname,lastname,username,userpassword FROM  users WHERE id=($1)';
                        return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("can not show a spesific user ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User_Store.prototype.destory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM  users WHERE id=($1)';
                        return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("can not deleted a spesific user ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User_Store.prototype.update = function (id, firstName, lastName, userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "UPDATE users SET \n            id=($1),  \n            firstname=($2),\n             lastname=($3),\n             username=($4), \n             userpassword=($5)\n             WHERE id=($1) \n             RETURNING *";
                        return [4 /*yield*/, DBconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                id,
                                firstName,
                                lastName,
                                userName,
                                (0, exports.hashPassword)(password),
                            ])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("can not update a spesific user ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return User_Store;
}());
exports.User_Store = User_Store;
