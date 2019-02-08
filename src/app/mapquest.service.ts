import { Injectable } from '@angular/core';

import { Jsonp, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MapquestService {

  constructor(private jsonp: Jsonp) { }

  // Get the map json object
  getMap(value1: string, value2: string): Observable<any> {
    const key = 'EbqhXcAPRUGlnEeKNmV0E9XVLjFKAxc6';
    const from = value1;
    const to = value2;
    const url = 'http://open.mapquestapi.com/directions/v2/route';

    // Set the parameters for the map
    const params = new URLSearchParams();
    params.set('key', key);
    params.set('from', from);
    params.set('to', to);

    // This took me hours to figure out that I was missing a callback...
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
              .get(url, { search: params })
              .map((res: Response) => res.json());
    }
}
