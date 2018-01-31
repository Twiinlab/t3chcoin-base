import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class CandidatesService {

  private endpointUrl = 'candidates/';

  constructor(
    private http: Http
  ) { }

  getCandidates(): Observable<any[]> {
    return this.http.get(environment.apiUrl + this.endpointUrl)
      .map(res => this.extractData(res).message )
      .catch(this.handleError);
  }

  addCandidate(candidateName): Observable<any[]> {
    return this.http.post(environment.apiUrl + this.endpointUrl, {candidateName: candidateName})
      .map(res => this.extractData(res) )
      .catch(this.handleError);
  }

  voteCandidate(candidateName): Observable<any[]> {
    return this.http.put(environment.apiUrl + this.endpointUrl + candidateName, {})
      .map(res => this.extractData(res) )
      .catch(this.handleError);
  }

  deleteCandidate(candidateName): Observable<any[]> {
    return this.http.delete(environment.apiUrl + this.endpointUrl + candidateName)
      .map(res => this.extractData(res) )
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json() || {};
  }

  private handleError(error: any) {
    const errMsg = error.message || 'Server error';
    return Promise.reject(errMsg);
  }
}
