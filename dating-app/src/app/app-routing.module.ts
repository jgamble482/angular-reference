import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {PreventUnsavedChangesGuard} from './guards/prevent-unsaved-changes.guard';
import {MemberDetailResolver} from './resolvers/member-detailed.resolver'

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children:
[
  {path:'members', component: MemberListComponent},
  {path:'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailResolver}},
  {path:'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
  {path:'lists', component: ListsComponent},
  {path:'messages', component: MessagesComponent},
  {path:'admin', component: AdminPanelComponent, canActivate: [AdminGuard]}
]},
  {path: 'error', component: TestErrorComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'not-found', component: NotFoundComponent},

  {path:'**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
