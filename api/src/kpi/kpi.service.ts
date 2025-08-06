import { Injectable } from '@nestjs/common';
// import { CreateKpiDto } from './dto/create-kpi.dto';
// import { UpdateKpiDto } from './dto/update-kpi.dto';

@Injectable()
export class KpiService {
  create(_createKpiDto: any) {
    return 'This action adds a new kpi';
  }

  findAll() {
    return `This action returns all kpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kpi`;
  }

  update(id: number, _updateKpiDto: any) {
    return `This action updates a #${id} kpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} kpi`;
  }
}
