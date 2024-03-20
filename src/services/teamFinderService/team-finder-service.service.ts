import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamFinderServiceService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'https://api218backend.azurewebsites.net';
  teamFinder(orgID: any, projectId: any, includePartiallyAvailable: any, weeksToProjectCompletion: any, includeUnavailable: any, includeCloseToFinish: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/FindTeamMembers?orgId=${orgID}&projectId=${projectId}&includePartiallyAvailable=${includePartiallyAvailable}&weeksToProjectCompletion=${weeksToProjectCompletion}&includeUnavailable=${includeUnavailable}&includeCloseToFinish=${includeCloseToFinish}`, httpOptions);
  }
  teamFinderAI(orgID: any, projectId: any,prompt:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/FindTeamMembersAI?orgId=${orgID}&projectId=${projectId}&prompt=${prompt}`, httpOptions);
  }
  getTeamForProject(projectId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/GetTeamForProject?projectId=${projectId}`, httpOptions);
  }
  createTeamForProject(projectId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body ={
      "id": "string",
  "projectId": "string",
  "users": [
    {
      "key": "string",
      "value": {
        "key": "string",
        "value": [
          "string"
        ]
      }
    }
  ]
    }
    return this.http.post<any>(`${this.apiUrl}/CreateEmptyTeam?projectId=${projectId}`,body);
  }
  deleteTeamMemberForProject(teamId:any,userId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const userid = userId;
    const teamid= teamId;

  

  
    return this.http.delete<any>(`${this.apiUrl}/RemoveTeamMember?teamId=${teamid}&memberId=${userid}`);
  }

  updateTeamForProject(projectId:any,teamId:any,userId:any,workHours:any,customRole:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const cv = teamId;
    const userid = userId;
    const workhour = workHours;
    const roles = customRole;
    /*const user = [
      {
        "key": userId,
        "value": {
          "key": workHours,
          "value": customRole
        }
      }
    ]
    */
    const body ={
      "id": cv,
  "projectId": "string",
  "users":[
    {
      "key": userid,
      "value": {
        "key": workhour,
        "value":roles
      }
    }
  ]
    }
    const mock = {
      "id": "5ac374af-6458-40da-b551-c260ed40586d",
      "projectId": "string",
      "users": [
        {
          "key": "25ea8efb-e99f-4891-bc00-8bd593510173",
          "value": {
            "key": "2",
            "value": [
              "a3343c73-f54e-4094-b120-46ec71fcf0e1"
            ]
          }
        }
      ]
    }
    console.log("aici baga" + body);
    return this.http.put<any>(`${this.apiUrl}/UpdateTeam?projectId=${projectId}`,body);
  }

}
