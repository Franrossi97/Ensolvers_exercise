import { ItemService } from './edit-item/item.service';
import { ItemList } from './../../../shared/ItemList';
import { FolderService } from './../../folder.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  editFolder: FormGroup;
  editIdItem:number;
  folderID:number=-1;
  folderName:string="";
  itemsList: ItemList[]=[];
  constructor(private folderService: FolderService, private route: ActivatedRoute,
    private itemService: ItemService, private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(() =>
    {
      this.getFolderName();
      this.getListItems();
    });

    this.editFolder=this.formBuilder.group(
    {
      itemname:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    });
  }

  getListItems()
  {
    this.folderID=+this.route.snapshot.paramMap.get('id');
    this.folderService.getFoldersItems(this.folderID).subscribe(data =>
    {
      this.itemsList=data;
    });
  }

  getFolderName()
  {
    this.folderName=this.route.snapshot.paramMap.get("name");
    console.log(this.folderName);
  }

  onChangeDone(idItemList:number)
  {
    console.log(idItemList);
    this.itemService.changeDone(idItemList).subscribe(
    {
      next:response =>
      {
        console.log(response);
        this.getListItems();
      },
      error:error =>
      {
        //alert(`Could not change the status. Error: ${error.message}`);
        this.getListItems();
      }
    });
  }

  onSubmit()
  {
    this.itemService.adNewItem(this.folderID,this.editFolder.get("itemname").value).subscribe(
    {
      next:response =>
      {
        console.log(response);
        this.getListItems();
      },
      error:error =>
      {
        console.log(`Could not change the status. Error: ${error.message}`);
        this.getListItems();
      }
    });
  }

  onEdit(id:number)
  {
    this.editIdItem=id;
  }
}
