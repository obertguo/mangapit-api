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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var url_1 = __importDefault(require("url"));
var Utils_1 = __importDefault(require("../Utils"));
var search = function (searchword) {
    return new Promise(function (resolve, reject) {
        //Site uses form url encoded format, where searchword = keyword 
        var params = new url_1.default.URLSearchParams({ 'searchword': searchword });
        axios_1.default.post('https://mkklcdnv6temp.com/getstorysearchjson', params.toString()).then(function (res) {
            var stories;
            stories = res.data;
            if (stories.length === 0)
                reject("No results found");
            stories = stories.map(function (el) {
                //Remove link formatting and retrieve id based on url
                return __assign(__assign({}, el), { id: Utils_1.default.getStoryID(el.url_story), name: el.name.split('<span style="color: #FF530D;font-weight: bold;">').join('').split('</span>').join(''), author: el.author.split('<span style="color: #FF530D;font-weight: bold;">').join('').split('</span>').join('') });
            });
            resolve(stories);
        }).catch(function (err) {
            reject(err);
        });
    });
    //Data returns array of search items
    //Response ex: 
    /*
        [
            {
                id: '35715',
                url_story: 'https://mkklcdnv6temp.com/read-ou392961',
                name: 'Someday Will I Be the Grea<span style="color: #FF530D;font-weight: bold;">test</span> Alchemist?',
                nameunsigned: 'wy924603',
                lastchapter: 'Chapter 4',
                image: 'https://avt.mkklcdnv6temp.com/32/q/22-1603780885.jpg',
                author: 'Maru KOGITSUNE,Taro SASAKAMA'
            }
        ]
  */
};
exports.default = search;
