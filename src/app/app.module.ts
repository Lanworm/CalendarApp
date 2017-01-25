/**
 * Created by anton.goloschapov on 06.01.2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {DialogComponent} from "./dialog/dialog.component";
import { FormsModule }   from '@angular/forms'
import {EventFilterPipe} from "./event-filter.pipe";
@NgModule({
  imports: [
    BrowserModule,FormsModule
  ],
  declarations: [
    AppComponent, DialogComponent, EventFilterPipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

