import {HttpParams} from '@angular/common/http';


export class Page {
  pageSize = 0;
  totalElements = 0;
  totalPages = 0;
  pageNumber = 0;

  fillHttpParams(httpParams: HttpParams) {
    httpParams.set('_pageNumber', this.pageNumber.toString());
    httpParams.set('_pageSize', this.pageSize.toString());
  }
}
