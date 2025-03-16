import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CakeModule } from './cake/cake.module';
import { OrderModule } from './order/order.module';
import { KpiModule } from './kpi/kpi.module';

@Module({
  imports: [UserModule, CakeModule, OrderModule, KpiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
