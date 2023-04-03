export class HTMLPage{
    constructor() {
        this.objectList = [];         // Type : HTMLObject
    }

    set addObject(get_object)
    {
        this.objectList.push(get_object);
    }

    removeObject(object)
    {
        this.objectList.splice(this.objectList.length,1);
    }
}