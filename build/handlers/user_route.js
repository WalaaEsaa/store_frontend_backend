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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_rest_1 = require("../modules/user_rest");
var dotenv_1 = __importDefault(require("dotenv"));
var authZuser_1 = __importDefault(require("../authmiddelware/authZuser"));
dotenv_1.default.config();
var secretToken = process.env.SECRET_TOKEN;
var uStore = new user_rest_1.User_Store();
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    userpassword: req.body.userpassword,
                };
                return [4 /*yield*/, uStore.create(user.firstname, user.lastname, user.username, user.userpassword)];
            case 1:
                newUser = _a.sent();
                //console.log(newUser);
                if (!newUser) {
                    res.json('data exit or error in data');
                }
                res.json(newUser);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                password = req.body.userpassword;
                return [4 /*yield*/, uStore.authenticate(username, password)];
            case 1:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, secretToken);
                // res.json(token)
                if (!user) {
                    res.status(401);
                    res.json('user un authinticate');
                }
                res.json({
                    status: 'success',
                    data: __assign(__assign({}, user), { token: token }),
                    message: 'user authintication',
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(401);
                res.json({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userAll;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, uStore.index()];
            case 1:
                userAll = _a.sent();
                res.json(userAll);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, auser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, uStore.show(id)];
            case 1:
                auser = _a.sent();
                if (!auser) {
                    res.json('user id not found ');
                }
                res.json(auser);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, auser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, uStore.destory(id)];
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
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, firstName, lastName, userName, password, auser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                firstName = req.body.firstname;
                lastName = req.body.lastname;
                userName = req.body.username;
                password = req.body.userpassword;
                return [4 /*yield*/, uStore.update(id, firstName, lastName, userName, password)];
            case 1:
                auser = _a.sent();
                // res.json(auser)
                //  console.log(auser)
                res.json({
                    states: 'succes',
                    data: auser,
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
var userRoutes = function (app) {
    app.post('/users', create);
    app.post('/users/login', authenticate);
    app.get('/users', authZuser_1.default, index);
    app.get('/users/:id', authZuser_1.default, show);
    app.delete('/users/:id', authZuser_1.default, destory);
    app.patch('/users/:id', update);
};
exports.default = userRoutes;
