import {Injectable} from '@angular/core';
import {Page} from '../models/view/page';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export abstract class TableBaseService {
  protected http: HttpClient;

  protected getResultsByParams(page: Page, sort?: any, search?: string) {
    const httpParams = this.getPageHttpParams(page);
    this.getSearchHttpParams(search, httpParams);
    this.getSortHttpParams(sort, httpParams);
    return this.http.get(this.getApiUrl(), {params: httpParams});
  }

  protected getPageHttpParams(page: Page, httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    page.fillHttpParams(httpParams);
    return httpParams;
  }

  protected getSearchHttpParams(search?: string, httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    if (!search) {
      return httpParams;
    }
    httpParams.set('_search', search);
    return httpParams;
  }

  protected getSortHttpParams(sort: any, httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    if (!sort || !sort.prop || !sort.dir) {
      return httpParams;
    }
    httpParams.set('_sortProp', sort.prop);
    httpParams.set('_sortDirs', sort.dir);
    return httpParams;
  }

  protected abstract getApiUrl(): string;
}
