/**
 * Created by anton.goloschapov on 06.01.2017.
 */
import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import now = moment.now;

interface IdayInfo {
    num: string;
    date: string;
    dayEvent: IEvent;
    dayName: string;
}

interface IEvent {
    eventTitle: string;
    date: string;
    members: string;
    description: string;
    id: number;
}


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    now: any=moment().locale('ru');
    nowMonth: number = this.now.month();
    nowMonthName: string;
    nowDate: string = moment().locale('ru').format('YYYY-MM-DD');
    calendar: Array<any> = [];
    events: IEvent[] = [];
    event: IEvent;
    day: IdayInfo;
    weekInfo: IdayInfo[] = [];

    changeMonth(change:boolean): void {
        change ? this.now.add(1,"M") : this.now.subtract(1,"M");
        this.initCalendar()
    }

    validateDateMonth(dayOf : string): void{

       return this.now.isSame(dayOf,'month')

    }

    initCalendar(): void {
        this.nowMonthName=this.now.format('MMMM YYYY');
        let nowCopy: any=moment(this.now);
        this.calendar=[];
        let weekNumber: number=nowCopy.startOf('month').week();
        let i: number;
        let j: number;
        for (i = 0; i <= 5; i++) {
            for (j = 0; j <= 6; j++) {
                this.day = {
                    date: nowCopy.week(i+weekNumber).weekday(j).format('YYYY-MM-DD'),
                    num: nowCopy.week(i+weekNumber).weekday(j).format('D'),
                    dayEvent: this.event,
                    dayName: nowCopy.week(i+weekNumber).weekday(j).format('dddd')
                };
                this.day.dayEvent = this.events.find(event => event.date === this.day.date);
                this.weekInfo.push(this.day)
                this.validateDateMonth(this.day.date);
            }
            this.calendar.push(this.weekInfo.slice());
            this.weekInfo = []
        }
        console.log(this.calendar);


    }

    ngOnInit(): void {
        this.events.push({
            id: 322223,
            eventTitle: 'Выпить пивка',
            date: '2017-01-12',
            members: ' Семен, Василий, Петро',
            description: 'Какое-то описание'
        }, {
            id: 322223,
            eventTitle: 'Планерка',
            date: '2017-01-16',
            members: ' Семен, Василий, Петро',
            description: 'Какое-то описание'
        });
        this.initCalendar()
    }


}
