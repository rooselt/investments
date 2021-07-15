
import { Position } from './position.model';

export class UserPosition {
    idUser: number;
    checkingAccountAmount: number;
    positions: Position[];
    consolidated: number;
    quantity: number;
}