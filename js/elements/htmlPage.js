export class HTMLPage{
    constructor() {
        this.objectList = [];         // Type : HTMLObject
        this.styleList  = {};         // Type : Style
        this.styleList["header"] = [];
        this.styleList["body"] = [];
        this.styleList["footer"] = [];
    }

    set addObject(gotten_object)
    {
        this.objectList.push(gotten_object);
    }

    empty()
    {
        this.objectList = [];
    }

    set delObject(object_id)
    {
        if (object_id === 0) this.objectList.shift();
        else this.objectList.splice(object_id, 1);
    }

    addStyle(style, element) {
        this.styleList[element].push(style);
    }

    get getStyleList() {
        return this.styleList;
    }
}