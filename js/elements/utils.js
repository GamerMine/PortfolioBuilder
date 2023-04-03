export class HTMLObject{
    constructor(id) {
        this.identifier = id;         // De type String
        this.properties = [];     // De type String
        this.styleList = [] ;     // De type Style
    }

    get getIdentifier()
    {
        return this.identifier;
    }
    get getProperties()
    {
        return this.properties;
    }

    get getStyleList()
    {
        return this.styleList;
    }

    set addStyleStyle(style)
    {
        this.styleList.push(style);
    }
}