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
    return this.db.collection('employees').doc<Employee>(id)
      .valueChanges();
  }

  getEmployees(): Observable<Employee[]> {
    return this.db.collection<Employee>('employees')
      .valueChanges();
  }

  getEmployedEmployees(): Observable<Employee[]> {
    return this.db.collection<Employee>('employees',
        ref => ref.where('employed', '==', true))
      .valueChanges();
  }

  getEmployedEmployeeList(): Observable<EmployeeListDto[]> {
    return this.db.collection<Employee>('employees',
        ref => ref.where('employed', '==', true))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Employee;
            const id = a.payload.doc.id;
            return this.convertEmployeeToEmployeeListDto(id, data);
          });
        })
      );
  }

  getEmployeesByCertificateId(id: string): Observable<Employee[]> {
    return this.db.collection<Employee>('employees', ref =>
      ref.where('certificates', 'array-contains', this.db.doc(`certificates/${id}`).ref))
      .valueChanges();
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

    if (oldEmployee.certificates) {
      oldEmployee.certificates.forEach(certificate =>
        certificate.get()
          .then(res => newEmployee.certificates.push(<Certificate>{id: res.id, ...res.data()}))
          .catch(err => console.log(`Something went wrong with getting certificate: ${err}`))
      );
    }
    if (oldEmployee.skills) {
      oldEmployee.skills.forEach(skill =>
        skill.get()
          .then(res => newEmployee.skills.push(<Skill>{id: res.id, ...res.data()}))
          .catch(err => console.log(`Something went wrong with getting skill: ${err}`))
      );
    }
    if (oldEmployee.projects) {
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
    const skillsRef: DocumentReference[] = [];
    const certificatesRef: DocumentReference[] = [];
    skills.forEach(skill => skillsRef.push(this.db.doc(`/skills/${skill}`).ref));
    certificates.forEach(cert => certificatesRef.push(this.db.doc(`/certificates/${cert}`).ref));

    const id = this.db.createId();
    const data = {
      firstName,
      lastName,
      email,
      role,
      unit,
      skills: skillsRef,
      certificates: certificatesRef,
      projects: [],
      employed
    };
    if (profilePicture !== undefined) {
      this.addEmplWithPicture(id, profilePicture, data);
    } else {
      this.addEmpl(id, '', data);
    }
    return id;
  }

  private addEmplWithPicture(id: string, profilePicture: File, data) {
    this.storage.upload(`profile-pictures/${id}`, profilePicture)
      .then(result => result.ref.getDownloadURL()
        .then(url => this.addEmpl(id, url, data))
        .catch(res => console.log(`Something wrong when getting download url:\n${res}`)))
      .catch(result => console.log(`Something wrong while uploading profile picture:\n${result}`));
  }

  private addEmpl(id: string, url: string, data) {
    this.db.doc(`employees/${id}`)
      .set({ profilePicture: url, ...data })
      .catch(err => console.log(`Something went wrong:\n${err}`));
  }
}
