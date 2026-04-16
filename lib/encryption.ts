import CryptoJS from "crypto-js";

const secretKey = process.env.SECRET_KEY!;

export const encryptMessage = (text: string) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptMessage = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
