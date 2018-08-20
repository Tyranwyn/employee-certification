import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
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


  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.db.collection('employees').doc<Employee>(id).valueChanges();
  }

  getEmployees(): Observable<Employee[]> {
    return this.db.collection<Employee>('employees').valueChanges();
  }

  getEmployedEmployeesObservable(): Observable<Employee[]> {
    let employeeList: Observable<Employee[]>;
    employeeList = this.db.collection<Employee>('employees', ref => ref.where('employed', '==', true))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Employee;
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
    return employeeList;
  }

  getEmployeesByCertificateId(id: string): Observable<Employee[]> {
    return undefined;
  }

  // TODO: Get references properly once eager loading implemented
  getEmployedEmployees(): EmployeeListDto[] {
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
    const employeeRef = this.storage.ref('profile-pictures/' + id);

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

    employeeRef.getDownloadURL().subscribe(url => newEmployee.profilePicture = url);

    if (null != oldEmployee.certificates && oldEmployee.certificates.length > 0) {
      oldEmployee.certificates.forEach(certificate =>
        certificate.get()
          .then(res => newEmployee.certificates.push(<Certificate>{id: res.id, ...res.data()}))
          .catch(err => console.log(`Something went wrong with getting certificate: ${err}`))
      );
    }
    if (null != oldEmployee.skills && oldEmployee.skills.length > 0) {
      oldEmployee.skills.forEach(skill =>
        skill.get()
          .then(res => newEmployee.skills.push(<Skill>{id: res.id, ...res.data()}))
          .catch(err => console.log(`Something went wrong with getting skill: ${err}`))
      );
    }
    if (null != oldEmployee.projects && oldEmployee.projects.length > 0) {
      oldEmployee.projects.forEach(project =>
        project.get()
          .then(res => newEmployee.projects.push(<Project>{id: res.id, ...res.data()}))
          .catch(err => console.log(`Something went wrong with getting project: ${err}`))
      );
    }
    return newEmployee;
  }

  addEmployee(firstName: string, lastName: string, email, profilePicture: File, role: Role,
              unit: Unit, skills: string[], certificates: string[], employed: boolean): string {
    let id = null;

    const skillsRef: DocumentReference[] = [];
    const certificatesRef: DocumentReference[] = [];
    skills.forEach(skill => skillsRef.push(this.db.doc('/skills/' + skill).ref));
    certificates.forEach(cert => certificatesRef.push(this.db.doc('/certificates/' + cert).ref));

    this.db.collection('employees')
      .add(
        {
          firstName,
          lastName,
          email,
          profilePicture: '',
          role,
          unit,
          skills: skillsRef,
          certificates: certificatesRef,
          projects: [],
          employed
        }
      )
      .then(v => {
        id = v.id;
        this.storeProfilePicture(id, profilePicture);
      })
      .catch(v => {
        console.log('Something went wrong');
        console.log(v);
      });
    return id;
  }

  private storeProfilePicture(id: string, file: File) {
    const filePath = 'profile-pictures/' + id;
    const task = this.storage.upload(filePath, file);
  }
}
