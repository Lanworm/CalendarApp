/**
 * Created by anton.goloschapov on 06.01.2017.
 */
import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import now = moment.now;
import {IEvent} from "./event";
import {IdayInfo} from "./dayInfo";
import {EventService} from "./app.service";
import * as _ from 'lodash';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    now: any = moment().locale('ru');
    nowMonthName: string;
    nowDate: string = moment().locale('ru').format('YYYY-MM-DD');
    calendar: Array<any> = [];
    events: IEvent[] = [];
    event: IEvent;
    day: IdayInfo;
    weekInfo: IdayInfo[] = [];
    showDialog = false;
    selectedItem: IdayInfo;
    selectedEvent: IEvent;
    ls: any = localStorage;
    eventList: string = '';

    constructor(private _eventService: EventService) {
    }

    changeMonth(change: boolean): void {
        change ? this.now.add(1, "M") : this.now.subtract(1, "M");
        this.initCalendar()
    }

    setNow(): void {
        this.now = moment().locale('ru');
        this.initCalendar()
    }

    validateDateMonth(dayOf: string): void {
        return this.now.isSame(dayOf, 'month')
    }

    initCalendar(): void {
        this.nowMonthName = _.capitalize(this.now.format('MMMM YYYY'));
        let nowCopy: any = moment(this.now);
        this.calendar = [];
        let weekNumber: number = nowCopy.startOf('month').week();
        let i: number;
        let j: number;
        for (i = 0; i <= 5; i++) {
            for (j = 0; j <= 6; j++) {
                this.day = {
                    date: nowCopy.week(i + weekNumber).weekday(j).format('YYYY-MM-DD'),
                    num: nowCopy.week(i + weekNumber).weekday(j).format('D'),
                    dayEvent: this.event,
                    dayName: _.capitalize(nowCopy.week(i + weekNumber).weekday(j).format('dddd'))
                };
                this.day.dayEvent = this.events.find(event => event.date === this.day.date);
                this.weekInfo.push(this.day);
                this.validateDateMonth(this.day.date);
            }
            this.calendar.push(this.weekInfo.slice());
            this.weekInfo = []
        }
    }

    ngOnInit(): void {
        if (this.ls.getItem('eventsLs') !== null) {
            this.events = JSON.parse(this.ls.getItem('eventsLs'))
        }
        this.initCalendar();
        console.log(this.ls.getItem('eventsLs'));
        console.log(this.eventList);
        this._eventService.getEvents().then(
            heroes => console.log(heroes),
            error => console.log(error));
    }

    onDaySelected(_selectedDay: any): void {
        this.selectedItem = _selectedDay;
        if (_selectedDay.dayEvent) {
            this.selectedEvent = _selectedDay.dayEvent
        }
        else {
            this.selectedEvent = null
        }
        this.showDialog = true;
    }

    onAddEvent(_event: IEvent) {
        this.events.push(_event);
        this.initCalendar();
        this.showDialog = false;
        this.ls.setItem('eventsLs', JSON.stringify(this.events))
    }

    onDeleteEvent(_event: IEvent) {
        _.reject(this.events,_event);
        this.initCalendar();
        this.showDialog = false;
        this.ls.setItem('eventsLs', JSON.stringify(this.events));
    }

    onEventChange(_event: IEvent) {
        _.reject(this.events,_event);
        this.events.push(_event);
        this.initCalendar();
        this.showDialog = false;
        this.ls.setItem('eventsLs', JSON.stringify(this.events));
    }

    onFindEventSelect(_eventDate: string) {
        this.now = moment(_eventDate, 'YYYY-MM-DD').locale('ru');
        this.eventList='';
        this.initCalendar()
    }
}
