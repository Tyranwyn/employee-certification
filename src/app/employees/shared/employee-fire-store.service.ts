import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Certificate } from '../../certificates/shared/certificate.model';
import { Project } from '../../projects/shared/project.model';
import { Role } from '../../shared/role.enum';
import { Unit } from '../../shared/unit.enum';
import { Skill } from '../../skills/shared/skill.model';
import { EmployeeListDto } from './employee-list-dto';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeFireStoreService implements EmployeeService {


  constructor(private db: AngularFirestore) {}

  getEmployeeById(id: string): Observable<Employee> {
    return this.db.collection('employees').doc<Employee>(id).valueChanges();
  }

  getEmployees(): Observable<Employee[]> {
    return this.db.collection<Employee>('employees').valueChanges();
  }

  // TODO: Get references properly once eager loading implemented
  getEmployedEmployees(): EmployeeListDto[] {
    // return this.db.collection<EmployeeListDto>('employees', ref => ref.where('employed', '==', true)).valueChanges();
    const employeeList: EmployeeListDto[] = [];
    this.db.collection<EmployeeListDto>('employees')
      .ref
      .where('employed', '==', true)
      .get()
      .then(res =>
        res.forEach(doc =>
          employeeList.push(this.convertEmployeeToEmployeeListDto(doc.id, <Employee>doc.data())))
      )
      .catch(err => console.log(err));
    return employeeList;
  }

  private convertEmployeeToEmployeeListDto(id: string, oldEmployee: Employee): EmployeeListDto {
    const newEmployee: EmployeeListDto = {
      id: id,
      firstName: oldEmployee.firstName,
      lastName: oldEmployee.lastName,
      profilePicture: oldEmployee.profilePicture,
      email: oldEmployee.email,
      unit: oldEmployee.unit,
      role: oldEmployee.role,
      certificates: [],
      skills: [],
      projects: []
    };
    if (null != oldEmployee.certificates && oldEmployee.certificates.length > 0) {
      oldEmployee.certificates.forEach(certificate =>
        certificate.get()
          .then(res => newEmployee.certificates.push(<Certificate>res.data()))
          .catch(err => console.log(`Something went wrong with getting certificate: ${err}`))
      );
    }
    if (null != oldEmployee.skills && oldEmployee.skills.length > 0) {
      oldEmployee.skills.forEach(skill =>
        skill.get()
          .then(res => newEmployee.skills.push(<Skill>res.data()))
          .catch(err => console.log(`Something went wrong with getting skill: ${err}`))
      );
    }
    if (null != oldEmployee.projects && oldEmployee.projects.length > 0) {
      oldEmployee.projects.forEach(project =>
        project.get()
          .then(res => newEmployee.projects.push(<Project>res.data()))
          .catch(err => console.log(`Something went wrong with getting project: ${err}`))
      );
    }
    return newEmployee;
  }
}
