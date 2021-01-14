import { ProcessHttpmsgService } from './../../../../services/process-httpmsg.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseURL} from '../../../../shared/baseUrl'
import { ItemList } from 'src/app/shared/ItemList';

@Injectable({
  providedIn: 'root'
})
export class ItemService
{

  constructor(private httpClient: HttpClient, private processHttpmsgService: ProcessHttpmsgService) { }


  adNewItem(folderId: number,content:string): Observable<any>
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
    var sendItem=new ItemList();
    sendItem.content=content;
    //return this.httpClient.post<ItemList>(postUrl, JSON.stringify(`{"content": "${content}"}`),httpOptions);//.subscribe(() => {},err => console.log(err));
    return this.httpClient.post<ItemList>(postUrl, JSON.stringify(sendItem),httpOptions);
  }

  editItemName(idItem:number, folderName: string): Observable<any>
  {
    const putUrl=`${baseURL}edititem/${idItem}`;

    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.put<ItemList>(putUrl, `{"content": "${folderName}"}`,httpOptions);//.subscribe(() => {},err => console.log(err));
  }

  changeDone(idItem:number): Observable<any>
  {
    const putUrl=`${baseURL}doneitem/${idItem}`;

    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/text',
      })
    };

    return this.httpClient.put<ItemList>(putUrl,null);//.subscribe(() => {},err => console.log(err));
  }
}
