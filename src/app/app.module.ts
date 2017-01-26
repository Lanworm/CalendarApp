/**
 * Created by anton.goloschapov on 06.01.2017.
 */
import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DialogComponent} from "./dialog/dialog.component";
import {FormsModule}   from '@angular/forms'
import {EventFilterPipe} from "./event-filter.pipe";
import {EventService} from "./app.service";
import {HttpModule, JsonpModule} from "@angular/http";

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, JsonpModule
    ],
    declarations: [
        AppComponent, DialogComponent, EventFilterPipe
    ],
    providers: [EventService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

