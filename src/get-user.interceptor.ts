import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { AppService } from "src/app.service";

@Injectable()
export class GetUserInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request && request.headers && request.headers.authorization) {
      const item = await this.appService.getByToken(
        request.headers.authorization
      );
      request.user = item;
    }
    return next.handle();
  }
}
















