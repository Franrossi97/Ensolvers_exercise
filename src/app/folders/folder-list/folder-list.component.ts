import { FolderService } from './../folder.service';
import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/shared/List';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit
{

  @Input() list: List;
  @Input() index: number;
  constructor(private folderService:FolderService) { }

  ngOnInit(): void {
  }

  deleteFolder(folderId:number)
  {
    this.folderService.deleteAll(folderId);
  }
}
