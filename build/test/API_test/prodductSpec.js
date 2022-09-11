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
var product_rest_1 = require("../../modules/product_rest");
var DBconnection_1 = __importDefault(require("../../DBconnection"));
var pStore = new product_rest_1.product_store();
describe('product Model', function () {
    // if functions found in product modules or not
    describe('product functions defined ', function () {
        it('should have an index method', function () {
            expect(pStore.index).toBeDefined();
        });
        it('should have a show method', function () {
            expect(pStore.show).toBeDefined();
        });
        it('should have a create method', function () {
            expect(pStore.create).toBeDefined();
        });
        it('should have a delete product method', function () {
            expect(pStore.delete).toBeDefined();
        });
        it('should have a update method', function () {
            expect(pStore.updateProduct).toBeDefined();
        });
    });
    describe('product  CRUD modules', function () {
        var testProduct = {
            product_name: 'eraser',
            price: 10,
            category: 'school'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pStore.create(testProduct.product_name, testProduct.price, testProduct.product_category)];
                    case 1:
                        createProduct = _a.sent();
                        testProduct.id = createProduct.id;
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
                        sql = "DELETE from products;";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('create products should return a new product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pStore.create('penciel', 10, 'school')];
                    case 1:
                        createuser = _a.sent();
                        expect(createuser).toEqual({
                            id: createuser.id,
                            product_name: 'penciel',
                            price: 10,
                            category: 'school',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('get all product data ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pStore.index()];
                    case 1:
                        product = _a.sent();
                        expect(product.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('get one product data ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var aproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pStore.show(testProduct.id)];
                    case 1:
                        aproduct = _a.sent();
                        expect(aproduct.id).toBe(testProduct.id);
                        expect(aproduct.product_name).toBe(testProduct.product_name);
                        expect(aproduct.price).toBe(testProduct.price);
                        expect(aproduct.product_category).toBe(testProduct.product_category);
                        return [2 /*return*/];
                }
            });
        }); });
        it('update product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pStore.updateProduct(testProduct.id, testProduct.product_name, testProduct.price, testProduct.product_category)];
                    case 1:
                        updateProduct = _a.sent();
                        expect(updateProduct.id).toBe(testProduct.id);
                        expect(updateProduct.product_name).toBe(testProduct.product_name);
                        expect(updateProduct.price).toBe(testProduct.price);
                        expect(updateProduct.product_category).toBe(testProduct.product_category);
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete a product data ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deleteproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pStore.delete(testProduct.id)];
                    case 1:
                        deleteproduct = _a.sent();
                        expect(deleteproduct.id).toBe(testProduct.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
