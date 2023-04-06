export class HTMLPage{
    constructor() {
        this.objectList = [];         // Type : HTMLObject
    }

    set addObject(get_object)
    {
        this.objectList.push(get_object);
    }

    empty()
    {
        this.objectList = [];
    }
}