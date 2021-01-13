import { ProcessHttpmsgService } from './../../../../services/process-httpmsg.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseURL} from '../../../../shared/baseUrl'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient, private processHttpmsgService: ProcessHttpmsgService) { }


  adNewItem(folderId: number,content:string)
  {
    const postUrl=`${baseURL}newitem/${folderId}`;
    console.log(postUrl);
    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
    };
    this.httpClient.post(postUrl,`{"content": "${content}"}`,httpOptions).subscribe(() => {},err => console.log(err));
  }

  editItemName(idItem:number, folderName: string)
  {
    const putUrl=`${baseURL}edititem/${idItem}`;

    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
    };

    this.httpClient.put(putUrl, `{"content": "${folderName}"}`,httpOptions).subscribe(() => {},err => console.log(err));
  }

  changeDone(idItem:number)
  {
    const putUrl=`${baseURL}doneitem/${idItem}`;

    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/text',
      })
    };

    this.httpClient.put(putUrl,null).subscribe(() => {},err => console.log(err));
  }
}
