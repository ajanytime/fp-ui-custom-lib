"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var Paginator = (function () {
    function Paginator() {
        this.rows = 0;
        this.pageLinkSize = 5;
        this.onPageChange = new core_1.EventEmitter();
        this._totalRecords = 0;
        this._first = 0;
    }
    Object.defineProperty(Paginator.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    Paginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    Paginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function () {
        this.changePage(0);
    };
    Paginator.prototype.changePageToPrev = function () {
        this.changePage(this.getPage() - 1);
    };
    Paginator.prototype.changePageToNext = function () {
        this.changePage(this.getPage() + 1);
    };
    Paginator.prototype.changePageToLast = function () {
        this.changePage(this.getPageCount() - 1);
    };
    Paginator.prototype.onRppChange = function (event) {
        this.rows = this.rowsPerPageOptions[event.target.selectedIndex];
        this.changePageToFirst();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "pageLinkSize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Paginator.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Paginator.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Paginator.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Paginator.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "totalRecords", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "first", null);
    Paginator = __decorate([
        core_1.Component({
            selector: 'p-paginator',
            template: "\n<ul [attr.style]=\"style\" class=\"pagination pagination-sm pull-right\">\n    <li #firstlink class=\"pagination-first page-item\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePageToFirst()\" [ngClass]=\"{'disabled':isFirstPage(),'ui-state-hover':(firstlink === hoveredItem && !isFirstPage())}\">\n        <a class=\"page-link\">First</a>\n    </li>\n    <li #prevlink class=\"pagination-prev page-item\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePageToPrev()\" [ngClass]=\"{'disabled':isFirstPage(),'ui-state-hover':(prevlink === hoveredItem && !isFirstPage())}\">\n        <a class=\"page-link\">Previous</a>\n    </li>\n    <li #plink *ngFor=\"let pageLink of pageLinks\" class=\"pagination-page page-item\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePage(pageLink - 1)\" [ngClass]=\"{'ui-state-hover':(plink === hoveredItem), 'active': (pageLink-1 == getPage())}\">\n        <a class=\"page-link\">{{pageLink}}</a>\n    </li>\n    <li #nextlink class=\"pagination-next page-item disabled\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePageToNext()\" [ngClass]=\"{'disabled':isLastPage(),'ui-state-hover':(nextlink === hoveredItem  && !isLastPage())}\">\n        <a class=\"page-link\">Next</a>\n    </li>\n    <li #lastlink class=\"pagination-last page-item disabled\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePageToLast()\" [ngClass]=\"{'disabled':isLastPage(),'ui-state-hover':(lastlink === hoveredItem  && !isLastPage())}\">\n        <a class=\"page-link\">Last</a>\n    </li>\n</ul>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Paginator);
    return Paginator;
}());
exports.Paginator = Paginator;
var PaginatorModule = (function () {
    function PaginatorModule() {
    }
    PaginatorModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Paginator],
            declarations: [Paginator]
        }), 
        __metadata('design:paramtypes', [])
    ], PaginatorModule);
    return PaginatorModule;
}());
exports.PaginatorModule = PaginatorModule;
//# sourceMappingURL=paginator.js.map