import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../shared/role.enum';
import { Unit } from '../../shared/unit.enum';
import { EmployeeListDto } from './employee-list-dto';
import { Employee } from './employee.model';

@Injectable()
export abstract class EmployeeService {
  abstract getEmployees(): Observable<Employee[]>;

  abstract getEmployeeById(id: string): Observable<Employee>;

  abstract getEmployedEmployees(): EmployeeListDto[];

  abstract getEmployedEmployeesObservable(): Observable<Employee[]>;

  abstract getEmployeesByCertificateId(id: string): Observable<Employee[]>;

  abstract addEmployee(firstName: string, lastName: string, email: string, profilePicture: string, role: Role,
                       unit: Unit, skills: string[], certificates: string[], employed: boolean): boolean;
}
