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
        let id=-1;
        for (let element of this.objectList) {
            if(element===gotten_object)
            {
                id=this.objectList.indexOf(element);
            }
        }
        if(!id===-1)
            this.objectList.slice(id,id+1);
        else
            console.log("ERREUR LORS DE LA SUPPRESION D'ITEM");
    }
}