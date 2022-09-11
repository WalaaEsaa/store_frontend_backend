"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_rest_1 = require("../../modules/user_rest");
var uStore = new user_rest_1.User_Store();
describe('user Model', function () {
    // if functions found in user modules or not
    describe('users functions defined ', function () {
        it('should have an index method', function () {
            expect(uStore.index).toBeDefined();
        });
        it('should have a show method', function () {
            expect(uStore.show).toBeDefined();
        });
        it('should have a create method', function () {
            expect(uStore.create).toBeDefined();
        });
        it('should have a delete user method', function () {
            expect(uStore.destory).toBeDefined();
        });
        it('should have a log in method', function () {
            expect(uStore.authenticate).toBeDefined();
        });
        it('should have a update method', function () {
            expect(uStore.update).toBeDefined();
        });
    });
});
