/// <reference types="googlemaps" />
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MyErrorStateMatcher } from '../../core/my-error-state-matcher';
import { AddEmployeeModalComponent } from '../../employees/add-employee-modal/add-employee-modal.component';
import { Employee } from '../../employees/shared/employee.model';
import { EmployeeService } from '../../employees/shared/employee.service';
import { AddSkillModalComponent } from '../../skills/add-skill-modal/add-skill-modal.component';
import { Skill } from '../../skills/shared/skill.model';
import { SkillService } from '../../skills/shared/skill.service';
import { Location } from '../shared/location.model';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent implements OnInit {

  projects: Project[];
  employees: Employee[];
  skillsUsed: Skill[];
  matcher = new MyErrorStateMatcher();

  projectForm: FormGroup;

  active = true;
  location: Location;

  @ViewChild('location', { static: true })
  public locationElementRef: ElementRef;

  constructor(private projectService: ProjectService,
              private employeeService: EmployeeService,
              private skillService: SkillService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddProjectModalComponent>,
              public dialog: MatDialog,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
    this.employeeService.getEmployedEmployees().subscribe(employees => this.employees = employees);
    this.skillService.getSkills().subscribe(skills => this.skillsUsed = skills);

    this.projectForm = this.fb.group({
      name: ['', [Validators.required, this.duplicateProjectValidator()]],
      client: ['', Validators.required],
      location: ['', Validators.required],
      responsible: ['', Validators.required],
      collaborators: ['', Validators.required],
      skillsUsed: ['', Validators.required]
    });
    this.loadPlacesAutocomplete();
  }

  private duplicateProjectValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let alreadyInProjects = false;
      if (this.projects !== undefined) {
        alreadyInProjects = this.projects
          .map(project => project.name.toLowerCase())
          .indexOf(this.name.value.toLowerCase()) !== -1;
      }
      return alreadyInProjects ? {'duplicateName': {value: control.value}} : null;
    };
  }

  private loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.locationElementRef.nativeElement, {
        type: 'address'
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            console.log('nothing selected');
            return;
          }

          // set latitude, longitude and zoom
          this.location = {
            name: place.formatted_address,
            lat: place.geometry.location.lat(),
            lon: place.geometry.location.lng()
          };
        });
      });
    });
  }

  onSubmit() {
    this.projectService.addProject(this.name.value, this.client.value, this.location,
      this.responsibles.value, this.collaborators.value, this.skills.value, this.active);
    this.dialogRef.close();
  }

  addNewEmployee() {
    this.dialog.open(AddEmployeeModalComponent, {width: '100em'});
  }

  addNewSkill() {
    this.dialog.open(AddSkillModalComponent, {width: '20em'});
  }

  get name() {
    return this.projectForm.get('name');
  }

  get client() {
    return this.projectForm.get('client');
  }

  get selectedLocation() {
    return this.projectForm.get('location');
  }

  get responsibles() {
    return this.projectForm.get('responsible');
  }

  get collaborators() {
    return this.projectForm.get('collaborators');
  }

  get skills() {
    return this.projectForm.get('skillsUsed');
  }
}
