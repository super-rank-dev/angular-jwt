import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'atmark' })
export class AtmarkPipe implements PipeTransform {
    transform(value: string): string {
        return `${value} @`;
    }
}