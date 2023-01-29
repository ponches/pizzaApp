import { Controller, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwtRefreshToken-auth.guard';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterRequestDto } from './dto/register/register-request.dto';
import { RegisterUserCommand } from './commands/register-user/register-user.command';
import { RegisterResponseDto } from './dto/register/register-response.dto';
import { RegisterUserCommandOutput } from './commands/register-user/register-user.handler';
import { RefreshAccessTokenRequestDto } from './dto/refresh-access-token/refresh-access-token-request.dto';
import { RefreshAccessTokenCommand } from './commands/refresh-access-token/refresh-access-token.command';
import { RefreshAccessTokenCommandOutput } from './commands/refresh-access-token/refresh-access-token.handler';
import { RefreshAccessTokenResponseDto } from './dto/refresh-access-token/refresh-access-token-response.dto';
import { LoginUserCommand } from './commands/login-user/login-user.command';
import { LoginUserCommandOutput } from './commands/login-user/login-user.handler';
import { LoginResponseDto } from './dto/login/login-response.dto';
import { LoginRequestDto } from './dto/login/login-request.dto';
import { LogoutUserCommand } from './commands/logout-user/logout-user.command';
import { Public } from '../core/public';
import { GetUser } from '../users/decorators/user.decorator';
import { User } from '../users/entities/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@GetUser() user: User, @Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const tokens = await this.commandBus.execute<LoginUserCommand, LoginUserCommandOutput>(
      new LoginUserCommand(user.getId()),
    );
    return tokens;
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async singUp(@Body() registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { email, password } = registerDto;
    const tokens = await this.commandBus.execute<RegisterUserCommand, RegisterUserCommandOutput>(
      new RegisterUserCommand(email, password),
    );

    return tokens;
  }

  @Public()
  @UseGuards(JwtRefreshTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @GetUser() user: User,
    @Body() dto: RefreshAccessTokenRequestDto,
  ): Promise<RefreshAccessTokenResponseDto> {
    const { accessToken, refreshToken } = await this.commandBus.execute<
      RefreshAccessTokenCommand,
      RefreshAccessTokenCommandOutput
    >(new RefreshAccessTokenCommand(user.getId(), dto.refreshToken));

    return {
      accessToken,
      refreshToken,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetUser() user: User) {
    return this.commandBus.execute<LogoutUserCommand, void>(new LogoutUserCommand(user.getId()));
  }
}
