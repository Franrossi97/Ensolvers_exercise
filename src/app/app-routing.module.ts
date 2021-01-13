import { FolderComponent } from './folders/folder-list/folder/folder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoldersComponent } from './folders/folders.component';
import { EditItemComponent } from './folders/folder-list/folder/edit-item/edit-item.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes =
[
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo:"login", pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: "folders", component: FoldersComponent, canActivate: [AuthGuardService],children:
  [
    {path: "folder/:id/:name", component: FolderComponent,children:
    [
      {path:"edit/:id", component: EditItemComponent}
    ]}
  ]
  },
  {path:'**',redirectTo: 'folders'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
