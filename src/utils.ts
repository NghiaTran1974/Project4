/**
 * utils.ts - File chứa các hàm tiện ích
 * 
 * File này chứa các hàm hỗ trợ cho ứng dụng kiểm tra số dư ví trên mạng Ronin Saigon testnet.
 * Các hàm này giúp xử lý dữ liệu, chuyển đổi đơn vị và kiểm tra tính hợp lệ của dữ liệu đầu vào.
 */

/**
 * Hàm chuyển đổi số dư từ đơn vị wei sang RON
 * 
 * @param weiBalance - Số dư ở dạng wei (đơn vị nhỏ nhất trong blockchain)
 * @returns Số dư ở dạng RON (đơn vị dễ đọc hơn)
 * 
 * Lưu ý: 1 RON = 10^18 wei (tương tự như 1 ETH = 10^18 wei trong mạng Ethereum)
 */
export function convertWeiToRon(weiBalance: bigint): string {
  // Chuyển đổi từ BigInt sang số thập phân
  // Chia cho 10^18 để chuyển từ wei sang RON
  const divisor = BigInt(10) ** BigInt(18);
  const wholePart = weiBalance / divisor;
  const fractionalPart = weiBalance % divisor;
  
  // Chuyển phần thập phân thành chuỗi và cắt bớt số 0 ở đầu
  let fractionalStr = fractionalPart.toString().padStart(18, '0');
  // Loại bỏ các số 0 ở cuối
  fractionalStr = fractionalStr.replace(/0+$/, '');
  
  // Nếu phần thập phân chỉ có số 0, chỉ trả về phần nguyên
  if (fractionalStr === '' || parseInt(fractionalStr) === 0) {
    return wholePart.toString();
  }
  
  // Giới hạn phần thập phân chỉ hiển thị tối đa 6 chữ số
  if (fractionalStr.length > 6) {
    fractionalStr = fractionalStr.substring(0, 6);
  }
  
  return `${wholePart}.${fractionalStr}`;
}

/**
 * Hàm kiểm tra tính hợp lệ của địa chỉ Ethereum (EVM)
 * 
 * @param address - Chuỗi địa chỉ cần kiểm tra
 * @returns true nếu địa chỉ hợp lệ, false nếu không hợp lệ
 */
export function isValidEVMAddress(address: string): boolean {
  // Kiểm tra xem địa chỉ có đúng định dạng không
  // Địa chỉ EVM hợp lệ phải:
  // 1. Bắt đầu bằng '0x'
  // 2. Có tổng cộng 42 ký tự (bao gồm '0x')
  // 3. Chỉ chứa các ký tự hex (0-9, a-f, A-F)
  const addressRegex = /^0x[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
}

/**
 * Hàm định dạng địa chỉ để hiển thị ngắn gọn hơn
 * 
 * @param address - Địa chỉ đầy đủ
 * @returns Địa chỉ được rút gọn (hiển thị 6 ký tự đầu và 4 ký tự cuối)
 * 
 * Ví dụ: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F -> 0x71C765...976F
 */
export function formatAddress(address: string): string {
  if (!isValidEVMAddress(address)) {
    return address; // Trả về nguyên bản nếu không phải địa chỉ hợp lệ
  }
  
  // Lấy 6 ký tự đầu (bao gồm '0x') và 4 ký tự cuối
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}