"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    //Story link: https://read.mangabat.com/read-INSERT_ID_HERE
    //e.g https://read.mangabat.com/read-vk14233
    //Chapter link: https://read.mangabat.com/read-INSERT_ID_HERE-chap-INSERT_CHAPTER_NUMBER
    //e.g., https://read.mangabat.com/read-vk14233-chap-1
    //Function to return manga id based on either the story or chapter link
    Utils.getStoryID = function (link) {
        var res = link.split('read').pop();
        return res.split('-')[1];
    };
    //Function to get chapter number on a chapter page
    Utils.getChapterNumber = function (link) {
        if (link.length === 0)
            return '';
        var res = link.split('chap')[1].substr(1);
        return res;
    };
    return Utils;
}());
exports.default = Utils;
