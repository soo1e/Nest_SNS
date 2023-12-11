import { Body, Controller, Post, Headers } from "@nestjs/common";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  createTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotatetoken(token, false);

    // {accessToken: {token}}

    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  createTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotatetoken(token, true);

    // {accessToken: {token}}

    return {
      accessToken: newToken,
    }
  }


  @Post('login/email')
  postLoginEmail(
    @Headers('authorization') rawToken: string,
  ) {
    // email:password -> base64
    // decode -> split

    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerWithEmail({ nickname, email, password });
  }
}
