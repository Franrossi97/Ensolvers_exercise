import { FolderService } from './../folder.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() folderDeleteEvent=new EventEmitter<Response>();
  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
  }

  deleteFolder(folderId:number)
  {
    this.folderService.deleteAll(folderId).subscribe(
    {
      next:response=>
      {
        console.log(response);
        this.folderDeleteEvent.emit(response);
      },
      error:error =>
      {
        alert(`Could not delete the folder. Error: ${error.message}`);
      }
    });
  }
}
