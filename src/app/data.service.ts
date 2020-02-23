import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataGrid } from './k8-cluster/models/data-grid';
import { GroupTab } from './k8-cluster/models/group-tab';
import { Snapshot } from './k8-cluster/models/snapshot';
import { TrendTemplateComponent } from './k8-cluster/components/trend-template/trend-template.component';
import { ComparisonTemplateComponent } from './k8-cluster/components/comparison-template/comparison-template.component';
import { Filter } from './k8-cluster/models/filter';
import { ClusterEfficiency } from './k8-cluster/models/cluster-efficiency';
import { ResourceEfficiency } from './k8-cluster/models/resource-efficiency';
import { Cost } from './k8-cluster/models/cost';
import { CostVariation } from './k8-cluster/models/cost-variation';
import { TotalVsForecast } from './k8-cluster/models/total-vs-forecast';
import { Insight } from './k8-cluster/models/insight';
import { PossibleSavings } from './k8-cluster/models/possible-savings';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private basePath = '/api/v1/data';
  private mockPath = '/mcapi';
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  getData(url) {
    return this.http.get(url);
  }
  getDataAll(endpoint): Observable<any> {
    return this.http.get(endpoint).pipe(map(this.extractData));
  }
  // postDataService(endpoint, body, options, resType): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders(options),
  //     responseType: resType
  //   };
  //   return this.http
  //     .post(endpoint, body, httpOptions).pipe(map(this.extractData));
  // }

  putDataService(endpoint, body, options): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(options)
    };
    return this.http
      .put(endpoint, body, httpOptions)
      .pipe(map(this.extractData));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  mapCompToSnapShot(data) {
    return data.map(item => {
      switch (item.viewType) {
        case 'trend':
          item.component = TrendTemplateComponent;
          break;
        case 'comparison':
          item.component = ComparisonTemplateComponent;
          break;
      }
      return item;
    });
  }

  getFilters() {
    return this.http.get<Filter>(this.basePath + '/filters');
  }

  // getSnapshots() {
  //   return this.http.get<Snapshot>('/mcapi/snapshot').pipe(map(result => {
  //     return this.mapCompToSnapShot(result);
  //   }));
  // }


  getSnapshots(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<Snapshot>(
        this.basePath + '/snapshot',
        payload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // getGroupTabs() {
  //   return this.http.get<GroupTab>('/mcapi/grouptab');
  // }

  getGroupTabs(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<GroupTab>(
        this.basePath + '/grouptab',
        payload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // getGraphData() {
  //   return this.http.get<DataGrid>('/mcapi/graph');
  // }
  getGraphData(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post(
        this.basePath + '/graph',
        payload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // getDatagrid() {
  //   return this.http.get<DataGrid>('/mcapi/datagrid');
  // }

  getDatagrid(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<DataGrid>(
        this.basePath + '/datagrid',
        payload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getMockData(endpoint: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = this.mockPath + endpoint;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData));
  }
}
