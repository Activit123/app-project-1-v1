import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'https://api218backend.azurewebsites.net';
  createProject(managerUserId: string, project: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.post<any>(`${this.apiUrl}/CreateProject?managerUserId=${managerUserId}`,project);
      
  }
  getDepProjects(managerUserId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/GetDepProjects?managerUserId=${managerUserId}`, httpOptions);
  }
  getProjects(managerUserId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/GetProjects?managerUserId=${managerUserId}`, httpOptions);
  }
  getProjectsFromOrganization(orgId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/GetOrganizationProjects?orgId=${orgId}`, httpOptions);
  }
  getEmployeeProjects(employeeId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.apiUrl}/GetEmployeeProjects?employeeId=${employeeId}`, httpOptions);
  }
  updateProject(projectId: string, project: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.put<any>(`${this.apiUrl}/UpdateProject?projectId=${projectId}`,project);
  }
  deleteProject(projectId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<any>(`${this.apiUrl}/DeleteProject?projectId=${projectId}`);
  }
}

