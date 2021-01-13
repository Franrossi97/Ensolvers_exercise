import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../shared/List';
import {catchError, map} from 'rxjs/operators'
import {baseURL} from '../shared/baseUrl'
import { ItemList } from '../shared/ItemList';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FolderService
{
  constructor(private httpClient: HttpClient, private location: Location) { }


  getFolders():Observable<List[]>
  {
    const getUrl=`${baseURL}lists`;
    return this.httpClient.get<GetResponseFolders>(getUrl).pipe(map(response => response._embedded.lists));
  }

  getFoldersItems(listId: number):Observable<ItemList[]>
  {
    const getUrl=`${baseURL}listItems/search/findByListId?id=${listId}`;
    return this.httpClient.get<GetResponseItems>(getUrl).pipe(map(response => response._embedded.listItems));
  }

  creatNewFolder(folderName: string)
  {
    const postUrl=`${baseURL}savelist/1`;

    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
    };

    this.httpClient.post(postUrl, `{"name": "${folderName}"}`,httpOptions).subscribe(() => {},err => console.log(err));
  }

  deleteAll(folderId:number)
  {
    const deleteUrl=`${baseURL}deleteall/${folderId}`;

    const httpOptions=
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
    };

    this.httpClient.delete(deleteUrl,httpOptions).subscribe(() => {},err => console.log(err));
    this.location.back();
  }
}


interface GetResponseFolders
{
  _embedded:
  {
    lists: List[];
  }
}

interface GetResponseItems
{
  _embedded:
  {
    listItems: ItemList[];
  }
}
