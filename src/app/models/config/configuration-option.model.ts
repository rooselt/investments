export class ConfigurationOption {
    public configurationOptionId?: number;
    public description: string;
    public value: any;

    constructor(init: Partial<ConfigurationOption>) {
        Object.assign(this, init);
    }
}
