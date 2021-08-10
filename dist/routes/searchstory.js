"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var SearchService_1 = __importDefault(require("../services/SearchService"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    if (!req.body.searchword) {
        res.status(400); //Bad req
        res.send('No searchwords provided');
        return;
    }
    SearchService_1.default(req.body.searchword).then(function (searchRes) {
        res.status(200);
        res.send(searchRes);
    }).catch(function (err) {
        res.status(400);
        res.send(err);
    });
});
exports.default = router;
