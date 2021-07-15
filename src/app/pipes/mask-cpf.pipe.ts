import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../models/position.model';

@Pipe({
    name: 'maskCpf'
})
export class MaskCpfPipe implements PipeTransform {
    public transform(cpf: string): string {

        if (!cpf) {
            return "";
        }
        cpf = cpf.replace(/[^\d]/g, "");

        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.***.$3-$4");
    }
}