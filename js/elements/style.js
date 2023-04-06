export class Style{
    constructor(prop, val)
    {
        this.property = prop;       // String
        this.value = val;          // Any
    }

    get getProperty(){
        return this.property;
    }

    get getValue(){
        return this.value;
    }
}