"use strict";
/**
 * index.ts - File chính của ứng dụng kiểm tra số dư ví trên mạng Ronin Saigon testnet
 *
 * Ứng dụng này được thiết kế cho học sinh trung học cơ sở và trung học phổ thông (lớp 9-12)
 * để học cách kết nối và tương tác với blockchain thông qua TypeScript.
 */
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Import các thư viện cần thiết
const ethers_1 = require("ethers"); // Thư viện ethers.js để tương tác với blockchain
const readline = __importStar(require("readline")); // Thư viện để đọc dữ liệu từ bàn phím
const utils_1 = require("./utils"); // Import các hàm tiện ích
// Định nghĩa URL của node RPC Ronin Saigon testnet
const RONIN_SAIGON_RPC_URL = 'https://saigon-testnet.roninchain.com/rpc';
/**
 * Hàm chính để kiểm tra số dư của một địa chỉ ví
 *
 * @param address - Địa chỉ ví EVM cần kiểm tra số dư
 * @returns Promise<string> - Số dư của địa chỉ ví ở dạng RON
 */
async function checkBalance(address) {
    try {
        // Kiểm tra tính hợp lệ của địa chỉ
        if (!(0, utils_1.isValidEVMAddress)(address)) {
            throw new Error('Địa chỉ ví không hợp lệ. Địa chỉ phải bắt đầu bằng 0x và có 42 ký tự.');
        }
        console.log('Đang kết nối đến mạng Ronin Saigon testnet...');
        // Tạo kết nối đến node RPC
        // Provider là cổng kết nối đến blockchain
        const provider = new ethers_1.ethers.JsonRpcProvider(RONIN_SAIGON_RPC_URL);
        // Lấy số dư của địa chỉ (trả về ở dạng wei)
        const balanceInWei = await provider.getBalance(address);
        // Chuyển đổi từ wei sang RON để dễ đọc
        const balanceInRon = (0, utils_1.convertWeiToRon)(balanceInWei);
        return balanceInRon;
    }
    catch (error) {
        // Xử lý lỗi
        if (error instanceof Error) {
            throw new Error(`Lỗi khi kiểm tra số dư: ${error.message}`);
        }
        else {
            throw new Error('Đã xảy ra lỗi không xác định khi kiểm tra số dư');
        }
    }
}
/**
 * Hàm tạo giao diện dòng lệnh để nhập địa chỉ ví
 *
 * @returns Promise<string> - Địa chỉ ví người dùng nhập vào
 */
function promptForAddress() {
    // Tạo giao diện đọc dữ liệu từ bàn phím
    const rl = readline.createInterface({
        input: process.stdin, // Đầu vào từ bàn phím
        output: process.stdout // Đầu ra là màn hình console
    });
    return new Promise((resolve) => {
        // Hiển thị thông báo và đợi người dùng nhập địa chỉ
        rl.question('Nhập địa chỉ ví EVM: ', (address) => {
            rl.close(); // Đóng giao diện đọc dữ liệu
            resolve(address.trim()); // Trả về địa chỉ đã nhập (loại bỏ khoảng trắng thừa)
        });
    });
}
/**
 * Hàm main - Điểm khởi đầu của chương trình
 */
async function main() {
    try {
        // Nhận địa chỉ ví từ người dùng
        const address = await promptForAddress();
        // Kiểm tra số dư
        const balance = await checkBalance(address);
        // Hiển thị kết quả
        console.log(`Số dư của địa chỉ ${(0, utils_1.formatAddress)(address)}: ${balance} RON`);
    }
    catch (error) {
        // Xử lý và hiển thị lỗi
        if (error instanceof Error) {
            console.error(`Lỗi: ${error.message}`);
        }
        else {
            console.error('Đã xảy ra lỗi không xác định');
        }
    }
}
// Gọi hàm main để bắt đầu chương trình
main();
