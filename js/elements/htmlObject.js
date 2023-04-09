export class HTMLObject{
    constructor(id) {
        this.identifier = id;         // De type String
        this.properties = [];     // De type String
        this.styleList = [] ;     // De type Style
    }

    get getIdentifier() { return this.identifier; }
    get getProperties() { return this.properties; }
    get getStyleList() { return this.styleList; }
    set addStyleStyle(style) { this.styleList.push(style); }

    /**
     * Gets the Style instance associated to the property string
     * If not found returns null
     *
     * @param property
     * @returns {Style|null}
     */
    getStyleFromProperty(property) {
        for (const style of this.styleList) {
            if (style.getProperty === property) {
                return style;
            }
        }
        return null;
    }
}