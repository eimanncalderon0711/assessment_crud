import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxService {
    calculateTax(monthlySalary: number): number {
    const annualSalary = monthlySalary * 12;
    let tax = 0;

    if (annualSalary <= 250000) {
      return tax; // Exempt
    }

    if (annualSalary <= 400000) {
      tax = (annualSalary - 250000) * 0.15;
    } else if (annualSalary <= 800000) {
      tax = 22500 + (annualSalary - 400000) * 0.20;
    } else if (annualSalary <= 2000000) {
      tax = 102500 + (annualSalary - 800000) * 0.25;
    } else if (annualSalary <= 8000000) {
      tax = 402500 + (annualSalary - 2000000) * 0.30;
    } else {
      tax = 2202500 + (annualSalary - 8000000) * 0.35;
    }

    return tax;
  }
}
