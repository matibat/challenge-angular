import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTeamFormComponentComponent } from './new-team-form-component/new-team-form-component.component';
import { TeamListComponentComponent } from './team-list-component/team-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTeamFormComponentComponent,
    TeamListComponentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
