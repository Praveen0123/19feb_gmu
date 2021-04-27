import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService
{
  private httpWithoutInterceptor: HttpClient;

  constructor
    (
      private httpClient: HttpClient,
      private httpBackend: HttpBackend
    )
  {
    // https://levelup.gitconnected.com/the-correct-way-to-make-api-requests-in-an-angular-application-22a079fe8413
    this.httpWithoutInterceptor = new HttpClient(this.httpBackend);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T>
  {
    return this.httpClient.get<T>
      (
        `${path}`,
        { params }
      )
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: {}): Observable<T>
  {
    return this.httpClient.put<T>
      (
        `${path}`,
        JSON.stringify(body)
      )
      .pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: {}, options?: {}): Observable<T>
  {
    const headers = this.getHeaders(options);

    return this.httpClient.post<T>
      (
        `${path}`,
        JSON.stringify(body),
        { headers }
      )
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(path): Observable<T>
  {
    return this.httpClient.delete<T>
      (
        `${path}`
      ).pipe(catchError(this.formatErrors));
  }



  _get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T>
  {
    return this.httpWithoutInterceptor.get<T>
      (
        `${path}`,
        { params }
      )
      .pipe(catchError(this.formatErrors));
  }

  _put<T>(path: string, body: {}): Observable<T>
  {
    return this.httpWithoutInterceptor.put<T>
      (
        `${path}`,
        JSON.stringify(body)
      ).pipe(catchError(this.formatErrors));
  }

  _post<T>(path: string, body: {}, options?: {}): Observable<T>
  {
    const headers = this.getHeaders(options);

    return this.httpWithoutInterceptor.post<T>
      (
        `${path}`,
        JSON.stringify(body),
        { headers }
      ).pipe(catchError(this.formatErrors));
  }

  _delete<T>(path): Observable<T>
  {
    return this.httpWithoutInterceptor.delete<T>
      (
        `${path}`
      ).pipe(catchError(this.formatErrors));
  }



  private formatErrors(error: any)
  {
    return throwError(error.error);
  }

  private getHeaders(options?: {}): HttpHeaders
  {
    let headers = new HttpHeaders(options);
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');

    return headers;
  }
}
