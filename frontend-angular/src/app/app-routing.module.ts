import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonListComponent} from "./person/person-list/person-list.component";
import {PersonDetailComponent} from "./person/person-detail/person-detail.component";

const routes: Routes = [
  {
    path: "",
    component: PersonListComponent
  },
	{
		path: "new-person",
		component: PersonDetailComponent,

	},
	{
		path: ":id",
		component: PersonDetailComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
