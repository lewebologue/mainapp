import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { CakeModule } from './cake/cake.module';
import { OrderModule } from './order/order.module';
import { KpiModule } from './kpi/kpi.module';
import { CustomerModule } from './customer/customer.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './shared/guard/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    CakeModule,
    OrderModule,
    KpiModule,
    CustomerModule,
    AuthenticationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
