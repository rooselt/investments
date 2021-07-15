import { Trends } from './trends.model';
import { UserPosition } from './userPosition.model';


export class JsonData {
    amount: number;
    bank: string;
    account: string;
    trends: Trends[];
    userPosition: UserPosition;
}