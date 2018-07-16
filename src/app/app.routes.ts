import { Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { ChatComponent } from './chat/chat.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { QuestionsComponent } from './questions/questions.component';
import { SkillsComponent } from './skills/skills.component';

export const appRoutes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'chat', component: ChatComponent }
];
