(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JSZip"));
	else if(typeof define === 'function' && define.amd)
		define(["JSZip"], factory);
	else if(typeof exports === 'object')
		exports["docx"] = factory(require("JSZip"));
	else
		root["docx"] = factory(root["JSZip"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_jszip__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/docx-editor-core.ts":
/*!*********************************!*\
  !*** ./src/docx-editor-core.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocxEditorCore = void 0;
var document_parser_1 = __webpack_require__(/*! ../../src/document-parser */ "../src/document-parser.ts");
var html_renderer_1 = __webpack_require__(/*! ../../src/html-renderer */ "../src/html-renderer.ts");
var word_document_1 = __webpack_require__(/*! ../../src/word-document */ "../src/word-document.ts");
var docx_utils_1 = __webpack_require__(/*! ./docx-utils */ "./src/docx-utils.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var DocxEditorCore = (function () {
    function DocxEditorCore() {
        this.modified = false;
        this.mutationObserver = new MutationObserver(this.mutationCallback.bind(this));
        this.parser = new document_parser_1.DocumentParser();
        this.renderer = new html_renderer_1.HtmlRenderer(window.document);
        this.parser.keepOrigin = true;
        this.renderer.keepOrigin = true;
    }
    DocxEditorCore.prototype.init = function (contentContainer, styleContainer) {
        this.contentContainer = contentContainer;
        this.styleContainer = styleContainer;
        contentContainer.setAttribute("contentEditable", "");
        contentContainer.addEventListener("keydown", this.onKeyDown);
    };
    DocxEditorCore.prototype.open = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.modified = false;
                        this.mutationObserver.disconnect();
                        this.fileName = content.name;
                        _a = this;
                        return [4, word_document_1.WordDocument.load(content, this.parser, {
                                keepOrigin: true
                            })];
                    case 1:
                        _a.document = _b.sent();
                        this.renderer.render(this.document, this.contentContainer, this.styleContainer, {
                            ignoreHeight: true,
                            breakPages: false
                        });
                        this.mutationObserver.observe(this.contentContainer, {
                            attributes: false,
                            childList: true,
                            subtree: true,
                            characterData: true
                        });
                        return [2];
                }
            });
        });
    };
    DocxEditorCore.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.modified) {
                            this.document.documentPart.save();
                        }
                        return [4, this.document.save()];
                    case 1:
                        blob = _a.sent();
                        return [2, this.fileName ? new File([blob], this.fileName) : blob];
                }
            });
        });
    };
    DocxEditorCore.prototype.mutationCallback = function (mutations) {
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var mutation = mutations_1[_i];
            var target = mutation.target;
            var docxElement = utils_1.getDocxElement(target);
            switch (mutation.type) {
                case "characterData":
                    this.updateText(docxElement, target.textContent);
                    break;
                case "childList":
                    var elems = Array.from(mutation.removedNodes).map(function (n) { return n.$$docxElement; }).filter(function (x) { return x; });
                    this.removeChildren(docxElement, elems);
                    break;
            }
            console.log(mutation);
        }
        this.modified = true;
    };
    DocxEditorCore.prototype.updateText = function (elem, text) {
        utils_1.getXmlElement(elem).textContent = text;
    };
    DocxEditorCore.prototype.removeChildren = function (elem, children) {
        elem.children = elem.children.filter(function (c) { return !children.includes(c); });
        for (var _i = 0, _a = children.map(function (c) { return c.$$source; }).filter(function (x) { return x; }); _i < _a.length; _i++) {
            var cs = _a[_i];
            cs.remove();
        }
    };
    DocxEditorCore.prototype.onKeyDown = function (event) {
        if (event.ctrlKey) {
            return utils_1.preventAndstop(event);
        }
        return true;
    };
    DocxEditorCore.prototype.bold = function () {
        for (var _i = 0, _a = utils_1.getSelectionRanges(); _i < _a.length; _i++) {
            var r = _a[_i];
            var text = utils_1.getDocxElement(r.startContainer);
            docx_utils_1.splitRuns(text, r.startOffset);
        }
        this.modified = true;
    };
    DocxEditorCore.prototype.findOrCreateElement = function (elem, localName) {
        var result = Array.from(elem.childNodes).find(function (e) { return e.nodeType === 1 && e.localName == localName; });
        if (result == null) {
            result = elem.ownerDocument.createElementNS(elem.namespaceURI, localName);
            elem.insertBefore(result, elem.firstChild);
        }
        return result;
    };
    return DocxEditorCore;
}());
exports.DocxEditorCore = DocxEditorCore;


/***/ }),

/***/ "./src/docx-utils.ts":
/*!***************************!*\
  !*** ./src/docx-utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitRuns = void 0;
var run_1 = __webpack_require__(/*! ../../src/document/run */ "../src/document/run.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function splitRuns(text, index) {
    var run = text.parent;
    if (run.children.length === 1 && (index === 0 || index === text.text.length - 1))
        return [run];
    var paragraph = run.parent;
    var xRun = utils_1.getXmlElement(run);
    var newRun = Object.assign(new run_1.WmlRun(), run);
    var runIndex = paragraph.children.indexOf(run);
    var textIndex = newRun.children.indexOf(text);
    var xNewRun = xRun.cloneNode(true);
    xRun.after(xNewRun);
    utils_1.setXmlElement(newRun, xNewRun);
    paragraph.children = paragraph.children.splice(runIndex, 0, newRun);
    return [run, newRun];
}
exports.splitRuns = splitRuns;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setXmlElement = exports.getXmlElement = exports.getDocxElement = exports.getSelectionRanges = exports.preventAndstop = void 0;
function preventAndstop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
}
exports.preventAndstop = preventAndstop;
function getSelectionRanges() {
    var selection = window.getSelection();
    var result = [];
    for (var i = 0, l = selection.rangeCount; i < l; i++) {
        result.push(selection.getRangeAt(i));
    }
    return result;
}
exports.getSelectionRanges = getSelectionRanges;
function getDocxElement(elem) {
    return elem.$$docxElement;
}
exports.getDocxElement = getDocxElement;
function getXmlElement(elem) {
    return elem.$$xmlElement;
}
exports.getXmlElement = getXmlElement;
function setXmlElement(elem, xml) {
    elem.$$xmlElement = xml;
}
exports.setXmlElement = setXmlElement;


/***/ }),

/***/ "../src/common/open-xml-package.ts":
/*!*****************************************!*\
  !*** ../src/common/open-xml-package.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenXmlPackage = void 0;
var JSZip = __webpack_require__(/*! jszip */ "jszip");
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
var utils_1 = __webpack_require__(/*! ../utils */ "../src/utils.ts");
var relationship_1 = __webpack_require__(/*! ./relationship */ "../src/common/relationship.ts");
var OpenXmlPackage = (function () {
    function OpenXmlPackage(_zip, options) {
        this._zip = _zip;
        this.options = options;
        this.xmlParser = new xml_parser_1.XmlParser();
    }
    OpenXmlPackage.prototype.get = function (path) {
        return this._zip.files[normalizePath(path)];
    };
    OpenXmlPackage.prototype.update = function (path, content) {
        this._zip.file(path, content);
    };
    OpenXmlPackage.load = function (input, options) {
        return JSZip.loadAsync(input).then(function (zip) { return new OpenXmlPackage(zip, options); });
    };
    OpenXmlPackage.prototype.save = function (type) {
        if (type === void 0) { type = "blob"; }
        return this._zip.generateAsync({ type: type });
    };
    OpenXmlPackage.prototype.load = function (path, type) {
        var _a, _b;
        if (type === void 0) { type = "string"; }
        return (_b = (_a = this.get(path)) === null || _a === void 0 ? void 0 : _a.async(type)) !== null && _b !== void 0 ? _b : Promise.resolve(null);
    };
    OpenXmlPackage.prototype.loadRelationships = function (path) {
        var _this = this;
        if (path === void 0) { path = null; }
        var relsPath = "_rels/.rels";
        if (path != null) {
            var _a = utils_1.splitPath(path), f = _a[0], fn = _a[1];
            relsPath = f + "_rels/" + fn + ".rels";
        }
        return this.load(relsPath)
            .then(function (txt) { return txt ? relationship_1.parseRelationships(_this.parseXmlDocument(txt).firstElementChild, _this.xmlParser) : null; });
    };
    OpenXmlPackage.prototype.parseXmlDocument = function (txt) {
        return xml_parser_1.parseXmlString(txt, this.options.trimXmlDeclaration);
    };
    return OpenXmlPackage;
}());
exports.OpenXmlPackage = OpenXmlPackage;
function normalizePath(path) {
    return path.startsWith('/') ? path.substr(1) : path;
}


/***/ }),

/***/ "../src/common/part.ts":
/*!*****************************!*\
  !*** ../src/common/part.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Part = void 0;
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
var Part = (function () {
    function Part(_package, path) {
        this._package = _package;
        this.path = path;
    }
    Part.prototype.load = function () {
        var _this = this;
        return Promise.all([
            this._package.loadRelationships(this.path).then(function (rels) {
                _this.rels = rels;
            }),
            this._package.load(this.path).then(function (text) {
                var xmlDoc = _this._package.parseXmlDocument(text);
                if (_this._package.options.keepOrigin) {
                    _this._xmlDocument = xmlDoc;
                }
                _this.parseXml(xmlDoc.firstElementChild);
            })
        ]);
    };
    Part.prototype.save = function () {
        this._package.update(this.path, xml_parser_1.serializeXmlString(this._xmlDocument));
    };
    Part.prototype.parseXml = function (root) {
    };
    return Part;
}());
exports.Part = Part;


/***/ }),

/***/ "../src/common/relationship.ts":
/*!*************************************!*\
  !*** ../src/common/relationship.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseRelationships = exports.RelationshipTypes = void 0;
var RelationshipTypes;
(function (RelationshipTypes) {
    RelationshipTypes["OfficeDocument"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
    RelationshipTypes["FontTable"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable";
    RelationshipTypes["Image"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
    RelationshipTypes["Numbering"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering";
    RelationshipTypes["Styles"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
    RelationshipTypes["StylesWithEffects"] = "http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects";
    RelationshipTypes["Theme"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
    RelationshipTypes["Settings"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings";
    RelationshipTypes["WebSettings"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings";
    RelationshipTypes["Hyperlink"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink";
    RelationshipTypes["Footer"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer";
    RelationshipTypes["Header"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header";
    RelationshipTypes["ExtendedProperties"] = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
    RelationshipTypes["CoreProperties"] = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
})(RelationshipTypes = exports.RelationshipTypes || (exports.RelationshipTypes = {}));
function parseRelationships(root, xmlParser) {
    return xmlParser.elements(root).map(function (e) { return ({
        id: xmlParser.attr(e, "Id"),
        type: xmlParser.attr(e, "Type"),
        target: xmlParser.attr(e, "Target"),
        targetMode: xmlParser.attr(e, "TargetMode")
    }); });
}
exports.parseRelationships = parseRelationships;


/***/ }),

/***/ "../src/document-parser.ts":
/*!*********************************!*\
  !*** ../src/document-parser.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentParser = exports.autos = void 0;
var utils = __webpack_require__(/*! ./utils */ "../src/utils.ts");
var document_1 = __webpack_require__(/*! ./document/document */ "../src/document/document.ts");
var paragraph_1 = __webpack_require__(/*! ./document/paragraph */ "../src/document/paragraph.ts");
var xml_parser_1 = __webpack_require__(/*! ./parser/xml-parser */ "../src/parser/xml-parser.ts");
var run_1 = __webpack_require__(/*! ./document/run */ "../src/document/run.ts");
var hyperlink_1 = __webpack_require__(/*! ./document/hyperlink */ "../src/document/hyperlink.ts");
var table_cell_1 = __webpack_require__(/*! ./document/table-cell */ "../src/document/table-cell.ts");
var table_1 = __webpack_require__(/*! ./document/table */ "../src/document/table.ts");
var drawing_1 = __webpack_require__(/*! ./document/drawing */ "../src/document/drawing.ts");
var table_row_1 = __webpack_require__(/*! ./document/table-row */ "../src/document/table-row.ts");
var xml_serialize_1 = __webpack_require__(/*! ./parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var footer_1 = __webpack_require__(/*! ./footer/footer */ "../src/footer/footer.ts");
var header_1 = __webpack_require__(/*! ./header/header */ "../src/header/header.ts");
exports.autos = {
    shd: "white",
    color: "black",
    highlight: "transparent"
};
var DocumentParser = (function () {
    function DocumentParser() {
        this.skipDeclaration = true;
        this.ignoreWidth = false;
        this.debug = false;
        this.keepOrigin = false;
    }
    DocumentParser.prototype.deserialize = function (elem, output) {
        return xml_serialize_1.deserializeElement(elem, output, { keepOrigin: this.keepOrigin });
    };
    DocumentParser.prototype.parseDocumentFile = function (xmlDoc) {
        var xbody = xml_parser_1.default.element(xmlDoc, "body");
        var result = new document_1.WmlDocument();
        result.body = this.deserialize(xbody, new document_1.WmlBody());
        this.parseBodyElements(xbody, result.body);
        return result;
    };
    DocumentParser.prototype.parseFooter = function (xmlDoc) {
        return this.parseBodyElements(xmlDoc, new footer_1.WmlFooter());
    };
    DocumentParser.prototype.parseHeader = function (xmlDoc) {
        return this.parseBodyElements(xmlDoc, new header_1.WmlHeader());
    };
    DocumentParser.prototype.parseBodyElements = function (elem, output) {
        for (var _i = 0, _a = xml_parser_1.default.elements(elem); _i < _a.length; _i++) {
            var e = _a[_i];
            switch (e.localName) {
                case "p":
                    output.children.push(this.parseParagraph(e));
                    break;
                case "tbl":
                    output.children.push(this.parseTable(e));
                    break;
            }
        }
        return output;
    };
    DocumentParser.prototype.parseStylesFile = function (xstyles) {
        var _this = this;
        var result = [];
        xml.foreach(xstyles, function (n) {
            switch (n.localName) {
                case "style":
                    result.push(_this.parseStyle(n));
                    break;
                case "docDefaults":
                    result.push(_this.parseDefaultStyles(n));
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseDefaultStyles = function (node) {
        var _this = this;
        var result = {
            id: null,
            name: null,
            target: null,
            basedOn: null,
            styles: []
        };
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "rPrDefault":
                    var rPr = xml_parser_1.default.element(c, "rPr");
                    if (rPr)
                        result.styles.push({
                            target: "span",
                            values: _this.parseDefaultProperties(rPr, {})
                        });
                    break;
                case "pPrDefault":
                    var pPr = xml_parser_1.default.element(c, "pPr");
                    if (pPr)
                        result.styles.push({
                            target: "p",
                            values: _this.parseDefaultProperties(pPr, {})
                        });
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseStyle = function (node) {
        var _this = this;
        var result = {
            id: xml.stringAttr(node, "styleId"),
            isDefault: xml.boolAttr(node, "default"),
            name: null,
            target: null,
            basedOn: null,
            styles: [],
            linked: null
        };
        switch (xml.stringAttr(node, "type")) {
            case "paragraph":
                result.target = "p";
                break;
            case "table":
                result.target = "table";
                break;
            case "character":
                result.target = "span";
                break;
        }
        xml.foreach(node, function (n) {
            switch (n.localName) {
                case "basedOn":
                    result.basedOn = xml.className(n, "val");
                    break;
                case "name":
                    result.name = xml.stringAttr(n, "val");
                    break;
                case "link":
                    result.linked = xml.className(n, "val");
                    break;
                case "next":
                    result.next = xml.className(n, "val");
                    break;
                case "aliases":
                    result.aliases = xml.stringAttr(n, "val").split(",");
                    break;
                case "pPr":
                    result.styles.push({
                        target: "p",
                        values: _this.parseDefaultProperties(n, {})
                    });
                    result.paragraphProps = paragraph_1.parseParagraphProperties(n, xml_parser_1.default);
                    break;
                case "rPr":
                    result.styles.push({
                        target: "span",
                        values: _this.parseDefaultProperties(n, {})
                    });
                    result.runProps = run_1.parseRunProperties(n, xml_parser_1.default);
                    break;
                case "tblPr":
                case "tcPr":
                    result.styles.push({
                        target: "td",
                        values: _this.parseDefaultProperties(n, {})
                    });
                    break;
                case "tblStylePr":
                    for (var _i = 0, _a = _this.parseTableStyle(n); _i < _a.length; _i++) {
                        var s = _a[_i];
                        result.styles.push(s);
                    }
                    break;
                case "rsid":
                case "qFormat":
                case "hidden":
                case "semiHidden":
                case "unhideWhenUsed":
                case "autoRedefine":
                case "uiPriority":
                    break;
                default:
                    _this.debug && console.warn("DOCX: Unknown style element: " + n.localName);
            }
        });
        return result;
    };
    DocumentParser.prototype.parseTableStyle = function (node) {
        var _this = this;
        var result = [];
        var type = xml.stringAttr(node, "type");
        var selector = "";
        switch (type) {
            case "firstRow":
                selector = "tr.first-row td";
                break;
            case "lastRow":
                selector = "tr.last-row td";
                break;
            case "firstCol":
                selector = "td.first-col";
                break;
            case "lastCol":
                selector = "td.last-col";
                break;
            case "band1Vert":
                selector = "td.odd-col";
                break;
            case "band2Vert":
                selector = "td.even-col";
                break;
            case "band1Horz":
                selector = "tr.odd-row";
                break;
            case "band2Horz":
                selector = "tr.even-row";
                break;
            default: return [];
        }
        xml.foreach(node, function (n) {
            switch (n.localName) {
                case "pPr":
                    result.push({
                        target: selector + " p",
                        values: _this.parseDefaultProperties(n, {})
                    });
                    break;
                case "rPr":
                    result.push({
                        target: selector + " span",
                        values: _this.parseDefaultProperties(n, {})
                    });
                    break;
                case "tblPr":
                case "tcPr":
                    result.push({
                        target: selector,
                        values: _this.parseDefaultProperties(n, {})
                    });
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseNumberingFile = function (xnums) {
        var _this = this;
        var result = [];
        var mapping = {};
        var bullets = [];
        xml.foreach(xnums, function (n) {
            switch (n.localName) {
                case "abstractNum":
                    _this.parseAbstractNumbering(n, bullets)
                        .forEach(function (x) { return result.push(x); });
                    break;
                case "numPicBullet":
                    bullets.push(_this.parseNumberingPicBullet(n));
                    break;
                case "num":
                    var numId = xml.stringAttr(n, "numId");
                    var abstractNumId = xml.elementStringAttr(n, "abstractNumId", "val");
                    mapping[abstractNumId] = numId;
                    break;
            }
        });
        result.forEach(function (x) { return x.id = mapping[x.id]; });
        return result;
    };
    DocumentParser.prototype.parseNumberingPicBullet = function (elem) {
        var pict = xml_parser_1.default.element(elem, "pict");
        var shape = pict && xml_parser_1.default.element(pict, "shape");
        var imagedata = shape && xml_parser_1.default.element(shape, "imagedata");
        return imagedata ? {
            id: xml.intAttr(elem, "numPicBulletId"),
            src: xml.stringAttr(imagedata, "id"),
            style: xml.stringAttr(shape, "style")
        } : null;
    };
    DocumentParser.prototype.parseAbstractNumbering = function (node, bullets) {
        var _this = this;
        var result = [];
        var id = xml.stringAttr(node, "abstractNumId");
        xml.foreach(node, function (n) {
            switch (n.localName) {
                case "lvl":
                    result.push(_this.parseNumberingLevel(id, n, bullets));
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseNumberingLevel = function (id, node, bullets) {
        var _this = this;
        var result = {
            id: id,
            level: xml.intAttr(node, "ilvl"),
            style: {}
        };
        xml.foreach(node, function (n) {
            switch (n.localName) {
                case "pPr":
                    _this.parseDefaultProperties(n, result.style);
                    break;
                case "lvlPicBulletId":
                    var id = xml.intAttr(n, "val");
                    result.bullet = bullets.filter(function (x) { return x.id == id; })[0];
                    break;
                case "lvlText":
                    result.levelText = xml.stringAttr(n, "val");
                    break;
                case "numFmt":
                    result.format = xml.stringAttr(n, "val");
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseParagraph = function (node) {
        var _this = this;
        var result = this.deserialize(node, new paragraph_1.WmlParagraph());
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "r":
                    result.children.push(_this.parseRun(c, result));
                    break;
                case "hyperlink":
                    result.children.push(_this.parseHyperlink(c, result));
                    break;
                case "pPr":
                    _this.parseParagraphProperties(c, result);
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseParagraphProperties = function (elem, paragraph) {
        var _this = this;
        this.parseDefaultProperties(elem, paragraph.cssStyle = {}, null, function (c) {
            if (paragraph_1.parseParagraphProperty(c, paragraph.props, xml_parser_1.default))
                return true;
            switch (c.localName) {
                case "pStyle":
                    utils.addElementClass(paragraph, xml.className(c, "val"));
                    break;
                case "cnfStyle":
                    utils.addElementClass(paragraph, values.classNameOfCnfStyle(c));
                    break;
                case "framePr":
                    _this.parseFrame(c, paragraph);
                    break;
                case "rPr":
                    break;
                default:
                    return false;
            }
            return true;
        });
    };
    DocumentParser.prototype.parseFrame = function (node, paragraph) {
        var dropCap = xml.stringAttr(node, "dropCap");
        if (dropCap == "drop")
            paragraph.cssStyle["float"] = "left";
    };
    DocumentParser.prototype.parseHyperlink = function (node, parent) {
        var _this = this;
        var result = this.deserialize(node, new hyperlink_1.WmlHyperlink(parent));
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "r":
                    result.children.push(_this.parseRun(c, result));
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseRun = function (node, parent) {
        var _this = this;
        var result = this.deserialize(node, new run_1.WmlRun(parent));
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "drawing":
                    var d = _this.parseDrawing(c);
                    if (d)
                        result.children = [d];
                    break;
                case "rPr":
                    _this.parseRunProperties(c, result);
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseRunProperties = function (elem, run) {
        Object.assign(run.props, run_1.parseRunProperties(elem, xml_parser_1.default));
        this.parseDefaultProperties(elem, run.cssStyle = {}, null, function (c) {
            switch (c.localName) {
                case "rStyle":
                    run.className = xml.className(c, "val");
                    break;
                default:
                    return false;
            }
            return true;
        });
    };
    DocumentParser.prototype.parseDrawing = function (node) {
        for (var _i = 0, _a = xml_parser_1.default.elements(node); _i < _a.length; _i++) {
            var n = _a[_i];
            switch (n.localName) {
                case "inline":
                case "anchor":
                    return this.parseDrawingWrapper(n);
            }
        }
    };
    DocumentParser.prototype.parseDrawingWrapper = function (node) {
        var result = new drawing_1.WmlDrawing();
        var isAnchor = node.localName == "anchor";
        var wrapType = null;
        var simplePos = xml.boolAttr(node, "simplePos");
        var posX = { relative: "page", align: "left", offset: "0" };
        var posY = { relative: "page", align: "top", offset: "0" };
        for (var _i = 0, _a = xml_parser_1.default.elements(node); _i < _a.length; _i++) {
            var n = _a[_i];
            switch (n.localName) {
                case "simplePos":
                    if (simplePos) {
                        posX.offset = xml.sizeAttr(n, "x", SizeType.Emu);
                        posY.offset = xml.sizeAttr(n, "y", SizeType.Emu);
                    }
                    break;
                case "extent":
                    result.cssStyle["width"] = xml.sizeAttr(n, "cx", SizeType.Emu);
                    result.cssStyle["height"] = xml.sizeAttr(n, "cy", SizeType.Emu);
                    break;
                case "positionH":
                case "positionV":
                    if (!simplePos) {
                        var pos = n.localName == "positionH" ? posX : posY;
                        var alignNode = xml_parser_1.default.element(n, "align");
                        var offsetNode = xml_parser_1.default.element(n, "posOffset");
                        if (alignNode)
                            pos.align = alignNode.textContent;
                        if (offsetNode)
                            pos.offset = xml.sizeValue(offsetNode, SizeType.Emu);
                    }
                    break;
                case "wrapTopAndBottom":
                    wrapType = "wrapTopAndBottom";
                    break;
                case "wrapNone":
                    wrapType = "wrapNone";
                    break;
                case "graphic":
                    var g = this.parseGraphic(n);
                    if (g)
                        result.children.push(g);
                    break;
            }
        }
        if (wrapType == "wrapTopAndBottom") {
            result.cssStyle['display'] = 'block';
            if (posX.align) {
                result.cssStyle['text-align'] = posX.align;
                result.cssStyle['width'] = "100%";
            }
        }
        else if (wrapType == "wrapNone") {
            result.cssStyle['display'] = 'block';
            result.cssStyle['position'] = 'relative';
            result.cssStyle["width"] = "0px";
            result.cssStyle["height"] = "0px";
            if (posX.offset)
                result.cssStyle["left"] = posX.offset;
            if (posY.offset)
                result.cssStyle["top"] = posY.offset;
        }
        else if (isAnchor && (posX.align == 'left' || posX.align == 'right')) {
            result.cssStyle["float"] = posX.align;
        }
        return result;
    };
    DocumentParser.prototype.parseGraphic = function (elem) {
        var graphicData = xml_parser_1.default.element(elem, "graphicData");
        for (var _i = 0, _a = xml_parser_1.default.elements(graphicData); _i < _a.length; _i++) {
            var n = _a[_i];
            switch (n.localName) {
                case "pic":
                    return this.parsePicture(n);
            }
        }
        return null;
    };
    DocumentParser.prototype.parsePicture = function (elem) {
        var result = new drawing_1.DmlPicture();
        var blipFill = xml_parser_1.default.element(elem, "blipFill");
        var blip = xml_parser_1.default.element(blipFill, "blip");
        result.resourceId = xml.stringAttr(blip, "embed");
        var spPr = xml_parser_1.default.element(elem, "spPr");
        var xfrm = xml_parser_1.default.element(spPr, "xfrm");
        result.cssStyle["position"] = "relative";
        for (var _i = 0, _a = xml_parser_1.default.elements(xfrm); _i < _a.length; _i++) {
            var n = _a[_i];
            switch (n.localName) {
                case "ext":
                    result.cssStyle["width"] = xml.sizeAttr(n, "cx", SizeType.Emu);
                    result.cssStyle["height"] = xml.sizeAttr(n, "cy", SizeType.Emu);
                    break;
                case "off":
                    result.cssStyle["left"] = xml.sizeAttr(n, "x", SizeType.Emu);
                    result.cssStyle["top"] = xml.sizeAttr(n, "y", SizeType.Emu);
                    break;
            }
        }
        return result;
    };
    DocumentParser.prototype.parseTable = function (node) {
        var _this = this;
        var result = this.deserialize(node, new table_1.WmlTable());
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "tr":
                    result.children.push(_this.parseTableRow(c));
                    break;
                case "tblPr":
                    _this.parseTableProperties(c, result);
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseTableProperties = function (elem, table) {
        var _this = this;
        table.cssStyle = {};
        table.cellStyle = {};
        this.parseDefaultProperties(elem, table.cssStyle, table.cellStyle, function (c) {
            switch (c.localName) {
                case "tblStyle":
                    table.className = xml.className(c, "val");
                    break;
                case "tblLook":
                    utils.addElementClass(table, values.classNameOftblLook(c));
                    break;
                case "tblpPr":
                    _this.parseTablePosition(c, table);
                    break;
                default:
                    return false;
            }
            return true;
        });
        switch (table.cssStyle["text-align"]) {
            case "center":
                delete table.cssStyle["text-align"];
                table.cssStyle["margin-left"] = "auto";
                table.cssStyle["margin-right"] = "auto";
                break;
            case "right":
                delete table.cssStyle["text-align"];
                table.cssStyle["margin-left"] = "auto";
                break;
        }
    };
    DocumentParser.prototype.parseTablePosition = function (node, table) {
        var topFromText = xml.sizeAttr(node, "topFromText");
        var bottomFromText = xml.sizeAttr(node, "bottomFromText");
        var rightFromText = xml.sizeAttr(node, "rightFromText");
        var leftFromText = xml.sizeAttr(node, "leftFromText");
        table.cssStyle["float"] = 'left';
        table.cssStyle["margin-bottom"] = values.addSize(table.cssStyle["margin-bottom"], bottomFromText);
        table.cssStyle["margin-left"] = values.addSize(table.cssStyle["margin-left"], leftFromText);
        table.cssStyle["margin-right"] = values.addSize(table.cssStyle["margin-right"], rightFromText);
        table.cssStyle["margin-top"] = values.addSize(table.cssStyle["margin-top"], topFromText);
    };
    DocumentParser.prototype.parseTableRow = function (node) {
        var _this = this;
        var result = this.deserialize(node, new table_row_1.WmlTableRow());
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "tc":
                    result.children.push(_this.parseTableCell(c));
                    break;
                case "trPr":
                    _this.parseTableRowProperties(c, result);
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseTableRowProperties = function (elem, row) {
        row.cssStyle = this.parseDefaultProperties(elem, {}, null, function (c) {
            switch (c.localName) {
                case "cnfStyle":
                    row.className = values.classNameOfCnfStyle(c);
                    break;
                default:
                    return false;
            }
            return true;
        });
    };
    DocumentParser.prototype.parseTableCell = function (node) {
        var _this = this;
        var result = this.deserialize(node, new table_cell_1.WmlTableCell());
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "tbl":
                    result.children.push(_this.parseTable(c));
                    break;
                case "p":
                    result.children.push(_this.parseParagraph(c));
                    break;
                case "tcPr":
                    _this.parseTableCellProperties(c, result);
                    break;
            }
        });
        return result;
    };
    DocumentParser.prototype.parseTableCellProperties = function (elem, cell) {
        cell.cssStyle = this.parseDefaultProperties(elem, {}, null, function (c) {
            switch (c.localName) {
                case "gridSpan":
                    cell.span = xml.intAttr(c, "val", null);
                    break;
                case "vMerge":
                    cell.verticalMerge = xml.sizeAttr(c, "val");
                    break;
                case "cnfStyle":
                    cell.className = values.classNameOfCnfStyle(c);
                    break;
                default:
                    return false;
            }
            return true;
        });
    };
    DocumentParser.prototype.parseDefaultProperties = function (elem, style, childStyle, handler) {
        var _this = this;
        if (style === void 0) { style = null; }
        if (childStyle === void 0) { childStyle = null; }
        if (handler === void 0) { handler = null; }
        style = style || {};
        xml.foreach(elem, function (c) {
            switch (c.localName) {
                case "jc":
                    style["text-align"] = values.valueOfJc(c);
                    break;
                case "textAlignment":
                    style["vertical-align"] = values.valueOfTextAlignment(c);
                    break;
                case "color":
                    style["color"] = xml.colorAttr(c, "val", null, exports.autos.color);
                    break;
                case "sz":
                    style["font-size"] = style["min-height"] = xml.sizeAttr(c, "val", SizeType.FontSize);
                    break;
                case "shd":
                    style["background-color"] = xml.colorAttr(c, "fill", null, exports.autos.shd);
                    break;
                case "highlight":
                    style["background-color"] = xml.colorAttr(c, "val", null, exports.autos.highlight);
                    break;
                case "tcW":
                    if (_this.ignoreWidth)
                        break;
                case "tblW":
                    style["width"] = values.valueOfSize(c, "w");
                    break;
                case "trHeight":
                    _this.parseTrHeight(c, style);
                    break;
                case "strike":
                    style["text-decoration"] = values.valueOfStrike(c);
                    break;
                case "b":
                    style["font-weight"] = values.valueOfBold(c);
                    break;
                case "i":
                    style["font-style"] = "italic";
                    break;
                case "u":
                    _this.parseUnderline(c, style);
                    break;
                case "ind":
                case "tblInd":
                    _this.parseIndentation(c, style);
                    break;
                case "rFonts":
                    _this.parseFont(c, style);
                    break;
                case "tblBorders":
                    _this.parseBorderProperties(c, childStyle || style);
                    break;
                case "tblCellSpacing":
                    style["border-spacing"] = values.valueOfMargin(c);
                    style["border-collapse"] = "separate";
                    break;
                case "pBdr":
                    _this.parseBorderProperties(c, style);
                    break;
                case "bdr":
                    style["border"] = values.valueOfBorder(c);
                    break;
                case "tcBorders":
                    _this.parseBorderProperties(c, style);
                    break;
                case "noWrap":
                    break;
                case "tblCellMar":
                case "tcMar":
                    _this.parseMarginProperties(c, childStyle || style);
                    break;
                case "tblLayout":
                    style["table-layout"] = values.valueOfTblLayout(c);
                    break;
                case "vAlign":
                    style["vertical-align"] = xml.stringAttr(c, "val");
                    break;
                case "spacing":
                    if (elem.localName == "pPr")
                        _this.parseSpacing(c, style);
                    break;
                case "lang":
                case "noProof":
                case "webHidden":
                    break;
                default:
                    if (handler != null && !handler(c))
                        _this.debug && console.warn("DOCX: Unknown document element: " + c.localName);
                    break;
            }
        });
        return style;
    };
    DocumentParser.prototype.parseUnderline = function (node, style) {
        var val = xml.stringAttr(node, "val");
        if (val == null || val == "none")
            return;
        switch (val) {
            case "dash":
            case "dashDotDotHeavy":
            case "dashDotHeavy":
            case "dashedHeavy":
            case "dashLong":
            case "dashLongHeavy":
            case "dotDash":
            case "dotDotDash":
                style["text-decoration-style"] = "dashed";
                break;
            case "dotted":
            case "dottedHeavy":
                style["text-decoration-style"] = "dotted";
                break;
            case "double":
                style["text-decoration-style"] = "double";
                break;
            case "single":
            case "thick":
                style["text-decoration"] = "underline";
                break;
            case "wave":
            case "wavyDouble":
            case "wavyHeavy":
                style["text-decoration-style"] = "wavy";
                break;
            case "words":
                style["text-decoration"] = "underline";
                break;
        }
        var col = xml.colorAttr(node, "color");
        if (col)
            style["text-decoration-color"] = col;
    };
    DocumentParser.prototype.parseFont = function (node, style) {
        var ascii = xml.stringAttr(node, "ascii");
        if (ascii)
            style["font-family"] = ascii;
    };
    DocumentParser.prototype.parseIndentation = function (node, style) {
        var firstLine = xml.sizeAttr(node, "firstLine");
        var left = xml.sizeAttr(node, "left");
        var start = xml.sizeAttr(node, "start");
        var right = xml.sizeAttr(node, "right");
        var end = xml.sizeAttr(node, "end");
        if (firstLine)
            style["text-indent"] = firstLine;
        if (left || start)
            style["margin-left"] = left || start;
        if (right || end)
            style["margin-right"] = right || end;
    };
    DocumentParser.prototype.parseSpacing = function (node, style) {
        var before = xml.sizeAttr(node, "before");
        var after = xml.sizeAttr(node, "after");
        var line = xml.intAttr(node, "line", null);
        var lineRule = xml.stringAttr(node, "lineRule");
        if (before)
            style["margin-top"] = before;
        if (after)
            style["margin-bottom"] = after;
        if (line !== null) {
            switch (lineRule) {
                case "auto":
                    style["line-height"] = "" + (line / 240).toFixed(2);
                    break;
                case "atLeast":
                    style["line-height"] = "calc(100% + " + line / 20 + "pt)";
                    break;
                default:
                    style["line-height"] = style["min-height"] = line / 20 + "pt";
                    break;
            }
        }
    };
    DocumentParser.prototype.parseMarginProperties = function (node, output) {
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "left":
                    output["padding-left"] = values.valueOfMargin(c);
                    break;
                case "right":
                    output["padding-right"] = values.valueOfMargin(c);
                    break;
                case "top":
                    output["padding-top"] = values.valueOfMargin(c);
                    break;
                case "bottom":
                    output["padding-bottom"] = values.valueOfMargin(c);
                    break;
            }
        });
    };
    DocumentParser.prototype.parseTrHeight = function (node, output) {
        switch (xml.stringAttr(node, "hRule")) {
            case "exact":
                output["height"] = xml.sizeAttr(node, "val");
                break;
            case "atLeast":
            default:
                output["height"] = xml.sizeAttr(node, "val");
                break;
        }
    };
    DocumentParser.prototype.parseBorderProperties = function (node, output) {
        xml.foreach(node, function (c) {
            switch (c.localName) {
                case "start":
                case "left":
                    output["border-left"] = values.valueOfBorder(c);
                    break;
                case "end":
                case "right":
                    output["border-right"] = values.valueOfBorder(c);
                    break;
                case "top":
                    output["border-top"] = values.valueOfBorder(c);
                    break;
                case "bottom":
                    output["border-bottom"] = values.valueOfBorder(c);
                    break;
            }
        });
    };
    return DocumentParser;
}());
exports.DocumentParser = DocumentParser;
var SizeType;
(function (SizeType) {
    SizeType[SizeType["FontSize"] = 0] = "FontSize";
    SizeType[SizeType["Dxa"] = 1] = "Dxa";
    SizeType[SizeType["Emu"] = 2] = "Emu";
    SizeType[SizeType["Border"] = 3] = "Border";
    SizeType[SizeType["Percent"] = 4] = "Percent";
})(SizeType || (SizeType = {}));
var xml = (function () {
    function xml() {
    }
    xml.foreach = function (node, cb) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var n = node.childNodes[i];
            if (n.nodeType == 1)
                cb(n);
        }
    };
    xml.elementStringAttr = function (elem, nodeName, attrName) {
        var n = xml_parser_1.default.element(elem, nodeName);
        return n ? xml.stringAttr(n, attrName) : null;
    };
    xml.stringAttr = function (node, attrName) {
        return xml_parser_1.default.attr(node, attrName);
    };
    xml.colorAttr = function (node, attrName, defValue, autoColor) {
        if (defValue === void 0) { defValue = null; }
        if (autoColor === void 0) { autoColor = 'black'; }
        var v = xml.stringAttr(node, attrName);
        switch (v) {
            case "yellow":
                return v;
            case "auto":
                return autoColor;
        }
        return v ? "#" + v : defValue;
    };
    xml.boolAttr = function (node, attrName, defValue) {
        if (defValue === void 0) { defValue = false; }
        return xml_parser_1.default.boolAttr(node, attrName, defValue);
    };
    xml.intAttr = function (node, attrName, defValue) {
        if (defValue === void 0) { defValue = 0; }
        var val = xml.stringAttr(node, attrName);
        return val ? parseInt(xml.stringAttr(node, attrName)) : defValue;
    };
    xml.sizeAttr = function (node, attrName, type) {
        if (type === void 0) { type = SizeType.Dxa; }
        return xml.convertSize(xml.stringAttr(node, attrName), type);
    };
    xml.sizeValue = function (node, type) {
        if (type === void 0) { type = SizeType.Dxa; }
        return xml.convertSize(node.textContent, type);
    };
    xml.convertSize = function (val, type) {
        if (type === void 0) { type = SizeType.Dxa; }
        if (val == null || val.indexOf("pt") > -1)
            return val;
        var intVal = parseInt(val);
        switch (type) {
            case SizeType.Dxa: return (0.05 * intVal).toFixed(2) + "pt";
            case SizeType.Emu: return (intVal / 12700).toFixed(2) + "pt";
            case SizeType.FontSize: return (0.5 * intVal).toFixed(2) + "pt";
            case SizeType.Border: return (0.125 * intVal).toFixed(2) + "pt";
            case SizeType.Percent: return (0.02 * intVal).toFixed(2) + "%";
        }
        return val;
    };
    xml.className = function (node, attrName) {
        var val = xml.stringAttr(node, attrName);
        return val && val.replace(/[ .]+/g, '-').replace(/[&]+/g, 'and');
    };
    return xml;
}());
var values = (function () {
    function values() {
    }
    values.valueOfBold = function (c) {
        return xml.boolAttr(c, "val", true) ? "bold" : "normal";
    };
    values.valueOfSize = function (c, attr) {
        var type = SizeType.Dxa;
        switch (xml.stringAttr(c, "type")) {
            case "dxa": break;
            case "pct":
                type = SizeType.Percent;
                break;
        }
        return xml.sizeAttr(c, attr, type);
    };
    values.valueOfStrike = function (c) {
        return xml.boolAttr(c, "val", true) ? "line-through" : "none";
    };
    values.valueOfMargin = function (c) {
        return xml.sizeAttr(c, "w");
    };
    values.valueOfBorder = function (c) {
        var type = xml.stringAttr(c, "val");
        if (type == "nil")
            return "none";
        var color = xml.colorAttr(c, "color");
        var size = xml.sizeAttr(c, "sz", SizeType.Border);
        return size + " solid " + (color == "auto" ? "black" : color);
    };
    values.valueOfTblLayout = function (c) {
        var type = xml.stringAttr(c, "val");
        return type == "fixed" ? "fixed" : "auto";
    };
    values.classNameOfCnfStyle = function (c) {
        var className = "";
        var val = xml.stringAttr(c, "val");
        if (val[0] == "1")
            className += " first-row";
        if (val[1] == "1")
            className += " last-row";
        if (val[2] == "1")
            className += " first-col";
        if (val[3] == "1")
            className += " last-col";
        if (val[4] == "1")
            className += " odd-col";
        if (val[5] == "1")
            className += " even-col";
        if (val[6] == "1")
            className += " odd-row";
        if (val[7] == "1")
            className += " even-row";
        if (val[8] == "1")
            className += " ne-cell";
        if (val[9] == "1")
            className += " nw-cell";
        if (val[10] == "1")
            className += " se-cell";
        if (val[11] == "1")
            className += " sw-cell";
        return className.trim();
    };
    values.valueOfJc = function (c) {
        var type = xml.stringAttr(c, "val");
        switch (type) {
            case "start":
            case "left": return "left";
            case "center": return "center";
            case "end":
            case "right": return "right";
            case "both": return "justify";
        }
        return type;
    };
    values.valueOfTextAlignment = function (c) {
        var type = xml.stringAttr(c, "val");
        switch (type) {
            case "auto":
            case "baseline": return "baseline";
            case "top": return "top";
            case "center": return "middle";
            case "bottom": return "bottom";
        }
        return type;
    };
    values.addSize = function (a, b) {
        if (a == null)
            return b;
        if (b == null)
            return a;
        return "calc(" + a + " + " + b + ")";
    };
    values.classNameOftblLook = function (c) {
        var className = "";
        if (xml.boolAttr(c, "firstColumn"))
            className += " first-col";
        if (xml.boolAttr(c, "firstRow"))
            className += " first-row";
        if (xml.boolAttr(c, "lastColumn"))
            className += " lat-col";
        if (xml.boolAttr(c, "lastRow"))
            className += " last-row";
        if (xml.boolAttr(c, "noHBand"))
            className += " no-hband";
        if (xml.boolAttr(c, "noVBand"))
            className += " no-vband";
        return className.trim();
    };
    return values;
}());


/***/ }),

/***/ "../src/document-props/extended-props-part.ts":
/*!****************************************************!*\
  !*** ../src/document-props/extended-props-part.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedPropsPart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var props_1 = __webpack_require__(/*! ./props */ "../src/document-props/props.ts");
var ExtendedPropsPart = (function (_super) {
    __extends(ExtendedPropsPart, _super);
    function ExtendedPropsPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedPropsPart.prototype.parseXml = function (root) {
        this.props = props_1.parseExtendedProps(root, this._package.xmlParser);
    };
    return ExtendedPropsPart;
}(part_1.Part));
exports.ExtendedPropsPart = ExtendedPropsPart;


/***/ }),

/***/ "../src/document-props/props.ts":
/*!**************************************!*\
  !*** ../src/document-props/props.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseExtendedProps = void 0;
function parseExtendedProps(root, xmlParser) {
    var result = {};
    for (var _i = 0, _a = xmlParser.elements(root); _i < _a.length; _i++) {
        var el = _a[_i];
        switch (el.localName) {
            case "Template":
                result.template = el.textContent;
                break;
            case "Pages":
                result.pages = safeParseToInt(el.textContent);
                break;
            case "Words":
                result.words = safeParseToInt(el.textContent);
                break;
            case "Characters":
                result.characters = safeParseToInt(el.textContent);
                break;
            case "Application":
                result.application = el.textContent;
                break;
            case "Lines":
                result.lines = safeParseToInt(el.textContent);
                break;
            case "Paragraphs":
                result.paragraphs = safeParseToInt(el.textContent);
                break;
            case "Company":
                result.company = el.textContent;
                break;
            case "AppVersion":
                result.appVersion = el.textContent;
                break;
        }
    }
    return result;
}
exports.parseExtendedProps = parseExtendedProps;
function safeParseToInt(value) {
    if (typeof value === 'undefined')
        return;
    return parseInt(value);
}


/***/ }),

/***/ "../src/document/bookmarks.ts":
/*!************************************!*\
  !*** ../src/document/bookmarks.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlBookmarkEnd = exports.WmlBookmarkStart = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlBookmarkStart = (function (_super) {
    __extends(WmlBookmarkStart, _super);
    function WmlBookmarkStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromAttribute("id")
    ], WmlBookmarkStart.prototype, "id", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("name")
    ], WmlBookmarkStart.prototype, "name", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("colFirst")
    ], WmlBookmarkStart.prototype, "colFirst", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("colLast")
    ], WmlBookmarkStart.prototype, "colLast", void 0);
    WmlBookmarkStart = __decorate([
        xml_serialize_1.element("bookmarkStart")
    ], WmlBookmarkStart);
    return WmlBookmarkStart;
}(dom_1.DocxElement));
exports.WmlBookmarkStart = WmlBookmarkStart;
var WmlBookmarkEnd = (function (_super) {
    __extends(WmlBookmarkEnd, _super);
    function WmlBookmarkEnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromAttribute("id")
    ], WmlBookmarkEnd.prototype, "id", void 0);
    WmlBookmarkEnd = __decorate([
        xml_serialize_1.element("bookmarkEnd")
    ], WmlBookmarkEnd);
    return WmlBookmarkEnd;
}(dom_1.DocxElement));
exports.WmlBookmarkEnd = WmlBookmarkEnd;


/***/ }),

/***/ "../src/document/border.ts":
/*!*********************************!*\
  !*** ../src/document/border.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseBorders = exports.parseBorder = void 0;
var common_1 = __webpack_require__(/*! ./common */ "../src/document/common.ts");
function parseBorder(elem, xml) {
    return {
        type: xml.attr(elem, "val"),
        color: xml.attr(elem, "color"),
        size: xml.lengthAttr(elem, "sz", common_1.LengthUsage.Border),
        offset: xml.lengthAttr(elem, "space", common_1.LengthUsage.Point),
        frame: xml.boolAttr(elem, 'frame'),
        shadow: xml.boolAttr(elem, 'shadow')
    };
}
exports.parseBorder = parseBorder;
function parseBorders(elem, xml) {
    var result = {};
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "left":
                result.left = parseBorder(e, xml);
                break;
            case "top":
                result.top = parseBorder(e, xml);
                break;
            case "right":
                result.right = parseBorder(e, xml);
                break;
            case "bottom":
                result.bottom = parseBorder(e, xml);
                break;
        }
    }
    return result;
}
exports.parseBorders = parseBorders;


/***/ }),

/***/ "../src/document/breaks.ts":
/*!*********************************!*\
  !*** ../src/document/breaks.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlLastRenderedPageBreak = exports.WmlBreak = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlBreak = (function (_super) {
    __extends(WmlBreak, _super);
    function WmlBreak() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromAttribute("type")
    ], WmlBreak.prototype, "type", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("clear")
    ], WmlBreak.prototype, "clear", void 0);
    WmlBreak = __decorate([
        xml_serialize_1.element('br')
    ], WmlBreak);
    return WmlBreak;
}(dom_1.DocxElement));
exports.WmlBreak = WmlBreak;
var WmlLastRenderedPageBreak = (function (_super) {
    __extends(WmlLastRenderedPageBreak, _super);
    function WmlLastRenderedPageBreak() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlLastRenderedPageBreak = __decorate([
        xml_serialize_1.element('lastRenderedPageBreak')
    ], WmlLastRenderedPageBreak);
    return WmlLastRenderedPageBreak;
}(dom_1.DocxElement));
exports.WmlLastRenderedPageBreak = WmlLastRenderedPageBreak;


/***/ }),

/***/ "../src/document/common.ts":
/*!*********************************!*\
  !*** ../src/document/common.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseElementValue = exports.convertPercentage = exports.convertBoolean = exports.convertLength = exports.LengthUsage = exports.ns = void 0;
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
exports.ns = {
    wordml: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    drawingml: "http://schemas.openxmlformats.org/drawingml/2006/main",
    picture: "http://schemas.openxmlformats.org/drawingml/2006/picture"
};
exports.LengthUsage = {
    Dxa: { mul: 0.05, unit: "pt" },
    Emu: { mul: 1 / 12700, unit: "pt" },
    FontSize: { mul: 0.5, unit: "pt" },
    Border: { mul: 0.125, unit: "pt" },
    Point: { mul: 1, unit: "pt" },
    Percent: { mul: 0.02, unit: "%" },
    LineHeight: { mul: 1 / 240, unit: null }
};
function convertLength(val, usage) {
    if (usage === void 0) { usage = exports.LengthUsage.Dxa; }
    return val ? { value: parseInt(val) * usage.mul, type: usage.unit } : null;
}
exports.convertLength = convertLength;
function convertBoolean(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    switch (v) {
        case "1": return true;
        case "0": return false;
        default: return defaultValue;
    }
}
exports.convertBoolean = convertBoolean;
function convertPercentage(val) {
    return val ? parseInt(val) / 100 : null;
}
exports.convertPercentage = convertPercentage;
function parseElementValue(elem) {
    return xml_parser_1.attr(elem, "val");
}
exports.parseElementValue = parseElementValue;


/***/ }),

/***/ "../src/document/document-part.ts":
/*!****************************************!*\
  !*** ../src/document/document-part.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentPart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var DocumentPart = (function (_super) {
    __extends(DocumentPart, _super);
    function DocumentPart(pkg, path, parser) {
        var _this = _super.call(this, pkg, path) || this;
        _this._documentParser = parser;
        return _this;
    }
    DocumentPart.prototype.parseXml = function (root) {
        this.documentElement = this._documentParser.parseDocumentFile(root);
    };
    return DocumentPart;
}(part_1.Part));
exports.DocumentPart = DocumentPart;


/***/ }),

/***/ "../src/document/document.ts":
/*!***********************************!*\
  !*** ../src/document/document.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlBody = exports.WmlDocument = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var section_1 = __webpack_require__(/*! ./section */ "../src/document/section.ts");
var WmlDocument = (function (_super) {
    __extends(WmlDocument, _super);
    function WmlDocument() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlDocument = __decorate([
        xml_serialize_1.element("document")
    ], WmlDocument);
    return WmlDocument;
}(dom_1.DocxElement));
exports.WmlDocument = WmlDocument;
var WmlBody = (function (_super) {
    __extends(WmlBody, _super);
    function WmlBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromElement("sectPr", section_1.parseSectionProperties)
    ], WmlBody.prototype, "sectionProps", void 0);
    WmlBody = __decorate([
        xml_serialize_1.element("body")
    ], WmlBody);
    return WmlBody;
}(dom_1.DocxContainer));
exports.WmlBody = WmlBody;


/***/ }),

/***/ "../src/document/dom.ts":
/*!******************************!*\
  !*** ../src/document/dom.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocxContainer = exports.DocxElement = void 0;
var DocxElement = (function () {
    function DocxElement(parent) {
        this.parent = parent;
        this.className = null;
        this.cssStyle = {};
    }
    return DocxElement;
}());
exports.DocxElement = DocxElement;
var DocxContainer = (function (_super) {
    __extends(DocxContainer, _super);
    function DocxContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    return DocxContainer;
}(DocxElement));
exports.DocxContainer = DocxContainer;


/***/ }),

/***/ "../src/document/drawing.ts":
/*!**********************************!*\
  !*** ../src/document/drawing.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseDmlPicture = exports.DmlPicture = exports.WmlDrawing = void 0;
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlDrawing = (function (_super) {
    __extends(WmlDrawing, _super);
    function WmlDrawing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WmlDrawing;
}(dom_1.DocxContainer));
exports.WmlDrawing = WmlDrawing;
var DmlPicture = (function (_super) {
    __extends(DmlPicture, _super);
    function DmlPicture() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DmlPicture;
}(dom_1.DocxContainer));
exports.DmlPicture = DmlPicture;
function parseDmlPicture(elem, output, xml) {
    if (xml === void 0) { xml = xml_parser_1.default; }
    var blipFill = xml.element(elem, "blipFill");
    var blip = xml.element(blipFill, "blip");
    output.resourceId = xml.attr(blip, "embed");
}
exports.parseDmlPicture = parseDmlPicture;


/***/ }),

/***/ "../src/document/fields.ts":
/*!*********************************!*\
  !*** ../src/document/fields.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlFieldSimple = exports.WmlFieldChar = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var common_1 = __webpack_require__(/*! ./common */ "../src/document/common.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlFieldChar = (function (_super) {
    __extends(WmlFieldChar, _super);
    function WmlFieldChar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromAttribute('fldCharType')
    ], WmlFieldChar.prototype, "type", void 0);
    WmlFieldChar = __decorate([
        xml_serialize_1.element('fldChar')
    ], WmlFieldChar);
    return WmlFieldChar;
}(dom_1.DocxElement));
exports.WmlFieldChar = WmlFieldChar;
var WmlFieldSimple = (function (_super) {
    __extends(WmlFieldSimple, _super);
    function WmlFieldSimple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromAttribute("dirty", common_1.convertBoolean)
    ], WmlFieldSimple.prototype, "dirty", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("fldLock", common_1.convertBoolean)
    ], WmlFieldSimple.prototype, "lock", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("instr")
    ], WmlFieldSimple.prototype, "instruction", void 0);
    WmlFieldSimple = __decorate([
        xml_serialize_1.element('fldSimple')
    ], WmlFieldSimple);
    return WmlFieldSimple;
}(dom_1.DocxContainer));
exports.WmlFieldSimple = WmlFieldSimple;


/***/ }),

/***/ "../src/document/hyperlink.ts":
/*!************************************!*\
  !*** ../src/document/hyperlink.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlHyperlink = void 0;
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlHyperlink = (function (_super) {
    __extends(WmlHyperlink, _super);
    function WmlHyperlink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlHyperlink.prototype.parse = function (elem) {
        this.anchor = xml_parser_1.default.attr(elem, "anchor");
    };
    __decorate([
        xml_serialize_1.fromAttribute('anchor')
    ], WmlHyperlink.prototype, "anchor", void 0);
    WmlHyperlink = __decorate([
        xml_serialize_1.element('hyperlink')
    ], WmlHyperlink);
    return WmlHyperlink;
}(dom_1.DocxContainer));
exports.WmlHyperlink = WmlHyperlink;


/***/ }),

/***/ "../src/document/line-spacing.ts":
/*!***************************************!*\
  !*** ../src/document/line-spacing.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseLineSpacing = void 0;
function parseLineSpacing(elem, xml) {
    return {
        before: xml.lengthAttr(elem, "before"),
        after: xml.lengthAttr(elem, "after"),
        line: xml.intAttr(elem, "line"),
        lineRule: xml.attr(elem, "lineRule")
    };
}
exports.parseLineSpacing = parseLineSpacing;


/***/ }),

/***/ "../src/document/paragraph.ts":
/*!************************************!*\
  !*** ../src/document/paragraph.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseNumbering = exports.parseTabs = exports.parseParagraphProperty = exports.parseParagraphProperties = exports.WmlParagraph = void 0;
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var common_1 = __webpack_require__(/*! ./common */ "../src/document/common.ts");
var section_1 = __webpack_require__(/*! ./section */ "../src/document/section.ts");
var line_spacing_1 = __webpack_require__(/*! ./line-spacing */ "../src/document/line-spacing.ts");
var run_1 = __webpack_require__(/*! ./run */ "../src/document/run.ts");
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var bookmarks_1 = __webpack_require__(/*! ./bookmarks */ "../src/document/bookmarks.ts");
var fields_1 = __webpack_require__(/*! ./fields */ "../src/document/fields.ts");
var WmlParagraph = (function (_super) {
    __extends(WmlParagraph, _super);
    function WmlParagraph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {};
        return _this;
    }
    WmlParagraph = __decorate([
        xml_serialize_1.element("p"),
        xml_serialize_1.children(bookmarks_1.WmlBookmarkStart, bookmarks_1.WmlBookmarkEnd, fields_1.WmlFieldSimple)
    ], WmlParagraph);
    return WmlParagraph;
}(dom_1.DocxContainer));
exports.WmlParagraph = WmlParagraph;
function parseParagraphProperties(elem, xml) {
    var result = {};
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var el = _a[_i];
        parseParagraphProperty(el, result, xml);
    }
    return result;
}
exports.parseParagraphProperties = parseParagraphProperties;
function parseParagraphProperty(elem, props, xml) {
    if (elem.namespaceURI != common_1.ns.wordml)
        return false;
    switch (elem.localName) {
        case "tabs":
            props.tabs = parseTabs(elem, xml);
            break;
        case "sectPr":
            props.sectionProps = section_1.parseSectionProperties(elem, xml);
            break;
        case "numPr":
            props.numbering = parseNumbering(elem, xml);
            break;
        case "spacing":
            props.lineSpacing = line_spacing_1.parseLineSpacing(elem, xml);
            return false;
            break;
        case "textAlignment":
            props.textAlignment = xml.attr(elem, "val");
            return false;
            break;
        case "keepNext":
            props.keepLines = xml.boolAttr(elem, "val", true);
            break;
        case "keepNext":
            props.keepNext = xml.boolAttr(elem, "val", true);
            break;
        case "pageBreakBefore":
            props.pageBreakBefore = xml.boolAttr(elem, "val", true);
            break;
        case "outlineLvl":
            props.outlineLevel = xml.intAttr(elem, "val");
            break;
        case "pStyle":
            props.styleId = xml.attr(elem, "val");
            break;
        case "rPr":
            props.runProps = run_1.parseRunProperties(elem, xml);
            break;
        default:
            return false;
    }
    return true;
}
exports.parseParagraphProperty = parseParagraphProperty;
function parseTabs(elem, xml) {
    return xml.elements(elem, "tab")
        .map(function (e) { return ({
        position: xml.lengthAttr(e, "pos"),
        leader: xml.attr(e, "leader"),
        style: xml.attr(e, "val")
    }); });
}
exports.parseTabs = parseTabs;
function parseNumbering(elem, xml) {
    var result = {};
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "numId":
                result.id = xml.attr(e, "val");
                break;
            case "ilvl":
                result.level = xml.intAttr(e, "val");
                break;
        }
    }
    return result;
}
exports.parseNumbering = parseNumbering;


/***/ }),

/***/ "../src/document/run.ts":
/*!******************************!*\
  !*** ../src/document/run.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseShading = exports.parseRunFonts = exports.parseRunProperty = exports.parseRunProperties = exports.WmlRun = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var border_1 = __webpack_require__(/*! ./border */ "../src/document/border.ts");
var breaks_1 = __webpack_require__(/*! ./breaks */ "../src/document/breaks.ts");
var common_1 = __webpack_require__(/*! ./common */ "../src/document/common.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var fields_1 = __webpack_require__(/*! ./fields */ "../src/document/fields.ts");
var text_1 = __webpack_require__(/*! ./text */ "../src/document/text.ts");
var WmlRun = (function (_super) {
    __extends(WmlRun, _super);
    function WmlRun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {};
        return _this;
    }
    WmlRun = __decorate([
        xml_serialize_1.element('r'),
        xml_serialize_1.children(text_1.WmlText, text_1.WmlSymbol, text_1.WmlTab, breaks_1.WmlBreak, text_1.WmlInstructionText, fields_1.WmlFieldChar, breaks_1.WmlLastRenderedPageBreak)
    ], WmlRun);
    return WmlRun;
}(dom_1.DocxContainer));
exports.WmlRun = WmlRun;
function parseRunProperties(elem, xml) {
    var result = {};
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var el = _a[_i];
        parseRunProperty(el, result, xml);
    }
    return result;
}
exports.parseRunProperties = parseRunProperties;
function parseRunProperty(elem, props, xml) {
    switch (elem.localName) {
        case 'rStyle':
            props.styleName = xml.attr(elem, 'val');
            break;
        case 'bdr':
            props.border = border_1.parseBorder(elem, xml);
            break;
        case 'rFonts':
            props.fonts = parseRunFonts(elem, xml);
            break;
        case 'shd':
            props.shading = parseShading(elem, xml);
            break;
        case 'highlight':
            props.highlight = xml.attr(elem, 'val');
            break;
        case 'spacing':
            props.spacing = xml.lengthAttr(elem, 'val');
            break;
        case 'w':
            props.stretch = xml.percentageAttr(elem, 'val');
            break;
        case "color":
            props.color = xml.attr(elem, "val");
            break;
        case "sz":
            props.fontSize = xml.lengthAttr(elem, "val", common_1.LengthUsage.FontSize);
            break;
        case "b":
            props.bold = xml.boolAttr(elem, "val", true);
            break;
        case "strike":
            props.strike = xml.boolAttr(elem, "val", true);
            break;
        case "dstrike":
            props.doubleStrike = xml.boolAttr(elem, "val", true);
            break;
        case "i":
            props.italics = xml.boolAttr(elem, "val", true);
            break;
        case "u":
            props.underline = {
                color: xml.attr(elem, "color"),
                type: xml.attr(elem, 'val')
            };
            break;
        case 'caps':
            props.caps = xml.boolAttr(elem, "val", true);
            break;
        case 'smallCaps':
            props.smallCaps = xml.boolAttr(elem, "val", true);
            break;
        case 'imprint':
            props.imprint = xml.boolAttr(elem, "val", true);
            break;
        case 'outline':
            props.outline = xml.boolAttr(elem, "val", true);
            break;
        case 'vertAlign':
            props.verticalAlignment = xml.attr(elem, 'val');
            break;
        case 'emboss':
        case 'shadow':
        case 'vanish':
        default:
            return false;
    }
    return true;
}
exports.parseRunProperty = parseRunProperty;
function parseRunFonts(elem, xml) {
    return {
        ascii: xml.attr(elem, 'ascii'),
        hAscii: xml.attr(elem, 'hAscii'),
        cs: xml.attr(elem, 'cs'),
        eastAsia: xml.attr(elem, 'eastAsia'),
    };
}
exports.parseRunFonts = parseRunFonts;
function parseShading(elem, xml) {
    return {
        type: xml.attr(elem, 'val'),
        foreground: xml.attr(elem, 'color'),
        background: xml.attr(elem, 'fill')
    };
}
exports.parseShading = parseShading;


/***/ }),

/***/ "../src/document/section.ts":
/*!**********************************!*\
  !*** ../src/document/section.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSectionProperties = exports.SectionType = void 0;
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
var SectionType;
(function (SectionType) {
    SectionType["Continuous"] = "continuous";
    SectionType["NextPage"] = "nextPage";
    SectionType["NextColumn"] = "nextColumn";
    SectionType["EvenPage"] = "evenPage";
    SectionType["OddPage"] = "oddPage";
})(SectionType = exports.SectionType || (exports.SectionType = {}));
function parseSectionProperties(elem, xml) {
    var _a, _b;
    if (xml === void 0) { xml = xml_parser_1.default; }
    var section = {};
    for (var _i = 0, _c = xml.elements(elem); _i < _c.length; _i++) {
        var e = _c[_i];
        switch (e.localName) {
            case "pgSz":
                section.pageSize = {
                    width: xml.lengthAttr(e, "w"),
                    height: xml.lengthAttr(e, "h"),
                    orientation: xml.attr(e, "orient")
                };
                break;
            case "type":
                section.type = xml.attr(e, "val");
                break;
            case "pgMar":
                section.pageMargins = {
                    left: xml.lengthAttr(e, "left"),
                    right: xml.lengthAttr(e, "right"),
                    top: xml.lengthAttr(e, "top"),
                    bottom: xml.lengthAttr(e, "bottom"),
                    header: xml.lengthAttr(e, "header"),
                    footer: xml.lengthAttr(e, "footer"),
                    gutter: xml.lengthAttr(e, "gutter"),
                };
                break;
            case "cols":
                section.columns = parseColumns(e, xml);
                break;
            case "headerReference":
                ((_a = section.headerRefs) !== null && _a !== void 0 ? _a : (section.headerRefs = [])).push(parseFooterHeaderReference(e, xml));
                break;
            case "footerReference":
                ((_b = section.footerRefs) !== null && _b !== void 0 ? _b : (section.footerRefs = [])).push(parseFooterHeaderReference(e, xml));
                break;
        }
    }
    return section;
}
exports.parseSectionProperties = parseSectionProperties;
function parseColumns(elem, xml) {
    return {
        numberOfColumns: xml.intAttr(elem, "num"),
        space: xml.lengthAttr(elem, "space"),
        separator: xml.boolAttr(elem, "sep"),
        equalWidth: xml.boolAttr(elem, "equalWidth", true),
        columns: xml.elements(elem, "col")
            .map(function (e) { return ({
            width: xml.lengthAttr(e, "w"),
            space: xml.lengthAttr(e, "space")
        }); })
    };
}
function parseFooterHeaderReference(elem, xml) {
    return {
        id: xml.attr(elem, "id"),
        type: xml.attr(elem, "type"),
    };
}


/***/ }),

/***/ "../src/document/table-cell.ts":
/*!*************************************!*\
  !*** ../src/document/table-cell.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlTableCell = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlTableCell = (function (_super) {
    __extends(WmlTableCell, _super);
    function WmlTableCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlTableCell = __decorate([
        xml_serialize_1.element("tc")
    ], WmlTableCell);
    return WmlTableCell;
}(dom_1.DocxContainer));
exports.WmlTableCell = WmlTableCell;


/***/ }),

/***/ "../src/document/table-row.ts":
/*!************************************!*\
  !*** ../src/document/table-row.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlTableRow = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlTableRow = (function (_super) {
    __extends(WmlTableRow, _super);
    function WmlTableRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlTableRow = __decorate([
        xml_serialize_1.element("tr")
    ], WmlTableRow);
    return WmlTableRow;
}(dom_1.DocxContainer));
exports.WmlTableRow = WmlTableRow;


/***/ }),

/***/ "../src/document/table.ts":
/*!********************************!*\
  !*** ../src/document/table.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseTableColumns = exports.parseTableLook = exports.parseTableProperties = exports.WmlTable = void 0;
var xml_parser_1 = __webpack_require__(/*! ../parser/xml-parser */ "../src/parser/xml-parser.ts");
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlTable = (function (_super) {
    __extends(WmlTable, _super);
    function WmlTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromElement("tblGrid", parseTableColumns)
    ], WmlTable.prototype, "columns", void 0);
    __decorate([
        xml_serialize_1.fromElement("tblPr", parseTableProperties)
    ], WmlTable.prototype, "props", void 0);
    WmlTable = __decorate([
        xml_serialize_1.element("tbl")
    ], WmlTable);
    return WmlTable;
}(dom_1.DocxContainer));
exports.WmlTable = WmlTable;
function parseTableProperties(elem) {
    var result = {};
    for (var _i = 0, _a = xml_parser_1.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "jc":
                result.alignment = xml_parser_1.attr(e, "val");
                break;
            case "tblCaption":
                result.caption = xml_parser_1.attr(e, "val");
                break;
            case "tblLook":
                result.tableLook = parseTableLook(e);
                break;
        }
    }
    return result;
}
exports.parseTableProperties = parseTableProperties;
function parseTableLook(elem, xml) {
    if (xml === void 0) { xml = xml_parser_1.default; }
    var intVal = xml.intAttr(elem, "val");
    return {
        firstColumn: xml.boolAttr(elem, 'firstColumn'),
        firstRow: xml.boolAttr(elem, 'firstRow'),
        lastColumn: xml.boolAttr(elem, 'lastColumn'),
        lastRow: xml.boolAttr(elem, 'lastRow'),
        noHBand: xml.boolAttr(elem, 'noHBand'),
        noVBand: xml.boolAttr(elem, 'noVBand')
    };
}
exports.parseTableLook = parseTableLook;
function parseTableColumns(elem, xml) {
    if (xml === void 0) { xml = xml_parser_1.default; }
    return xml.elements(elem, 'gridCol').map(function (e) { return ({
        width: xml.lengthAttr(e, "w")
    }); });
}
exports.parseTableColumns = parseTableColumns;


/***/ }),

/***/ "../src/document/text.ts":
/*!*******************************!*\
  !*** ../src/document/text.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlInstructionText = exports.WmlTab = exports.WmlSymbol = exports.WmlText = void 0;
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "../src/document/dom.ts");
var WmlText = (function (_super) {
    __extends(WmlText, _super);
    function WmlText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromText()
    ], WmlText.prototype, "text", void 0);
    WmlText = __decorate([
        xml_serialize_1.element('t')
    ], WmlText);
    return WmlText;
}(dom_1.DocxElement));
exports.WmlText = WmlText;
var WmlSymbol = (function (_super) {
    __extends(WmlSymbol, _super);
    function WmlSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromAttribute('font')
    ], WmlSymbol.prototype, "font", void 0);
    __decorate([
        xml_serialize_1.fromAttribute('char')
    ], WmlSymbol.prototype, "char", void 0);
    WmlSymbol = __decorate([
        xml_serialize_1.element('sym')
    ], WmlSymbol);
    return WmlSymbol;
}(dom_1.DocxElement));
exports.WmlSymbol = WmlSymbol;
var WmlTab = (function (_super) {
    __extends(WmlTab, _super);
    function WmlTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlTab = __decorate([
        xml_serialize_1.element('tab')
    ], WmlTab);
    return WmlTab;
}(dom_1.DocxElement));
exports.WmlTab = WmlTab;
var WmlInstructionText = (function (_super) {
    __extends(WmlInstructionText, _super);
    function WmlInstructionText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        xml_serialize_1.fromText()
    ], WmlInstructionText.prototype, "text", void 0);
    WmlInstructionText = __decorate([
        xml_serialize_1.element("instrText")
    ], WmlInstructionText);
    return WmlInstructionText;
}(dom_1.DocxElement));
exports.WmlInstructionText = WmlInstructionText;


/***/ }),

/***/ "../src/font-table/font-table.ts":
/*!***************************************!*\
  !*** ../src/font-table/font-table.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontTablePart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var fonts_1 = __webpack_require__(/*! ./fonts */ "../src/font-table/fonts.ts");
var FontTablePart = (function (_super) {
    __extends(FontTablePart, _super);
    function FontTablePart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FontTablePart.prototype.parseXml = function (root) {
        this.fonts = fonts_1.parseFonts(root, this._package.xmlParser);
    };
    return FontTablePart;
}(part_1.Part));
exports.FontTablePart = FontTablePart;


/***/ }),

/***/ "../src/font-table/fonts.ts":
/*!**********************************!*\
  !*** ../src/font-table/fonts.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseFont = exports.parseFonts = void 0;
function parseFonts(root, xmlParser) {
    return xmlParser.elements(root).map(function (el) { return parseFont(el, xmlParser); });
}
exports.parseFonts = parseFonts;
function parseFont(elem, xmlParser) {
    var result = {
        name: xmlParser.attr(elem, "name")
    };
    for (var _i = 0, _a = xmlParser.elements(elem); _i < _a.length; _i++) {
        var el = _a[_i];
        switch (el.localName) {
            case "family":
                result.family = xmlParser.attr(el, "val");
                break;
            case "altName":
                result.altName = xmlParser.attr(el, "val");
                break;
            case "embedRegular":
                result.fontKey = xmlParser.attr(el, "fontKey");
                result.refId = xmlParser.attr(el, "id");
                break;
        }
    }
    return result;
}
exports.parseFont = parseFont;


/***/ }),

/***/ "../src/footer/footer-part.ts":
/*!************************************!*\
  !*** ../src/footer/footer-part.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FooterPart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var FooterPart = (function (_super) {
    __extends(FooterPart, _super);
    function FooterPart(pkg, path, parser) {
        var _this = _super.call(this, pkg, path) || this;
        _this._documentParser = parser;
        return _this;
    }
    FooterPart.prototype.parseXml = function (root) {
        this.footerElement = this._documentParser.parseFooter(root);
    };
    return FooterPart;
}(part_1.Part));
exports.FooterPart = FooterPart;


/***/ }),

/***/ "../src/footer/footer.ts":
/*!*******************************!*\
  !*** ../src/footer/footer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlFooter = void 0;
var dom_1 = __webpack_require__(/*! ../document/dom */ "../src/document/dom.ts");
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var WmlFooter = (function (_super) {
    __extends(WmlFooter, _super);
    function WmlFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlFooter = __decorate([
        xml_serialize_1.element("ftr")
    ], WmlFooter);
    return WmlFooter;
}(dom_1.DocxContainer));
exports.WmlFooter = WmlFooter;


/***/ }),

/***/ "../src/header/header-part.ts":
/*!************************************!*\
  !*** ../src/header/header-part.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderPart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var HeaderPart = (function (_super) {
    __extends(HeaderPart, _super);
    function HeaderPart(pkg, path, parser) {
        var _this = _super.call(this, pkg, path) || this;
        _this._documentParser = parser;
        return _this;
    }
    HeaderPart.prototype.parseXml = function (root) {
        this.headerElement = this._documentParser.parseHeader(root);
    };
    return HeaderPart;
}(part_1.Part));
exports.HeaderPart = HeaderPart;


/***/ }),

/***/ "../src/header/header.ts":
/*!*******************************!*\
  !*** ../src/header/header.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmlHeader = void 0;
var dom_1 = __webpack_require__(/*! ../document/dom */ "../src/document/dom.ts");
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var WmlHeader = (function (_super) {
    __extends(WmlHeader, _super);
    function WmlHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WmlHeader = __decorate([
        xml_serialize_1.element("hdr")
    ], WmlHeader);
    return WmlHeader;
}(dom_1.DocxContainer));
exports.WmlHeader = WmlHeader;


/***/ }),

/***/ "../src/html-renderer.ts":
/*!*******************************!*\
  !*** ../src/html-renderer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlRenderer = exports.autos = void 0;
var paragraph_1 = __webpack_require__(/*! ./document/paragraph */ "../src/document/paragraph.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "../src/utils.ts");
var javascript_1 = __webpack_require__(/*! ./javascript */ "../src/javascript.ts");
var run_1 = __webpack_require__(/*! ./document/run */ "../src/document/run.ts");
var bookmarks_1 = __webpack_require__(/*! ./document/bookmarks */ "../src/document/bookmarks.ts");
var table_1 = __webpack_require__(/*! ./document/table */ "../src/document/table.ts");
var table_row_1 = __webpack_require__(/*! ./document/table-row */ "../src/document/table-row.ts");
var table_cell_1 = __webpack_require__(/*! ./document/table-cell */ "../src/document/table-cell.ts");
var hyperlink_1 = __webpack_require__(/*! ./document/hyperlink */ "../src/document/hyperlink.ts");
var drawing_1 = __webpack_require__(/*! ./document/drawing */ "../src/document/drawing.ts");
var breaks_1 = __webpack_require__(/*! ./document/breaks */ "../src/document/breaks.ts");
var text_1 = __webpack_require__(/*! ./document/text */ "../src/document/text.ts");
var header_1 = __webpack_require__(/*! ./header/header */ "../src/header/header.ts");
var footer_1 = __webpack_require__(/*! ./footer/footer */ "../src/footer/footer.ts");
var knownColors = ['black', 'blue', 'cyan', 'darkBlue', 'darkCyan', 'darkGray', 'darkGreen', 'darkMagenta', 'darkRed', 'darkYellow', 'green', 'lightGray', 'magenta', 'none', 'red', 'white', 'yellow'];
exports.autos = {
    shd: "white",
    color: "black",
    highlight: "transparent"
};
var HtmlRenderer = (function () {
    function HtmlRenderer(htmlDocument) {
        this.htmlDocument = htmlDocument;
        this.inWrapper = true;
        this.className = "docx";
        this.keepOrigin = false;
        this.renderHeaders = true;
        this.renderFooters = true;
    }
    HtmlRenderer.prototype.render = function (document, bodyContainer, styleContainer, options) {
        if (styleContainer === void 0) { styleContainer = null; }
        this.document = document;
        this.options = options;
        this.domStyleMap = null;
        styleContainer = styleContainer || bodyContainer;
        removeAllElements(styleContainer);
        removeAllElements(bodyContainer);
        appendComment(styleContainer, "docxjs library predefined styles");
        styleContainer.appendChild(this.renderDefaultStyle());
        if (document.stylesPart != null) {
            this.domStyleMap = this.processDomStyles(document.stylesPart.domStyles);
            this.styleMap = this.processStyles(document.stylesPart.styles);
            appendComment(styleContainer, "docx document styles");
            styleContainer.appendChild(this.renderStyles(document.stylesPart.domStyles));
        }
        if (document.numberingPart) {
            appendComment(styleContainer, "docx document numbering styles");
            styleContainer.appendChild(this.renderNumbering(document.numberingPart.domNumberings, styleContainer));
        }
        if (!options.ignoreFonts && document.fontTablePart)
            this.renderFontTable(document.fontTablePart, styleContainer);
        var sectionElements = this.renderSections(document.documentPart.documentElement.body);
        if (this.inWrapper) {
            var wrapper = this.renderWrapper();
            appentElements(wrapper, sectionElements);
            bodyContainer.appendChild(wrapper);
        }
        else {
            appentElements(bodyContainer, sectionElements);
        }
    };
    HtmlRenderer.prototype.renderFontTable = function (fontsPart, styleContainer) {
        var _loop_1 = function (f) {
            this_1.document.loadFont(f.refId, f.fontKey).then(function (fontData) {
                var cssTest = "@font-face {\n                    font-family: \"" + f.name + "\";\n                    src: url(" + fontData + ");\n                }";
                appendComment(styleContainer, "Font " + f.name);
                styleContainer.appendChild(createStyleElement(cssTest));
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = fontsPart.fonts.filter(function (x) { return x.refId; }); _i < _a.length; _i++) {
            var f = _a[_i];
            _loop_1(f);
        }
    };
    HtmlRenderer.prototype.processClassName = function (className) {
        if (!className)
            return this.className;
        return this.className + "_" + className;
    };
    HtmlRenderer.prototype.processStyles = function (styles) {
        var styleMap = utils_1.keyBy(styles, function (s) { return s.id; });
        for (var _i = 0, _a = styles.filter(function (s) { return s.basedOn; }); _i < _a.length; _i++) {
            var style = _a[_i];
            var baseStyle = styleMap[style.basedOn];
            if (baseStyle) {
                style.paragraphProps = utils_1.mergeDeep(style.paragraphProps, baseStyle.paragraphProps);
                style.runProps = utils_1.mergeDeep(style.runProps, baseStyle.runProps);
            }
            else if (this.options.debug) {
                console.warn("Can't find base style " + style.basedOn);
            }
        }
        return styleMap;
    };
    HtmlRenderer.prototype.processDomStyles = function (styles) {
        var domStylesMap = {};
        for (var _i = 0, _a = styles.filter(function (x) { return x.id != null; }); _i < _a.length; _i++) {
            var style = _a[_i];
            domStylesMap[style.id] = style;
        }
        for (var _b = 0, _c = styles.filter(function (x) { return x.basedOn; }); _b < _c.length; _b++) {
            var style = _c[_b];
            var baseStyle = domStylesMap[style.basedOn];
            if (baseStyle) {
                var _loop_2 = function (styleValues) {
                    baseValues = baseStyle.styles.filter(function (x) { return x.target == styleValues.target; });
                    if (baseValues && baseValues.length > 0)
                        this_2.copyStyleProperties(baseValues[0].values, styleValues.values);
                };
                var this_2 = this, baseValues;
                for (var _d = 0, _e = style.styles; _d < _e.length; _d++) {
                    var styleValues = _e[_d];
                    _loop_2(styleValues);
                }
            }
            else if (this.options.debug)
                console.warn("Can't find base style " + style.basedOn);
        }
        for (var _f = 0, styles_1 = styles; _f < styles_1.length; _f++) {
            var style = styles_1[_f];
            style.cssName = this.processClassName(this.escapeClassName(style.id));
        }
        return domStylesMap;
    };
    HtmlRenderer.prototype.processElement = function (element) {
        if ("children" in element) {
            for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
                var e = _a[_i];
                e.className = this.processClassName(e.className);
                e.parent = element;
                if (e instanceof table_1.WmlTable) {
                    this.processTable(e);
                }
                else {
                    this.processElement(e);
                }
            }
        }
    };
    HtmlRenderer.prototype.processTable = function (table) {
        for (var _i = 0, _a = table.children; _i < _a.length; _i++) {
            var r = _a[_i];
            for (var _b = 0, _c = r.children; _b < _c.length; _b++) {
                var c = _c[_b];
                c.cssStyle = this.copyStyleProperties(table.cellStyle, c.cssStyle, [
                    "border-left", "border-right", "border-top", "border-bottom",
                    "padding-left", "padding-right", "padding-top", "padding-bottom"
                ]);
                this.processElement(c);
            }
        }
    };
    HtmlRenderer.prototype.copyStyleProperties = function (input, output, attrs) {
        if (attrs === void 0) { attrs = null; }
        if (!input)
            return output;
        if (output == null)
            output = {};
        if (attrs == null)
            attrs = Object.getOwnPropertyNames(input);
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var key = attrs_1[_i];
            if (input.hasOwnProperty(key) && !output.hasOwnProperty(key))
                output[key] = input[key];
        }
        return output;
    };
    HtmlRenderer.prototype.createElement = function (tagName, props) {
        if (props === void 0) { props = undefined; }
        return Object.assign(this.htmlDocument.createElement(tagName), props);
    };
    HtmlRenderer.prototype.renderContainer = function (elem, tagName) {
        var result = this.createElement(tagName);
        this.renderElements(elem.children, elem, result);
        return result;
    };
    HtmlRenderer.prototype.createSection = function (className, props) {
        var elem = this.createElement("section", { className: className });
        if (props) {
            if (props.pageMargins) {
                elem.style.paddingLeft = this.renderLength(props.pageMargins.left);
                elem.style.paddingRight = this.renderLength(props.pageMargins.right);
                elem.style.paddingTop = this.renderLength(props.pageMargins.top);
                elem.style.paddingBottom = this.renderLength(props.pageMargins.bottom);
            }
            if (props.pageSize) {
                if (!this.options.ignoreWidth)
                    elem.style.width = this.renderLength(props.pageSize.width);
                if (!this.options.ignoreHeight)
                    elem.style.minHeight = this.renderLength(props.pageSize.height);
            }
            if (props.columns && props.columns.numberOfColumns) {
                elem.style.columnCount = "" + props.columns.numberOfColumns;
                elem.style.columnGap = this.renderLength(props.columns.space);
                if (props.columns.separator) {
                    elem.style.columnRule = "1px solid black";
                }
            }
        }
        return elem;
    };
    HtmlRenderer.prototype.renderSections = function (document) {
        var result = [];
        this.processElement(document);
        for (var _i = 0, _a = this.splitBySection(document.children); _i < _a.length; _i++) {
            var section = _a[_i];
            var sectionProps = section.sectProps || document.sectionProps;
            var sectionElement = this.createSection(this.className, sectionProps);
            this.renderElements(section.elements, document, sectionElement);
            result.push(sectionElement);
        }
        return result;
    };
    HtmlRenderer.prototype.isPageBreakElement = function (elem) {
        if (elem instanceof breaks_1.WmlLastRenderedPageBreak)
            return !this.options.ignoreLastRenderedPageBreak;
        return elem instanceof breaks_1.WmlBreak && elem.type === "page";
    };
    HtmlRenderer.prototype.splitBySection = function (elements) {
        var _this = this;
        var _a;
        var current = { sectProps: null, elements: [] };
        var result = [current];
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            if (elem instanceof paragraph_1.WmlParagraph) {
                var styleName = elem.props.styleId;
                var s = this.styleMap && styleName ? this.styleMap[styleName] : null;
                if ((_a = s === null || s === void 0 ? void 0 : s.paragraphProps) === null || _a === void 0 ? void 0 : _a.pageBreakBefore) {
                    current.sectProps = sectProps;
                    current = { sectProps: null, elements: [] };
                    result.push(current);
                }
            }
            current.elements.push(elem);
            if (elem instanceof paragraph_1.WmlParagraph) {
                var p = elem;
                var sectProps = p.props.sectionProps;
                var pBreakIndex = -1;
                var rBreakIndex = -1;
                if (this.options.breakPages && p.children.length > 0) {
                    pBreakIndex = p.children.findIndex(function (r) {
                        var _a, _b;
                        rBreakIndex = (_b = (_a = r.children) === null || _a === void 0 ? void 0 : _a.findIndex(_this.isPageBreakElement.bind(_this))) !== null && _b !== void 0 ? _b : -1;
                        return rBreakIndex != -1;
                    });
                }
                if (sectProps || pBreakIndex != -1) {
                    current.sectProps = sectProps;
                    current = { sectProps: null, elements: [] };
                    result.push(current);
                }
                if (pBreakIndex != -1) {
                    var breakRun = p.children[pBreakIndex];
                    var splitRun = rBreakIndex < breakRun.children.length - 1;
                    if (pBreakIndex < p.children.length - 1 || splitRun) {
                        var children = elem.children;
                        var newParagraph = Object.assign(new paragraph_1.WmlParagraph(), elem, { children: children.slice(pBreakIndex) });
                        elem.children = children.slice(0, pBreakIndex);
                        current.elements.push(newParagraph);
                        if (splitRun) {
                            var runChildren = breakRun.children;
                            var newRun = Object.assign(new run_1.WmlRun(), breakRun, { children: runChildren.slice(0, rBreakIndex) });
                            elem.children.push(newRun);
                            breakRun.children = runChildren.slice(rBreakIndex);
                        }
                    }
                }
            }
        }
        var currentSectProps = null;
        for (var i = result.length - 1; i >= 0; i--) {
            if (result[i].sectProps == null) {
                result[i].sectProps = currentSectProps;
            }
            else {
                currentSectProps = result[i].sectProps;
            }
        }
        return result;
    };
    HtmlRenderer.prototype.renderLength = function (l) {
        return l ? "" + l.value + l.type : null;
    };
    HtmlRenderer.prototype.renderColor = function (c, autoColor) {
        if (autoColor === void 0) { autoColor = 'black'; }
        if (/[a-f0-9]{6}/i.test(c))
            return "#" + c;
        return c === 'auto' ? autoColor : c;
    };
    HtmlRenderer.prototype.renderWrapper = function () {
        var wrapper = document.createElement("div");
        wrapper.className = this.className + "-wrapper";
        return wrapper;
    };
    HtmlRenderer.prototype.renderDefaultStyle = function () {
        var styleText = "." + this.className + "-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } \n                ." + this.className + "-wrapper section." + this.className + " { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }\n                ." + this.className + " { color: black; }\n                section." + this.className + " { box-sizing: border-box; }\n                ." + this.className + " table { border-collapse: collapse; }\n                ." + this.className + " table td, ." + this.className + " table th { vertical-align: top; }\n                ." + this.className + " p { margin: 0pt; }";
        return createStyleElement(styleText);
    };
    HtmlRenderer.prototype.renderNumbering = function (styles, styleContainer) {
        var _this = this;
        var styleText = "";
        var rootCounters = [];
        var _loop_3 = function () {
            selector = "p." + this_3.numberingClass(num.id, num.level);
            listStyleType = "none";
            if (num.levelText && (num.format == "decimal" || num.format == "lowerLetter" || num.format == "lowerRoman")) {
                var counter = this_3.numberingCounter(num.id, num.level);
                if (num.level > 0) {
                    styleText += this_3.styleToString("p." + this_3.numberingClass(num.id, num.level - 1), {
                        "counter-reset": counter
                    });
                }
                else {
                    rootCounters.push(counter);
                }
                styleText += this_3.styleToString(selector + ":before", {
                    "content": this_3.levelTextToContent(num.levelText, num.id, this_3.numFormatToCssValue(num.format)),
                    "counter-increment": counter
                });
            }
            else if (num.bullet) {
                var valiable_1 = ("--" + this_3.className + "-" + num.bullet.src).toLowerCase();
                styleText += this_3.styleToString(selector + ":before", {
                    "content": "' '",
                    "display": "inline-block",
                    "background": "var(" + valiable_1 + ")"
                }, num.bullet.style);
                this_3.document.loadNumberingImage(num.bullet.src).then(function (data) {
                    var text = "." + _this.className + "-wrapper { " + valiable_1 + ": url(" + data + ") }";
                    styleContainer.appendChild(createStyleElement(text));
                });
            }
            else {
                listStyleType = this_3.numFormatToCssValue(num.format);
            }
            styleText += this_3.styleToString(selector, __assign({ "display": "list-item", "list-style-position": "inside", "list-style-type": listStyleType }, num.style));
        };
        var this_3 = this, selector, listStyleType;
        for (var _i = 0, styles_2 = styles; _i < styles_2.length; _i++) {
            var num = styles_2[_i];
            _loop_3();
        }
        if (rootCounters.length > 0) {
            styleText += this.styleToString("." + this.className + "-wrapper", {
                "counter-reset": rootCounters.join(" ")
            });
        }
        return createStyleElement(styleText);
    };
    HtmlRenderer.prototype.renderStyles = function (styles) {
        var styleText = "";
        var stylesMap = this.domStyleMap;
        for (var _i = 0, styles_3 = styles; _i < styles_3.length; _i++) {
            var style = styles_3[_i];
            var subStyles = style.styles;
            if (style.linked) {
                var linkedStyle = style.linked && stylesMap[style.linked];
                if (linkedStyle)
                    subStyles = subStyles.concat(linkedStyle.styles);
                else if (this.options.debug)
                    console.warn("Can't find linked style " + style.linked);
            }
            for (var _a = 0, subStyles_1 = subStyles; _a < subStyles_1.length; _a++) {
                var subStyle = subStyles_1[_a];
                var selector = "";
                if (style.target == subStyle.target)
                    selector += style.target + "." + style.cssName;
                else if (style.target)
                    selector += style.target + "." + style.cssName + " " + subStyle.target;
                else
                    selector += "." + style.cssName + " " + subStyle.target;
                if (style.isDefault && style.target)
                    selector = "." + this.className + " " + style.target + ", " + selector;
                if (style.paragraphProps && subStyle.target == "p") {
                    this.renderParagraphProperties(subStyle.values, style.paragraphProps);
                }
                styleText += this.styleToString(selector, subStyle.values);
            }
        }
        return createStyleElement(styleText);
    };
    HtmlRenderer.prototype.renderElement = function (elem, parent) {
        if (elem instanceof paragraph_1.WmlParagraph) {
            return this.renderParagraph(elem);
        }
        else if (elem instanceof bookmarks_1.WmlBookmarkStart) {
            return this.renderBookmarkStart(elem);
        }
        else if (elem instanceof run_1.WmlRun) {
            return this.renderRun(elem);
        }
        else if (elem instanceof text_1.WmlText) {
            return this.renderText(elem);
        }
        else if (elem instanceof text_1.WmlSymbol) {
            return this.renderSymbol(elem);
        }
        else if (elem instanceof text_1.WmlTab) {
            return this.renderTab(elem);
        }
        else if (elem instanceof table_1.WmlTable) {
            return this.renderTable(elem);
        }
        else if (elem instanceof table_row_1.WmlTableRow) {
            return this.renderTableRow(elem);
        }
        else if (elem instanceof table_cell_1.WmlTableCell) {
            return this.renderTableCell(elem);
        }
        else if (elem instanceof hyperlink_1.WmlHyperlink) {
            return this.renderHyperlink(elem);
        }
        else if (elem instanceof drawing_1.WmlDrawing) {
            return this.renderDrawing(elem);
        }
        else if (elem instanceof drawing_1.DmlPicture) {
            return this.renderImage(elem);
        }
        else if (elem instanceof header_1.WmlHeader) {
            return this.renderHeader(elem);
        }
        else if (elem instanceof footer_1.WmlFooter) {
            return this.renderFooter(elem);
        }
        return null;
    };
    HtmlRenderer.prototype.renderChildren = function (elem, into) {
        return this.renderElements(elem.children, elem, into);
    };
    HtmlRenderer.prototype.renderElements = function (elems, parent, into) {
        var _this = this;
        if (elems == null)
            return null;
        var result = elems.map(function (e) {
            var n = _this.renderElement(e, parent);
            if (n && _this.keepOrigin)
                n.$$docxElement = e;
            return n;
        }).filter(function (e) { return e != null; });
        if (into)
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var c = result_1[_i];
                into.appendChild(c);
            }
        return result;
    };
    HtmlRenderer.prototype.renderParagraph = function (elem) {
        var _a, _b, _c, _d;
        var result = this.renderContainer(elem, "p");
        this.renderClass(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        var style = elem.props.styleId && ((_a = this.styleMap) === null || _a === void 0 ? void 0 : _a[elem.props.styleId]);
        var numbering = (_b = elem.props.numbering) !== null && _b !== void 0 ? _b : (_c = style === null || style === void 0 ? void 0 : style.paragraphProps) === null || _c === void 0 ? void 0 : _c.numbering;
        if (numbering) {
            var numberingClass = this.numberingClass(numbering.id, (_d = numbering.level) !== null && _d !== void 0 ? _d : 0);
            result.className = utils_1.appendClass(result.className, numberingClass);
        }
        if (elem.props.styleId) {
            var styleClassName = this.processClassName(this.escapeClassName(elem.props.styleId));
            result.className = utils_1.appendClass(result.className, styleClassName);
        }
        return result;
    };
    HtmlRenderer.prototype.renderParagraphProperties = function (style, props) {
        for (var p in props) {
            var v = props[p];
            switch (p) {
                case "lineSpacing":
                    this.renderLineSpacing(style, v);
                    break;
            }
        }
    };
    HtmlRenderer.prototype.renderLineSpacing = function (style, spacing) {
    };
    HtmlRenderer.prototype.renderRunProperties = function (style, props) {
        for (var p in props) {
            var v = props[p];
            switch (p) {
                case 'highlight':
                    style['background'] = this.renderColor(v);
                    break;
                case 'shading':
                    style['background'] = this.renderShading(v);
                    break;
                case 'border':
                    style['border'] = this.renderBorder(v);
                    break;
                case 'color':
                    style["color"] = this.renderColor(v);
                    break;
                case 'fontSize':
                    style["font-size"] = this.renderLength(v);
                    break;
                case 'bold':
                    style["font-weight"] = v ? 'bold' : 'normal';
                    break;
                case 'italics':
                    style["font-style"] = v ? 'italic' : 'normal';
                    break;
                case 'smallCaps':
                    style["font-size"] = v ? 'smaller' : 'none';
                case 'caps':
                    style["text-transform"] = v ? 'uppercase' : 'none';
                    break;
                case 'strike':
                    style["text-decoration"] = v ? 'line-through' : 'none';
                    break;
                case 'fonts':
                    style["font-family"] = this.renderRunFonts(v);
                    break;
                case 'underline':
                    this.renderUnderline(style, v);
                    break;
                case 'verticalAlignment':
                    this.renderRunVerticalAlignment(style, v);
                    break;
            }
        }
    };
    HtmlRenderer.prototype.renderRunVerticalAlignment = function (style, align) {
        switch (align) {
            case 'subscript':
                style['vertical-align'] = 'sub';
                style['font-size'] = 'small';
                break;
            case 'superscript':
                style['vertical-align'] = 'super';
                style['font-size'] = 'small';
                break;
        }
    };
    HtmlRenderer.prototype.renderRunFonts = function (fonts) {
        return [fonts.ascii, fonts.hAscii, fonts.cs, fonts.eastAsia].filter(function (x) { return x; }).map(function (x) { return "'" + x + "'"; }).join(',');
    };
    HtmlRenderer.prototype.renderBorder = function (border) {
        if (border.type == 'nil')
            return 'none';
        return this.renderLength(border.size) + " solid " + this.renderColor(border.color);
    };
    HtmlRenderer.prototype.renderShading = function (shading) {
        if (shading.type == 'clear')
            return this.renderColor(shading.background, exports.autos.shd);
        return this.renderColor(shading.background, exports.autos.shd);
    };
    HtmlRenderer.prototype.renderUnderline = function (style, underline) {
        if (underline.type == null || underline.type == "none")
            return;
        switch (underline.type) {
            case "dash":
            case "dashDotDotHeavy":
            case "dashDotHeavy":
            case "dashedHeavy":
            case "dashLong":
            case "dashLongHeavy":
            case "dotDash":
            case "dotDotDash":
                style["text-decoration-style"] = "dashed";
                break;
            case "dotted":
            case "dottedHeavy":
                style["text-decoration-style"] = "dotted";
                break;
            case "double":
                style["text-decoration-style"] = "double";
                break;
            case "single":
            case "thick":
                style["text-decoration"] = "underline";
                break;
            case "wave":
            case "wavyDouble":
            case "wavyHeavy":
                style["text-decoration-style"] = "wavy";
                break;
            case "words":
                style["text-decoration"] = "underline";
                break;
        }
        if (underline.color)
            style["text-decoration-color"] = this.renderColor(underline.color);
    };
    HtmlRenderer.prototype.renderHyperlink = function (elem) {
        var result = this.createElement("a");
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        if (elem.anchor)
            result.href = elem.anchor;
        return result;
    };
    HtmlRenderer.prototype.renderDrawing = function (elem) {
        var result = this.createElement("div");
        result.style.display = "inline-block";
        result.style.position = "relative";
        result.style.textIndent = "0px";
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        return result;
    };
    HtmlRenderer.prototype.renderImage = function (elem) {
        var result = this.createElement("img");
        this.renderStyleValues(elem.cssStyle, result);
        if (this.document) {
            this.document.loadDocumentImage(elem.resourceId).then(function (x) {
                result.src = x;
            });
        }
        return result;
    };
    HtmlRenderer.prototype.renderHeader = function (elem) {
        return this.renderContainer(elem, "header");
    };
    HtmlRenderer.prototype.renderFooter = function (elem) {
        return this.renderContainer(elem, "footer");
    };
    HtmlRenderer.prototype.renderText = function (elem) {
        return this.htmlDocument.createTextNode(elem.text);
    };
    HtmlRenderer.prototype.renderSymbol = function (elem) {
        var span = this.createElement("span");
        span.style.fontFamily = elem.font;
        span.innerHTML = "&#x" + elem.char + ";";
        return span;
    };
    HtmlRenderer.prototype.renderTab = function (elem) {
        var tabSpan = this.createElement("span");
        tabSpan.innerHTML = "&emsp;";
        if (this.options.experimental) {
            setTimeout(function () {
                var paragraph = findParent(elem, paragraph_1.WmlParagraph);
                if (paragraph.props.tabs == null)
                    return;
                paragraph.props.tabs.sort(function (a, b) { return a.position.value - b.position.value; });
                tabSpan.style.display = "inline-block";
                javascript_1.updateTabStop(tabSpan, paragraph.props.tabs);
            }, 0);
        }
        return tabSpan;
    };
    HtmlRenderer.prototype.renderBookmarkStart = function (elem) {
        var result = this.createElement("span");
        result.id = elem.name;
        return result;
    };
    HtmlRenderer.prototype.renderRun = function (elem) {
        var result = this.createElement("span");
        if (elem.id)
            result.id = elem.id;
        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderRunProperties(result.style, elem.props);
        return result;
    };
    HtmlRenderer.prototype.renderTable = function (elem) {
        var _a, _b;
        var result = this.createElement("table");
        if (elem.columns)
            result.appendChild(this.renderTableColumns(elem.columns));
        if ((_a = elem.props) === null || _a === void 0 ? void 0 : _a.caption) {
            result.appendChild(this.createElement("caption", { textContent: (_b = elem.props) === null || _b === void 0 ? void 0 : _b.caption }));
        }
        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        return result;
    };
    HtmlRenderer.prototype.renderTableColumns = function (columns) {
        var result = this.createElement("colGroup");
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            var colElem = this.createElement("col");
            colElem.style.width = this.renderLength(col.width);
            result.appendChild(colElem);
        }
        return result;
    };
    HtmlRenderer.prototype.renderTableRow = function (elem) {
        var result = this.createElement("tr");
        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        return result;
    };
    HtmlRenderer.prototype.renderTableCell = function (elem) {
        var result = this.createElement("td");
        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        if (elem.span)
            result.colSpan = elem.span;
        return result;
    };
    HtmlRenderer.prototype.renderStyleValues = function (style, ouput) {
        if (style == null)
            return;
        for (var _i = 0, _a = Object.getOwnPropertyNames(style); _i < _a.length; _i++) {
            var key = _a[_i];
            ouput.style[key] = style[key];
        }
    };
    HtmlRenderer.prototype.renderClass = function (input, ouput) {
        if (input.className)
            ouput.className = input.className;
    };
    HtmlRenderer.prototype.numberingClass = function (id, lvl) {
        return this.className + "-num-" + id + "-" + lvl;
    };
    HtmlRenderer.prototype.styleToString = function (selectors, values, cssText) {
        if (cssText === void 0) { cssText = null; }
        var result = selectors + " {\r\n";
        for (var key in values) {
            result += "  " + key + ": " + values[key] + ";\r\n";
        }
        if (cssText)
            result += cssText;
        return result + "}\r\n";
    };
    HtmlRenderer.prototype.numberingCounter = function (id, lvl) {
        return this.className + "-num-" + id + "-" + lvl;
    };
    HtmlRenderer.prototype.levelTextToContent = function (text, id, numformat) {
        var _this = this;
        var result = text.replace(/%\d*/g, function (s) {
            var lvl = parseInt(s.substring(1), 10) - 1;
            return "\"counter(" + _this.numberingCounter(id, lvl) + ", " + numformat + ")\"";
        });
        return '"' + result + '"';
    };
    HtmlRenderer.prototype.numFormatToCssValue = function (format) {
        var mapping = {
            "none": "none",
            "bullet": "disc",
            "decimal": "decimal",
            "lowerLetter": "lower-alpha",
            "upperLetter": "upper-alpha",
            "lowerRoman": "lower-roman",
            "upperRoman": "upper-roman",
        };
        return mapping[format] || format;
    };
    HtmlRenderer.prototype.escapeClassName = function (className) {
        return className === null || className === void 0 ? void 0 : className.replace(/[ .]+/g, '-').replace(/[&]+/g, 'and');
    };
    return HtmlRenderer;
}());
exports.HtmlRenderer = HtmlRenderer;
function appentElements(container, children) {
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var c = children_1[_i];
        container.appendChild(c);
    }
}
function removeAllElements(elem) {
    elem.innerHTML = '';
}
function createStyleElement(cssText) {
    var styleElement = document.createElement("style");
    styleElement.innerHTML = cssText;
    return styleElement;
}
function appendComment(elem, comment) {
    elem.appendChild(document.createComment(comment));
}
function findParent(elem, type) {
    var parent = elem.parent;
    while (parent != null && !(parent instanceof type))
        parent = parent.parent;
    return parent;
}


/***/ }),

/***/ "../src/javascript.ts":
/*!****************************!*\
  !*** ../src/javascript.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateTabStop = void 0;
function updateTabStop(elem, tabs, pixelToPoint) {
    if (pixelToPoint === void 0) { pixelToPoint = 72 / 96; }
    var p = elem.closest("p");
    var tbb = elem.getBoundingClientRect();
    var pbb = p.getBoundingClientRect();
    var left = (tbb.left - pbb.left) * pixelToPoint;
    var tab = tabs.find(function (t) { return t.style != "clear" && t.position.value > left; });
    if (tab == null)
        return;
    elem.style.display = "inline-block";
    elem.style.width = (tab.position.value - left) + "pt";
    switch (tab.leader) {
        case "dot":
        case "middleDot":
            elem.style.borderBottom = "1px black dotted";
            break;
        case "hyphen":
        case "heavy":
        case "underscore":
            elem.style.borderBottom = "1px black solid";
            break;
    }
}
exports.updateTabStop = updateTabStop;


/***/ }),

/***/ "../src/numbering/numbering-part.ts":
/*!******************************************!*\
  !*** ../src/numbering/numbering-part.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberingPart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var numbering_1 = __webpack_require__(/*! ./numbering */ "../src/numbering/numbering.ts");
var NumberingPart = (function (_super) {
    __extends(NumberingPart, _super);
    function NumberingPart(pkg, path, parser) {
        var _this = _super.call(this, pkg, path) || this;
        _this._documentParser = parser;
        return _this;
    }
    NumberingPart.prototype.parseXml = function (root) {
        Object.assign(this, numbering_1.parseNumberingPart(root, this._package.xmlParser));
        this.domNumberings = this._documentParser.parseNumberingFile(root);
    };
    return NumberingPart;
}(part_1.Part));
exports.NumberingPart = NumberingPart;


/***/ }),

/***/ "../src/numbering/numbering.ts":
/*!*************************************!*\
  !*** ../src/numbering/numbering.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseNumberingBulletPicture = exports.parseNumberingLevelOverrride = exports.parseNumberingLevel = exports.parseAbstractNumbering = exports.parseNumbering = exports.parseNumberingPart = void 0;
var paragraph_1 = __webpack_require__(/*! ../document/paragraph */ "../src/document/paragraph.ts");
var run_1 = __webpack_require__(/*! ../document/run */ "../src/document/run.ts");
function parseNumberingPart(elem, xml) {
    var result = {
        numberings: [],
        abstractNumberings: [],
        bulletPictures: []
    };
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "num":
                result.numberings.push(parseNumbering(e, xml));
                break;
            case "abstractNum":
                result.abstractNumberings.push(parseAbstractNumbering(e, xml));
                break;
            case "numPicBullet":
                result.bulletPictures.push(parseNumberingBulletPicture(e, xml));
                break;
        }
    }
    return result;
}
exports.parseNumberingPart = parseNumberingPart;
function parseNumbering(elem, xml) {
    var result = {
        id: xml.attr(elem, 'numId'),
        overrides: []
    };
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "abstractNumId":
                result.abstractId = xml.attr(e, "val");
                break;
            case "lvlOverride":
                result.overrides.push(parseNumberingLevelOverrride(e, xml));
                break;
        }
    }
    return result;
}
exports.parseNumbering = parseNumbering;
function parseAbstractNumbering(elem, xml) {
    var result = {
        id: xml.attr(elem, 'abstractNumId'),
        levels: []
    };
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "name":
                result.name = xml.attr(e, "val");
                break;
            case "multiLevelType":
                result.multiLevelType = xml.attr(e, "val");
                break;
            case "numStyleLink":
                result.numberingStyleLink = xml.attr(e, "val");
                break;
            case "styleLink":
                result.styleLink = xml.attr(e, "val");
                break;
            case "lvl":
                result.levels.push(parseNumberingLevel(e, xml));
                break;
        }
    }
    return result;
}
exports.parseAbstractNumbering = parseAbstractNumbering;
function parseNumberingLevel(elem, xml) {
    var result = {
        level: xml.intAttr(elem, 'ilvl')
    };
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "start":
                result.start = xml.attr(e, "val");
                break;
            case "lvlRestart":
                result.restart = xml.intAttr(e, "val");
                break;
            case "numFmt":
                result.format = xml.attr(e, "val");
                break;
            case "lvlText":
                result.text = xml.attr(e, "val");
                break;
            case "lvlJc":
                result.justification = xml.attr(e, "val");
                break;
            case "lvlPicBulletId":
                result.bulletPictureId = xml.attr(e, "val");
                break;
            case "pPr":
                result.paragraphProps = paragraph_1.parseParagraphProperties(e, xml);
                break;
            case "rPr":
                result.runProps = run_1.parseRunProperties(e, xml);
                break;
        }
    }
    return result;
}
exports.parseNumberingLevel = parseNumberingLevel;
function parseNumberingLevelOverrride(elem, xml) {
    var result = {
        level: xml.intAttr(elem, 'ilvl')
    };
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "startOverride":
                result.start = xml.intAttr(e, "val");
                break;
            case "lvl":
                result.numberingLevel = parseNumberingLevel(e, xml);
                break;
        }
    }
    return result;
}
exports.parseNumberingLevelOverrride = parseNumberingLevelOverrride;
function parseNumberingBulletPicture(elem, xml) {
    var pict = xml.element(elem, "pict");
    var shape = pict && xml.element(pict, "shape");
    var imagedata = shape && xml.element(shape, "imagedata");
    return imagedata ? {
        id: xml.attr(elem, "numPicBulletId"),
        referenceId: xml.attr(imagedata, "id"),
        style: xml.attr(shape, "style")
    } : null;
}
exports.parseNumberingBulletPicture = parseNumberingBulletPicture;


/***/ }),

/***/ "../src/parser/xml-parser.ts":
/*!***********************************!*\
  !*** ../src/parser/xml-parser.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XmlParser = exports.attr = exports.elements = exports.serializeXmlString = exports.parseXmlString = void 0;
var common_1 = __webpack_require__(/*! ../document/common */ "../src/document/common.ts");
function parseXmlString(xmlString, trimXmlDeclaration) {
    if (trimXmlDeclaration === void 0) { trimXmlDeclaration = false; }
    if (trimXmlDeclaration)
        xmlString = xmlString.replace(/<[?].*[?]>/, "");
    var result = new DOMParser().parseFromString(xmlString, "application/xml");
    var errorText = hasXmlParserError(result);
    if (errorText)
        throw new Error(errorText);
    return result;
}
exports.parseXmlString = parseXmlString;
function hasXmlParserError(doc) {
    var _a;
    return (_a = doc.getElementsByTagName("parsererror")[0]) === null || _a === void 0 ? void 0 : _a.textContent;
}
function serializeXmlString(elem) {
    return new XMLSerializer().serializeToString(elem);
}
exports.serializeXmlString = serializeXmlString;
function elements(elem, localName) {
    if (localName === void 0) { localName = null; }
    var result = [];
    for (var i = 0, l = elem.childNodes.length; i < l; i++) {
        var c = elem.childNodes.item(i);
        if (c.nodeType == Node.ELEMENT_NODE && (localName == null || c.localName == localName))
            result.push(c);
    }
    return result;
}
exports.elements = elements;
function attr(elem, localName) {
    for (var i = 0, l = elem.attributes.length; i < l; i++) {
        var a = elem.attributes.item(i);
        if (a.localName == localName)
            return a.value;
    }
    return null;
}
exports.attr = attr;
var XmlParser = (function () {
    function XmlParser() {
        this.elements = elements;
        this.attr = attr;
    }
    XmlParser.prototype.element = function (elem, localName) {
        for (var i = 0, l = elem.childNodes.length; i < l; i++) {
            var c = elem.childNodes.item(i);
            if (c.nodeType == 1 && c.localName == localName)
                return c;
        }
        return null;
    };
    XmlParser.prototype.intAttr = function (node, attrName, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var val = this.attr(node, attrName);
        return val ? parseInt(val) : defaultValue;
    };
    XmlParser.prototype.floatAttr = function (node, attrName, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var val = this.attr(node, attrName);
        return val ? parseFloat(val) : defaultValue;
    };
    XmlParser.prototype.boolAttr = function (node, attrName, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return common_1.convertBoolean(this.attr(node, attrName), defaultValue);
    };
    XmlParser.prototype.percentageAttr = function (node, attrName) {
        return common_1.convertPercentage(this.attr(node, attrName));
    };
    XmlParser.prototype.lengthAttr = function (node, attrName, usage) {
        if (usage === void 0) { usage = common_1.LengthUsage.Dxa; }
        return common_1.convertLength(this.attr(node, attrName), usage);
    };
    return XmlParser;
}());
exports.XmlParser = XmlParser;
var globalXmlParser = new XmlParser();
exports.default = globalXmlParser;


/***/ }),

/***/ "../src/parser/xml-serialize.ts":
/*!**************************************!*\
  !*** ../src/parser/xml-serialize.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserializeSchema = exports.deserializeElement = exports.buildXmlSchema = exports.fromElement = exports.fromAttribute = exports.fromText = exports.children = exports.element = void 0;
var schemaSymbol = Symbol("open-xml-schema");
function element(name) {
    return function (target) {
        var schema = getPrototypeXmlSchema(target.prototype);
        schema.elemName = name;
    };
}
exports.element = element;
function children() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    return function (target) {
        var schema = getPrototypeXmlSchema(target.prototype);
        schema.children = {};
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var c = elements_1[_i];
            var cs = getPrototypeXmlSchema(c.prototype);
            schema.children[cs.elemName] = { proto: c.prototype, schema: cs };
        }
    };
}
exports.children = children;
function fromText(convert) {
    if (convert === void 0) { convert = null; }
    return function (target, prop) {
        var schema = getPrototypeXmlSchema(target);
        schema.text = { prop: prop, convert: convert };
    };
}
exports.fromText = fromText;
function fromAttribute(attrName, convert) {
    if (convert === void 0) { convert = null; }
    return function (target, prop) {
        var schema = getPrototypeXmlSchema(target);
        schema.attrs[attrName] = { prop: prop, convert: convert };
    };
}
exports.fromAttribute = fromAttribute;
function fromElement(elemName, convert) {
    return function (target, prop) {
        var schema = getPrototypeXmlSchema(target);
        schema.elements[elemName] = { prop: prop, convert: convert };
    };
}
exports.fromElement = fromElement;
function buildXmlSchema(schemaObj) {
    var schema = {
        text: null,
        attrs: {},
        elements: {},
        elemName: null,
        children: null
    };
    for (var p in schemaObj) {
        var v = schemaObj[p];
        if (p == "$elem") {
            schema.elemName = v;
        }
        else if (v.$attr) {
            schema.attrs[v.$attr] = { prop: p, convert: null };
        }
    }
    return schema;
}
exports.buildXmlSchema = buildXmlSchema;
function deserializeElement(n, output, ops) {
    var proto = Object.getPrototypeOf(output);
    var schema = proto[schemaSymbol];
    if (ops === null || ops === void 0 ? void 0 : ops.keepOrigin) {
        output.$$xmlElement = n;
    }
    if (schema == null)
        return output;
    deserializeSchema(n, output, schema);
    for (var i = 0, l = n.children.length; i < l; i++) {
        var elem = n.children.item(i);
        var child = schema.children[elem.localName];
        if (child) {
            var obj = Object.create(child.proto);
            deserializeElement(elem, obj, ops);
            output.children.push(obj);
        }
    }
    return output;
}
exports.deserializeElement = deserializeElement;
function deserializeSchema(n, output, schema) {
    if (schema.text) {
        var prop = schema.text;
        output[prop.prop] = prop.convert ? prop.convert(n.textContent) : n.textContent;
    }
    for (var i = 0, l = n.attributes.length; i < l; i++) {
        var attr = n.attributes.item(i);
        var prop = schema.attrs[attr.localName];
        if (prop == null)
            continue;
        output[prop.prop] = prop.convert ? prop.convert(attr.value) : attr.value;
    }
    for (var i = 0, l = n.childNodes.length; i < l; i++) {
        var elem = n.childNodes.item(i);
        var prop = elem.nodeType === Node.ELEMENT_NODE ? schema.elements[elem.localName] : null;
        if (prop == null)
            continue;
        output[prop.prop] = prop.convert(elem);
    }
    return output;
}
exports.deserializeSchema = deserializeSchema;
function getPrototypeXmlSchema(proto) {
    return proto[schemaSymbol] || (proto[schemaSymbol] = {
        text: null,
        attrs: {},
        children: {},
        elements: {}
    });
}


/***/ }),

/***/ "../src/styles/document-defaults.ts":
/*!******************************************!*\
  !*** ../src/styles/document-defaults.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseDocumentDefaults = void 0;
var paragraph_1 = __webpack_require__(/*! ../document/paragraph */ "../src/document/paragraph.ts");
var run_1 = __webpack_require__(/*! ../document/run */ "../src/document/run.ts");
function parseDocumentDefaults(elem, xml) {
    var result = {};
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "pPrDefault":
                var pPrElem = xml.element(e, 'pPr');
                if (pPrElem)
                    result.paragraphProps = paragraph_1.parseParagraphProperties(pPrElem, xml);
                break;
            case "rPrDefault":
                var rPrElem = xml.element(e, 'rPr');
                if (rPrElem)
                    result.runProps = run_1.parseRunProperties(rPrElem, xml);
                break;
        }
    }
    return result;
}
exports.parseDocumentDefaults = parseDocumentDefaults;


/***/ }),

/***/ "../src/styles/style.ts":
/*!******************************!*\
  !*** ../src/styles/style.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseStyle = exports.WmlStyle = void 0;
var common_1 = __webpack_require__(/*! ../document/common */ "../src/document/common.ts");
var paragraph_1 = __webpack_require__(/*! ../document/paragraph */ "../src/document/paragraph.ts");
var run_1 = __webpack_require__(/*! ../document/run */ "../src/document/run.ts");
var xml_serialize_1 = __webpack_require__(/*! ../parser/xml-serialize */ "../src/parser/xml-serialize.ts");
var WmlStyle = (function () {
    function WmlStyle() {
    }
    __decorate([
        xml_serialize_1.fromAttribute("styleId")
    ], WmlStyle.prototype, "id", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("type")
    ], WmlStyle.prototype, "type", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("customStyle", common_1.convertBoolean)
    ], WmlStyle.prototype, "customStyle", void 0);
    __decorate([
        xml_serialize_1.fromAttribute("default", common_1.convertBoolean)
    ], WmlStyle.prototype, "default", void 0);
    WmlStyle = __decorate([
        xml_serialize_1.element("style")
    ], WmlStyle);
    return WmlStyle;
}());
exports.WmlStyle = WmlStyle;
function parseStyle(elem, xml) {
    var result = xml_serialize_1.deserializeElement(elem, new WmlStyle(), null);
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "pPr":
                result.paragraphProps = paragraph_1.parseParagraphProperties(e, xml);
                break;
            case "rPr":
                result.runProps = run_1.parseRunProperties(e, xml);
                break;
            case "name":
                result.name = xml.attr(e, 'val');
                break;
            case "basedOn":
                result.basedOn = xml.attr(e, 'val');
                break;
            case "aliases":
                result.aliases = xml.attr(e, 'val').split(',');
                break;
            case "link":
                result.link = xml.attr(e, 'val');
                break;
            case "next":
                result.next = xml.attr(e, 'val');
                break;
            case "autoRedefine":
                result.autoRedefine = true;
                break;
            case "hidden":
                result.hidden = true;
                break;
            case "semiHidden":
                result.semiHidden = true;
                break;
            case "locked":
                result.locked = true;
                break;
            case "uiPriority":
                result.uiPriority = xml.intAttr(e, 'val');
                ;
                break;
        }
    }
    return result;
}
exports.parseStyle = parseStyle;


/***/ }),

/***/ "../src/styles/styles-part.ts":
/*!************************************!*\
  !*** ../src/styles/styles-part.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseStylesPart = exports.StylesPart = void 0;
var part_1 = __webpack_require__(/*! ../common/part */ "../src/common/part.ts");
var document_defaults_1 = __webpack_require__(/*! ./document-defaults */ "../src/styles/document-defaults.ts");
var style_1 = __webpack_require__(/*! ./style */ "../src/styles/style.ts");
var StylesPart = (function (_super) {
    __extends(StylesPart, _super);
    function StylesPart(pkg, path, parser) {
        var _this = _super.call(this, pkg, path) || this;
        _this._documentParser = parser;
        return _this;
    }
    StylesPart.prototype.parseXml = function (root) {
        Object.assign(this, parseStylesPart(root, this._package.xmlParser));
        this.domStyles = this._documentParser.parseStylesFile(root);
    };
    return StylesPart;
}(part_1.Part));
exports.StylesPart = StylesPart;
function parseStylesPart(elem, xml) {
    var result = {
        styles: []
    };
    for (var _i = 0, _a = xml.elements(elem); _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.localName) {
            case "docDefaults":
                result.defaults = document_defaults_1.parseDocumentDefaults(e, xml);
                break;
            case "style":
                result.styles.push(style_1.parseStyle(e, xml));
                break;
        }
    }
    return result;
}
exports.parseStylesPart = parseStylesPart;


/***/ }),

/***/ "../src/utils.ts":
/*!***********************!*\
  !*** ../src/utils.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeDeep = exports.isObject = exports.keyBy = exports.splitPath = exports.appendClass = exports.addElementClass = void 0;
function addElementClass(element, className) {
    return element.className = appendClass(element.className, className);
}
exports.addElementClass = addElementClass;
function appendClass(classList, className) {
    return (!classList) ? className : classList + " " + className;
}
exports.appendClass = appendClass;
function splitPath(path) {
    var si = path.lastIndexOf('/') + 1;
    var folder = si == 0 ? "" : path.substring(0, si);
    var fileName = si == 0 ? path : path.substring(si);
    return [folder, fileName];
}
exports.splitPath = splitPath;
function keyBy(array, by) {
    return array.reduce(function (a, x) {
        a[by(x)] = x;
        return a;
    }, {});
}
exports.keyBy = keyBy;
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
exports.isObject = isObject;
function mergeDeep(target) {
    var _a;
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!sources.length)
        return target;
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                var val = (_a = target[key]) !== null && _a !== void 0 ? _a : (target[key] = {});
                mergeDeep(val, source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return mergeDeep.apply(void 0, __spreadArray([target], sources));
}
exports.mergeDeep = mergeDeep;


/***/ }),

/***/ "../src/word-document.ts":
/*!*******************************!*\
  !*** ../src/word-document.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deobfuscate = exports.WordDocument = void 0;
var relationship_1 = __webpack_require__(/*! ./common/relationship */ "../src/common/relationship.ts");
var font_table_1 = __webpack_require__(/*! ./font-table/font-table */ "../src/font-table/font-table.ts");
var open_xml_package_1 = __webpack_require__(/*! ./common/open-xml-package */ "../src/common/open-xml-package.ts");
var document_part_1 = __webpack_require__(/*! ./document/document-part */ "../src/document/document-part.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "../src/utils.ts");
var numbering_part_1 = __webpack_require__(/*! ./numbering/numbering-part */ "../src/numbering/numbering-part.ts");
var styles_part_1 = __webpack_require__(/*! ./styles/styles-part */ "../src/styles/styles-part.ts");
var footer_part_1 = __webpack_require__(/*! ./footer/footer-part */ "../src/footer/footer-part.ts");
var header_part_1 = __webpack_require__(/*! ./header/header-part */ "../src/header/header-part.ts");
var extended_props_part_1 = __webpack_require__(/*! ./document-props/extended-props-part */ "../src/document-props/extended-props-part.ts");
var topLevelRels = [
    { type: relationship_1.RelationshipTypes.OfficeDocument, target: "word/document.xml" },
    { type: relationship_1.RelationshipTypes.ExtendedProperties, target: "docProps/app.xml" },
];
var WordDocument = (function () {
    function WordDocument() {
        this.parts = [];
        this.partsMap = {};
    }
    WordDocument.load = function (blob, parser, options) {
        var d = new WordDocument();
        d._parser = parser;
        return open_xml_package_1.OpenXmlPackage.load(blob, options)
            .then(function (pkg) {
            d._package = pkg;
            return d._package.loadRelationships();
        }).then(function (rels) {
            d.rels = rels;
            var tasks = topLevelRels.map(function (rel) {
                var _a;
                var r = (_a = rels.find(function (x) { return x.type === rel.type; })) !== null && _a !== void 0 ? _a : rel;
                return d.loadRelationshipPart(r.target, r.type);
            });
            return Promise.all(tasks);
        }).then(function () { return d; });
    };
    WordDocument.prototype.save = function (type) {
        if (type === void 0) { type = "blob"; }
        return this._package.save(type);
    };
    WordDocument.prototype.loadRelationshipPart = function (path, type) {
        var _this = this;
        if (this.partsMap[path])
            return Promise.resolve(this.partsMap[path]);
        if (!this._package.get(path))
            return Promise.resolve(null);
        var part = null;
        switch (type) {
            case relationship_1.RelationshipTypes.OfficeDocument:
                this.documentPart = part = new document_part_1.DocumentPart(this._package, path, this._parser);
                break;
            case relationship_1.RelationshipTypes.FontTable:
                this.fontTablePart = part = new font_table_1.FontTablePart(this._package, path);
                break;
            case relationship_1.RelationshipTypes.Numbering:
                this.numberingPart = part = new numbering_part_1.NumberingPart(this._package, path, this._parser);
                break;
            case relationship_1.RelationshipTypes.Styles:
                this.stylesPart = part = new styles_part_1.StylesPart(this._package, path, this._parser);
                break;
            case relationship_1.RelationshipTypes.Footer:
                part = new footer_part_1.FooterPart(this._package, path, this._parser);
                break;
            case relationship_1.RelationshipTypes.Header:
                part = new header_part_1.HeaderPart(this._package, path, this._parser);
                break;
            case relationship_1.RelationshipTypes.ExtendedProperties:
                this.extendedPropsPart = part = new extended_props_part_1.ExtendedPropsPart(this._package, path);
                break;
        }
        if (part == null)
            return Promise.resolve(null);
        this.partsMap[path] = part;
        this.parts.push(part);
        return part.load().then(function () {
            if (part.rels == null || part.rels.length == 0)
                return part;
            var folder = utils_1.splitPath(part.path)[0];
            var rels = part.rels.map(function (rel) {
                return _this.loadRelationshipPart("" + folder + rel.target, rel.type);
            });
            return Promise.all(rels).then(function () { return part; });
        });
    };
    WordDocument.prototype.loadDocumentImage = function (id) {
        return this.loadResource(this.documentPart, id, "blob")
            .then(function (x) { return x ? URL.createObjectURL(x) : null; });
    };
    WordDocument.prototype.loadNumberingImage = function (id) {
        return this.loadResource(this.numberingPart, id, "blob")
            .then(function (x) { return x ? URL.createObjectURL(x) : null; });
    };
    WordDocument.prototype.loadFont = function (id, key) {
        return this.loadResource(this.fontTablePart, id, "uint8array")
            .then(function (x) { return x ? URL.createObjectURL(new Blob([deobfuscate(x, key)])) : x; });
    };
    WordDocument.prototype.getPathById = function (part, id) {
        var rel = part.rels.find(function (x) { return x.id == id; });
        return rel ? utils_1.splitPath(part.path)[0] + rel.target : null;
    };
    WordDocument.prototype.loadResource = function (part, id, outputType) {
        var path = this.getPathById(part, id);
        return path ? this._package.load(path, outputType) : Promise.resolve(null);
    };
    return WordDocument;
}());
exports.WordDocument = WordDocument;
function deobfuscate(data, guidKey) {
    var len = 16;
    var trimmed = guidKey.replace(/{|}|-/g, "");
    var numbers = new Array(len);
    for (var i = 0; i < len; i++)
        numbers[len - i - 1] = parseInt(trimmed.substr(i * 2, 2), 16);
    for (var i = 0; i < 32; i++)
        data[i] = data[i] ^ numbers[i % len];
    return data;
}
exports.deobfuscate = deobfuscate;


/***/ }),

/***/ "jszip":
/*!************************!*\
  !*** external "JSZip" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jszip__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var docx_editor_core_1 = __webpack_require__(/*! ./docx-editor-core */ "./src/docx-editor-core.ts");
var root = document.querySelector("#root");
var fileInput = document.querySelector("#fileInput");
var loadBtn = document.querySelector("#loadBtn");
var saveBtn = document.querySelector("#saveBtn");
var editor = new docx_editor_core_1.DocxEditorCore();
editor.init(root, root);
loadBtn.addEventListener('click', function () {
    if (fileInput.files.length > 0) {
        editor.open(fileInput.files[0]);
    }
});
saveBtn.addEventListener('click', function () {
    editor.save().then(saveAs);
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map