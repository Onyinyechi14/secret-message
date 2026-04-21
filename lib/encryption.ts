import CryptoJS from "crypto-js";

const getSecretKey = () => {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error("SECRET_KEY is missing. Add it to your environment variables.");
  }

  return secretKey;
};

export const encryptMessage = (text: string) => {
  const secretKey = getSecretKey();
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptMessage = (encrypted: string) => {
  const secretKey = getSecretKey();
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
