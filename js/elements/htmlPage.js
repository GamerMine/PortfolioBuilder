export class HTMLPage{
    constructor() {
        this.objectList = [];         // Type : HTMLObject
    }

    set addObject(object)
    {
        this.objectList.push(object);
    }

    removeObject(object)
    {
        this.objectList.splice(this.objectList.length,1);
    }
}