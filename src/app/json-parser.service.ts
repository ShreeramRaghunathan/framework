import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class JsonParserService {

  constructor(private _request:Http) { }

  getDataRequest(_url)
  {
    return this._request.get(_url).map((response:Response) => response.json())
  }
}
