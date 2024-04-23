import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonListComponent} from './person/person-list/person-list.component';
import {PersonDetailComponent} from './person/person-detail/person-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatButtonModule} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonDetailComponent
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatCardModule,
		MatButtonModule,
		MatListItem,
		MatList,
		ReactiveFormsModule,
		FormsModule,
		MatFormField,
		MatInput,
		MatLabel,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatDialogTitle,
		MatToolbar,
		NgxMaskDirective,
		NgxMaskPipe
	],
  providers: [
    provideAnimationsAsync(),
		provideNgxMask()
  ],
  exports: [
    MatCardModule,
		MatButtonModule,
		MatListItem,
		MatList,
		ReactiveFormsModule,
		FormsModule,
		MatFormField,
		MatInput
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
