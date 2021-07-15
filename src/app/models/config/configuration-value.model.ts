import { ConfigurationOption } from './configuration-option.model';

export class ConfigurationValue {
    public identifier: string;
    public value: any;
    public section: string;
    public options: Array<ConfigurationOption>;

    constructor(init: Partial<ConfigurationValue>) {
        Object.assign(this, init);
    }
}
