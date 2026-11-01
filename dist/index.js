"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const host = process.argv[2] || '127.0.0.1';
const start = Number(process.argv[3]) || 1;
const end = Number(process.argv[4]) || 1024;
const timeout = 500;
function check(port) {
    return new Promise(resolve => {
        const s = net_1.default.createConnection({ host, port });
        s.setTimeout(timeout);
        s.on('connect', () => { s.destroy(); resolve(true); });
        s.on('timeout', () => { s.destroy(); resolve(false); });
        s.on('error', () => resolve(false));
    });
}
(async () => {
    const open = [];
    for (let p = start; p <= end; p++) {
        if (await check(p)) {
            open.push(p);
            console.log('open', p);
        }
    }
    console.log('done. open ports:', open.join(', ') || 'none');
})();
