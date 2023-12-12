abstract class Parser {
    html: string;
    anyWordPattern: string;
    tagPattern: string;
    insideCommentPattern: string;
    attrPattern: string;
    constructor(html: string) {
        this.html = html;
        this.anyWordPattern = `[\u0600-\u06FF\\w\\d.\\sÀ-ÿ-,'?&#;:\\[\\]\\()\u00a0{}]*`;
        this.tagPattern = "[\\w\\d-]";
        this.insideCommentPattern = ".+?(?=<!--|-->)";
        this.attrPattern = `[\u0600-\u06FF\\s\\w="'-/-.\\d%?!:\\(\\){}&;#]*`
    }
}

export default Parser;