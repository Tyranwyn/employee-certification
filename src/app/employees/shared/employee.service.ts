import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeListDto } from './employee-list-dto';
import { Employee } from './employee.model';

@Injectable()
export abstract class EmployeeService {
  abstract getEmployees(): Observable<Employee[]>;
  abstract getEmployeeById(id: string): Observable<Employee>;
  abstract getEmployedEmployees(): EmployeeListDto[];
  abstract getEmployedEmployeesObservable(): Observable<Employee[]>;
}
