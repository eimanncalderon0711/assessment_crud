import { TaxService } from '@/tax/tax.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TaxService],
  exports: [TaxService],
})
export class TaxModule {}
