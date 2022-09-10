"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_rest_1 = require("../../modules/product_rest");
var pStore = new product_rest_1.product_store();
describe("product Model", function () {
    // if functions found in product modules or not
    describe("product functions defined ", function () {
        it('should have an index method', function () {
            expect(pStore.index).toBeDefined();
        });
        it('should have a show method', function () {
            expect(pStore.show).toBeDefined();
        });
        it('should have a create method', function () {
            expect(pStore.create).toBeDefined();
        });
        it('should have a delete user method', function () {
            expect(pStore.delete).toBeDefined();
        });
        it('should have a update method', function () {
            expect(pStore.updateProduct).toBeDefined();
        });
    });
});
