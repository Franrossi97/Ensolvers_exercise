import { ItemService } from './item.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  editFolder: FormGroup;
  idItem:number;
  @Input() idList: String;
  @Input() nameList: String;
  @Output() newNameEvent = new EventEmitter<string>();

  @ViewChild('ffrom') feedbackFormDirective;
  constructor(private formBuilder:FormBuilder, private itemService:ItemService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void
  {
    this.editFolder=this.formBuilder.group(
    {
      itemname:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    });

    this.route.paramMap.subscribe(() =>
    {
      if(this.route.snapshot.paramMap.has("id"))
        this.idItem=+this.route.snapshot.paramMap.get("id");
    })
  }

  onSubmit()
  {
    this.itemService.editItemName(this.idItem,this.editFolder.get("itemname").value).subscribe(
    {
      next:response =>
      {
        console.log(response);
        this.newNameEvent.emit(response);

      },
      error:error =>
      {
        console.log(`Could not edit the list item. Error: ${error.message}`);
        this.newNameEvent.emit("new name");
      }
    });
    this.editFolder.reset();
    //this.route.snapshot.paramMap.get("name");
    console.log("Change");
    this.router.navigate(['../']);
  }

}
