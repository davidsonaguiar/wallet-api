import { SecurityTokenService } from "./security-token-service";

const tokenService = SecurityTokenService.create();

console.log(tokenService.sign("test"));
