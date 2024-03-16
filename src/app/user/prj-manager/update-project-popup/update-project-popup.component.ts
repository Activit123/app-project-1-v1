import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { SkillsComponent } from '../../skills/skills.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; // Import MatDialogRef and MAT_DIALOG_DATA
import { AuthService } from '../../../../services/authService/auth.service';
import { SkillService } from '../../../../services/skillService/skill.service';
import { ProjectService } from '../../../../services/projectService/project.service';
import { RolesService } from '../../../../services/roleService/roles.service';
import { ConfirmationDiaglogComponent } from '../confirmation-diaglog/confirmation-diaglog.component';
@Component({
  selector: 'app-update-project-popup',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,MatInputModule,MatDatepickerModule,NgxPaginationModule],
  templateUrl: './update-project-popup.component.html',
  styleUrl: './update-project-popup.component.css'
})
export class UpdateProjectPopupComponent implements OnInit,OnDestroy{
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDiaglogComponent, {
      width: '300px', // Adjust width as needed
       // Pass data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        // User confirmed deletion, perform delete operation here
       this.projectService.deleteProject(this.updatedProject.id).subscribe(data=>{
        console.log(data);
        this.close();
        
       },error=>{
        
        console.log(error);
        this.close();
       })
      }
    });
  }

  deleteProject(projectId: string): void {
    // Perform delete operation using projectId
    // This is a placeholder for your delete logic
    console.log('Project deleted with ID:', projectId);
  }
addCustomRole() {
  const exists = this.yourData.addedRoles.some(role => role.key === this.selectedRole);
  
  // If the role doesn't exist, add it to the array
  if (!exists) {
    this.yourData.addedRoles.push({ key: this.selectedRole, value: this.roleNumber });
  }
}
adminId: any;
createProject() {
throw new Error('Method not implemented.');
}
addSkillRequirement() {
  const exists = this.yourData.addedSkills.some(skill => skill.key === this.selectedSkill);
  
  // If the skill doesn't exist, add it to the array
  if (!exists) {
    this.yourData.addedSkills.push({ key: this.selectedSkill, value: this.level });
  }
}
selectedRole: any;
roles: any;
roleNumber: any;
skills: any;
selectedSkill: any;
level: any;
managerId:any;
delete() {
    
}
  updatedProject: any; // Holds the updated project data

  constructor(
    private dialog: MatDialog,private route:ActivatedRoute,private router:Router, private authService:AuthService,private skillService: SkillService,private projectService:ProjectService,private roleService:RolesService,public dialogRef: MatDialogRef<UpdateProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedProject = { ...data.project };
    this.skills = {...data.skills}

  }
  yourData = {
    addedRoles: [] as { key: string, value: string }[],
    addedSkills: [] as { key: string, value: string}[]
  };
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.skills = this.data.skills;
    this.roles = this.data.roles;
    this.yourData.addedSkills = this.updatedProject.skillRequirements;
    this.yourData.addedRoles = this.updatedProject.customRoles;
    //this.viewSkills();
   // this.fetchTeamRoles();

  }

  update() {
    // Implement update logic here
    console.log("Updated Project:", this.updatedProject);
    this.updatedProject.skillRequirements = this.yourData.addedSkills;
    this.updatedProject.customRoles = this.yourData.addedRoles;
    this.projectService.updateProject(this.updatedProject.id,this.updatedProject).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
    this.close();
  }
  viewProjects(){
    this.projectService.getProjects(this.managerId)
      .subscribe(data=> {
      
      }, error => {
        console.error('Error fetching projects:', error);
        // Handle error as needed
      });
  }
  close() {
    this.viewProjects();
    this.dialogRef.close(true); // Close the modal popup
  }
  

  
}
