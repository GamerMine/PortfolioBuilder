export class HTMLPage{
    constructor() {
        this.objectList = [];         // Type : HTMLObject
    }

    set addObject(gotten_object)
    {
        this.objectList.push(gotten_object);
    }

    empty()
    {
        this.objectList = [];
    }

    set delObject(gotten_object)
    {
        for (let i = 0; i < this.objectList.length; i++) {
            if (this.objectList[i] === gotten_object) {
                console.log(this.objectList.splice(i, i));
            }
        }
    }
}