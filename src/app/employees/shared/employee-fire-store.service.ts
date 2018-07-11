import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeFireStoreService implements EmployeeService {

  constructor() { }

  getEmployeeById(id: string): Employee {
    return undefined;
  }

  getEmployees(): Employee[] {
    return undefined;
  }
}
