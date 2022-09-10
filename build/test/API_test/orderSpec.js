"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_rest_1 = require("../../modules/order_rest");
var oStore = new order_rest_1.Orders_store();
describe("user Model", function () {
    // if functions found in user modules or not
    describe("orders functions defined ", function () {
        it('should have an crate method', function () {
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
});
