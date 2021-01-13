import { ItemService } from './item.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('ffrom') feedbackFormDirective;
  constructor(private formBuilder:FormBuilder, private itemService:ItemService,
    private route: ActivatedRoute, private router: Router, private location: Location) { }

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
    this.itemService.editItemName(this.idItem,this.editFolder.get("itemname").value);
    this.editFolder.reset();
    this.location.back();
  }

}
