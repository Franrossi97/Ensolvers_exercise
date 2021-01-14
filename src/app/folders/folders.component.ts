import { FolderService } from './folder.service';
import { List } from '../shared/List';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit
{
  lists: List[]=[];
  newFolder: FormGroup;

  @ViewChild('ffrom') feedbackFormDirective;
  constructor(private folderService: FolderService, private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.loadFolders();

    this.newFolder=this.formBuilder.group(
    {
      foldername: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    });
  }

  loadFolders()
  {
    this.folderService.getFolders().subscribe((data: List[]) =>
    {
      console.log(data);
      this.lists=data;
    });
  }

  onSubmit()
  {
    this.folderService.creatNewFolder(this.newFolder.get('foldername').value).subscribe(
    {
      next:response =>
      {
        this.loadFolders();
        console.log(response);
      },
      error:error =>
      {
        alert(`Couldn't create the new folder. Error: ${error.message}`)
      }
    });
  }

}

