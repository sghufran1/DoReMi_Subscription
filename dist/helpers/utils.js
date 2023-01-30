"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
/*
* Utilities
*/
const fs = __importStar(require("fs"));
const shell = __importStar(require("shelljs"));
exports.utils = {
    /*
    * Writes the given string into a text file. The path is created if it does not exist
    */
    writeFile: function (fileName, str) {
        // Create the path if required
        // eslint-disable-next-line prefer-const
        let temp = fileName.split('/');
        temp.splice(temp.length - 3, 3);
        exports.utils.mkdirp(temp.join('/dist/storage/'));
        fs.writeFileSync(fileName, str);
    },
    /*
    * Create the given path, if it does not exist
    */
    mkdirp: function (fullPath) {
        shell.mkdir('-p', fullPath);
    },
    /*
    * Deletes the specified file
    */
    deleteFile: function (fileName) {
        if (fs.existsSync(fileName))
            fs.unlinkSync(fileName);
    }
};
