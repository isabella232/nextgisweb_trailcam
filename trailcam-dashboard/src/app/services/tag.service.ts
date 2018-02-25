import {Injectable} from '@angular/core';
import {Page} from '../models/view/page';
import {PagedData} from '../models/view/paged-data';
import {Tag} from '../models/tag';
import {config} from '../app.config';
import {TableBaseService} from './table-base.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TagService extends TableBaseService {

  constructor(protected http: HttpClient) {
    super();
  }

  getApiUrl() {
    return config['ngw_root_url'] + '/api/trailcam/tags';
  }

  getResults(page: Page): Promise<PagedData<Tag>> {
    return new Promise<PagedData<Tag>>((resolve, reject) => {
      super.getResultsByParams(page).subscribe(data => {

        },
        err => console.error(err));
    });
  }

  create(tag: Tag) {
    const body = JSON.stringify(tag);
    return this.http.post('', body);
  }
}
