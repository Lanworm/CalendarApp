/**
 * Created by anton.goloschapov on 22.01.2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers, Jsonp} from "@angular/http";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {IEvent} from "./event";

@Injectable()
export class EventService {

    private _Url = 'http://www.mocky.io/v2/58888300260000ce1b9663fa';

    constructor(private _http: Http) {
    }


    getEvents(): Promise<IEvent[]> {
        return this._http.post(this._Url,'')
            .toPromise()
            .then((response: Response) =><IEvent[]> response.json())
            .catch(this.handleError)
    }


private handleError (error: Response | any) {
   let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
}
}
