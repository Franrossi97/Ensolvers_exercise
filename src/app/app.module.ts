import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FoldersComponent } from './folders/folders.component';
import { FolderListComponent } from './folders/folder-list/folder-list.component';
import { FolderComponent } from './folders/folder-list/folder/folder.component';
import { EditItemComponent } from './folders/folder-list/folder/edit-item/edit-item.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoldersComponent,
    FolderListComponent,
    FolderComponent,
    EditItemComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
