import { AppConfigService } from '@configs/app/app-config.service';
import { Injectable } from '@nestjs/common';
import CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private configService: AppConfigService) {}

  decrypt(encryptedData: string): any {
    const secretKey = this.configService.secretKey;

    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey,
    ).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  encrypt(data: any): string {
    const secretKey = this.configService.secretKey;
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

    return encryptedData;
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
