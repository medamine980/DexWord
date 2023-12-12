import Parser from "./Parser";

class ArabDictParser extends Parser {
    constructor(html: string) {
        super(html);
    }

    parse(searchingFor: "latin" | "arabic" = "arabic") {
        // let i = 17999;
        // console.log(this.html.substring(i, i + 2000));<li class="comment" id="div_5">
        const matches = Array.from(this.html.matchAll(new RegExp(
            `<h5 class="add-noise"><span class="badge badge-pill badge-light">(${this.anyWordPattern})</span></h5>((?: <li${this.attrPattern}class="comment"${this.attrPattern}>
<div class="rec-body description">
<div class="latin">
<a${this.attrPattern}></a><i${this.attrPattern}> </i>
(?:<a${this.attrPattern}><i class="la la-warning"></i></a> )?(?:<span class="article">${this.anyWordPattern}</span> )?<a${this.attrPattern}>(?:<mark>)?${this.anyWordPattern}(?:</mark>)?</a> <span class="term-info">(?:<span class="article">${this.anyWordPattern}</span>)?${this.anyWordPattern}</span>
</div>
<div class="arabic${this.attrPattern}>
<a${this.attrPattern}class="arabic-term">(?:<mark>)?${this.anyWordPattern}(?:</mark>)?</a> <span class="term-info">${this.anyWordPattern}</span>
<i${this.attrPattern}> </i>
<a${this.attrPattern}><i class="icon la la-ellipsis-v"> </i></a>
</div>
</div><a class="more-ic"${this.attrPattern}><i class="la la-angle-down"></i></a>
</li>)+)`, 'g')))
        const result: TranslationData[] = [];
        const wordRegex = searchingFor === "latin" ? new RegExp(`<a${this.attrPattern}class="latin-term">(${this.anyWordPattern})</a>`,
            'g') : new RegExp(`<a${this.attrPattern}class="arabic-term">(${this.anyWordPattern})</a>`,
                'g');
        for (const match of matches) {
            const type = match[1];
            const repeatedLis = match[2];
            const wordMatches = Array.from(repeatedLis.matchAll(
                wordRegex
            ));
            // console.log("AAAAA", repeatedLis)
            wordMatches.forEach(wordMatch => {
                result.push({
                    translation: wordMatch[1],
                    type: type,
                    lang: "arabic",
                    examples: [],
                    isFeatured: false,
                })
            });
        }
        return result;
    }
}

export default ArabDictParser;