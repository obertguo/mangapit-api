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
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var ChapterService = /** @class */ (function () {
    function ChapterService(document) {
        this.$ = cheerio_1.default.load(document);
    }
    ChapterService.fetchPageByURL = function (url) {
        return new Promise(function (resolve, reject) {
            axios_1.default.get(url).then(function (res) {
                if (cheerio_1.default.load(res.data)('title').text().startsWith('404'))
                    reject('Chapter not found');
                resolve(new ChapterService(res.data));
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    ChapterService.fetchPageByID = function (storyID, chapter) {
        var _this = this;
        //https://read.mangabat.com/read-INSERT_ID_HERE-chap-INSERT_CHAPTER_NUMBER
        //The website has multiple domains - very annoying
        var url1 = "https://mkklcdnv6temp.com/read-" + storyID + "-chap-" + chapter;
        var url2 = "https://read.mangabat.com/read-" + storyID + "-chap-" + chapter;
        var url3 = "https://m.mangabat.com/read-" + storyID + "-chap-" + chapter;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.fetchPageByURL(url1).then(function (res) { return resolve(res); }).catch(function (err) {
                    _this.fetchPageByURL(url2).then(function (res) { return resolve(res); }).catch(function (err) {
                        _this.fetchPageByURL(url3).then(function (res) { return resolve(res); }).catch(function (err) {
                            reject(err);
                        });
                    });
                });
                return [2 /*return*/];
            });
        }); });
    };
    ChapterService.prototype.getChapterImageLinks = function () {
        var _this = this;
        var links = [];
        this.$('.container-chapter-reader').find('img').each(function (i, el) {
            //img link is protected by cloudflare 
            //a get request to the link is needed with the referer header prop set to the manga's domain https://mkklcdnv6temp.com or mangabat or mangakakalot, etc
            var link = _this.$(el).attr('src');
            links.push(link || '');
        });
        return links;
    };
    ChapterService.getImageBuffer = function (imageLink) {
        return new Promise(function (resolve, reject) {
            axios_1.default({
                method: 'get',
                url: imageLink,
                responseType: 'arraybuffer',
                headers: {
                    Referer: 'https://mkklcdnv6temp.com/'
                }
            }).then(function (res) {
                resolve(res.data);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    ChapterService.prototype.getTitle = function () {
        return this.$('.panel-chapter-info-top').find('h1').text();
    };
    ChapterService.prototype.getStoryLink = function () {
        var link = this.$('.panel-breadcrumb').find('a').get(1);
        return this.$(link).attr('href') || '';
    };
    ChapterService.prototype.getPreviousChapterLink = function () {
        var _this = this;
        //When no prev link, the string is 0 in size
        var link = '';
        this.$('.navi-change-chapter-btn').find('a').each(function (i, el) {
            if (_this.$(el).text() === 'PREV CHAPTER') {
                link = _this.$(el).attr('href') || '';
            }
        });
        return link;
    };
    ChapterService.prototype.getNextChapterLink = function () {
        var _this = this;
        //When no next link, the string is 0 in size
        var link = '';
        this.$('.navi-change-chapter-btn').find('a').each(function (i, el) {
            if (_this.$(el).text() === 'NEXT CHAPTER') {
                link = _this.$(el).attr('href') || '';
            }
        });
        return link;
    };
    return ChapterService;
}());
exports.default = ChapterService;
