import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CertificatesModule } from './certificates/certificates.module';
import { CertificateFireStoreService } from './certificates/shared/certificate-fire-store.service';
import { CertificateService } from './certificates/shared/certificate.service';
import { ChatModule } from './chat/chat.module';
import { CoreModule } from './core/core.module';
import { EmployeesModule } from './employees/employees.module';
import { EmployeeFireStoreService } from './employees/shared/employee-fire-store.service';
import { EmployeeService } from './employees/shared/employee.service';
import { ProjectsModule } from './projects/projects.module';
import { ProjectFireStoreService } from './projects/shared/project-fire-store.service';
import { ProjectService } from './projects/shared/project.service';
import { QuestionsModule } from './questions/questions.module';
import { QuestionFireStoreService } from './questions/shared/question-fire-store.service';
import { QuestionService } from './questions/shared/question.service';
import { SkillFireStoreService } from './skills/shared/skill-fire-store.service';
import { SkillService } from './skills/shared/skill.service';
import { SkillsModule } from './skills/skills.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    EmployeesModule,
    SkillsModule,
    ProjectsModule,
    QuestionsModule,
    CertificatesModule,
    ChatModule
  ],
  providers: [
    { provide: EmployeeService, useClass: EmployeeFireStoreService },
    { provide: SkillService, useClass: SkillFireStoreService },
    { provide: ProjectService, useClass: ProjectFireStoreService },
    { provide: QuestionService, useClass: QuestionFireStoreService },
    { provide: CertificateService, useClass: CertificateFireStoreService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
