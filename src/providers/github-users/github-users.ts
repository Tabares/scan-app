import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observer} from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import {AsyncSubject} from 'rxjs/Rx';

@Injectable()
export class GithubUsers {
  packageData: Subject<any> = new BehaviorSubject<any>([]);
  observer$: Observer<any>;
  public x$: ReplaySubject<any> = new ReplaySubject(null);

  private data: Observable<any>;
  private dataObserver: Observer<any>;
  public latestError: AsyncSubject<string> = new AsyncSubject();


  constructor(private http:Http ) {
    this.data = new Observable(observer => this.dataObserver = observer);
  }

  getUsersService()  {
    return this.http
      .get('https://api.myjson.com/bins/dc1jl')
      .map(res => res.json())
      // .filter( res => res[0]['firstName'] === 'Jose');
  }

  getTripsServiceFilter(): Observable<any>  {
    return this.http.get('http://jsonplaceholder.typicode.com/users/')
      .map((response) => response.json());
  }

  updateTripService(uri: string, data: any): Observable<any>  {

    const updatedData = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put(uri, updatedData, options)
      .map(res => res.json());
  }

  saveTrip(): Observable<any> {
    const data = {
      'country': 'Los angeles',
      'price': '1,200'
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://api.myjson.com/bins', data, options)
      .map(res => res.json());
  }

  saveTrip2(body, Id): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
   // const url = `${this.urlAPI}/${Id}`;

    return this.http
      .post('x', body, options)
      .map(res => res.json());
  }

  getCurrentTrip( url: string ): Observable<any> {
    return this.http
      .get( url )
      .map((res) => {
        return res.json();
      });
  }

  loadAllPackages () {
    this.http
    .get('https://api.myjson.com/bins/1g87r')
    .map((res: any) => {
      return res.json();
    })
    .subscribe (
      (data: any) => {
        this.packageData.next(data);
      },
      (err: any) => console.error('loadAllPackages: ERROR'),
      () => console.log('loadAllTrips: always')
    );
  }

  error() {
    console.log('error');
    this.latestError.next('form submitted');
    this.latestError.next('form submitted 2');
    this.latestError.next('form submitted 3');
    this.latestError.complete();

  }

}

