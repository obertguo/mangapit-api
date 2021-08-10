"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var searchstory_1 = __importDefault(require("./routes/searchstory"));
var chapter_1 = __importDefault(require("./routes/chapter"));
var story_1 = __importDefault(require("./routes/story"));
var app = express_1.default();
var PORT = 4000;
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true })); //handles form-encoded post data in req.body
app.use(express_1.default.json()); //handles json post data in req.body
app.use('/searchstory', searchstory_1.default);
app.use('/chapter', chapter_1.default);
app.use('/story', story_1.default);
