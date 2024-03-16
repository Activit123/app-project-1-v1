import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/authService/auth.service';
import { SkillService } from '../../../../services/skillService/skill.service';
import { ProjectService } from '../../../../services/projectService/project.service';
import { RolesService } from '../../../../services/roleService/roles.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';
import { SkillsComponent } from '../../skills/skills.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { TeamFinderServiceService } from '../../../../services/teamFinderService/team-finder-service.service';
@Component({
  selector: 'app-team-finder-popup',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,MatInputModule,MatDatepickerModule,NgxPaginationModule,MatDialogModule],
  templateUrl: './team-finder-popup.component.html',
  styleUrl: './team-finder-popup.component.css'
})
export class TeamFinderPopupComponent {
closePopup() {
  this.dialogRef.close(true);
}
employees: any;

weeksOptions: number[] = [2, 3, 4, 5, 6];
assignmentProposal(arg0: any) {
throw new Error('Method not implemented.');
}
findTeam() {
  this.employees = null;
    console.log(this.data);
    this.teamfinder.teamFinder(this.data.orgID,
      this.data.project.id,
      this.includePartiallyAvailable,
      this.weeksToProjectCompletion,
      this.includeUnavailable,
      this.includeCloseToFinish).subscribe(data=>{
        this.employees = data;
        console.log(data);
      },error=>{
        console.log(error);
      });
}
  includePartiallyAvailable: boolean = false;
  weeksToProjectCompletion: number = 0;
  includeUnavailable: boolean = false;
  includeCloseToFinish: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private route:ActivatedRoute,private router:Router,public dialogRef: MatDialogRef<TeamFinderPopupComponent>, private authService:AuthService,private skillService: SkillService,private projectService:ProjectService,private roleService:RolesService,private teamfinder:TeamFinderServiceService) {
    // Access passed data here
    console.log(this.data);
  }
 
}
