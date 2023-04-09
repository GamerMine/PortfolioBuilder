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

    /**
     * Gets the Style instance associated to the property string and element string
     * If not found returns null
     *
     * @param property
     * @param element can be "header", "body" or "footer
     * @returns {Style|null}
     */
    getStyleFromProperty(property, element) {
        for (const style of this.objectList[element]) {
            if (style.getProperty === property) {
                return style;
            }
        }
        return null;
    }
}