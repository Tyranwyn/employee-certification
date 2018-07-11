import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CertificatesModule } from './certificates/certificates.module';
import { CoreModule } from './core/core.module';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.module';
import { QuestionsModule } from './questions/questions.module';
import { SkillsModule } from './skills/skills.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    EmployeesModule,
    SkillsModule,
    ProjectsModule,
    QuestionsModule,
    SkillsModule,
    CertificatesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
