import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable()
export abstract class EmployeeService {
  abstract getEmployees(): Employee[];
  abstract getEmployeeById(id: string): Employee;
}
