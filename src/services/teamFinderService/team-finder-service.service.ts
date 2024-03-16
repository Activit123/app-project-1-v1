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
}
