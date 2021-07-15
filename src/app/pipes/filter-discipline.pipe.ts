import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../models/position.model';

@Pipe({
    name: 'filterPosition'
})
export class FilterPositionPipe implements PipeTransform {
    public transform(items: any[], searchText: string): Position[] {

        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(it => {
            return it.symbol.toLocaleLowerCase().indexOf(searchText) !== -1;
        });
    }
}