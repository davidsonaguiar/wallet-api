"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardError = void 0;
var StandardError = /** @class */ (function (_super) {
    __extends(StandardError, _super);
    function StandardError(message, status) {
        var _this = _super.call(this, message) || this;
        _this.name = "ErrorStandard";
        _this.status = status;
        return _this;
    }
    StandardError.prototype.getStatus = function () {
        return this.status;
    };
    StandardError.badRequest = function (message) {
        return new StandardError(message, 400);
    };
    StandardError.conflict = function (message) {
        return new StandardError(message, 409);
    };
    StandardError.forbidden = function (message) {
        return new StandardError(message, 403);
    };
    StandardError.notFound = function (message) {
        return new StandardError(message, 404);
    };
    StandardError.unauthorized = function (message) {
        return new StandardError(message, 401);
    };
    return StandardError;
}(Error));
exports.StandardError = StandardError;
