/**
 * Created by anton.goloschapov on 22.01.2017.
 */
import {  PipeTransform, Pipe } from '@angular/core';
import {IEvent} from "./event";

@Pipe({
    name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

    transform(value: IEvent[], filterBy: string): IEvent[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((event: IEvent) =>
            event.eventTitle.toLocaleLowerCase().indexOf(filterBy) !== -1) : [];
    }
}

