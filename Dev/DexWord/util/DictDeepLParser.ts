import Parser from "./Parser";

class DictDeepLParser extends Parser {
    lang: Language;
    translationPattern: string;
    titlePattern: string;
    constructor(html: string, lang: Language) {
        super(html);
        this.lang = lang;
        this.translationPattern = "([\\w\\s'&#\\d�;!À-ÿ?]+)";
        this.titlePattern = "([\\w,\\s&;]+)";
    }

    parse(): TranslationData[] | [] {
        const result: TranslationData[] = [];
        const matchs = Array.from(this.html.matchAll(
            new RegExp(`<div class='translation sortablemg[^']*'><(?:div|h3) class='translation_desc'><span class='tag_trans'${this.attrPattern}><a${this.attrPattern}class='dictLink( featured)?'>${this.translationPattern}</a> <span class='tag_type' title='${this.titlePattern}'>${this.anyWordPattern}</span>(?: <a${this.attrPattern}></a>| <span class='tag_usage'${this.attrPattern}>${this.anyWordPattern}</span>)?<a class='expand_i'></a></span><!--${this.insideCommentPattern}-->(?: <span${this.attrPattern}>${this.anyWordPattern}<span${this.attrPattern}>${this.anyWordPattern}</span><span${this.attrPattern}><a${this.attrPattern}>${this.anyWordPattern}</a>${this.anyWordPattern}<span${this.attrPattern}>${this.anyWordPattern}</span></span>${this.anyWordPattern}</span>)?</(?:div|h3)><!--${this.insideCommentPattern}--><!--${this.insideCommentPattern}-->
(?: <span class='sep'>&middot;</span> )?(<div class='example_lines'>(?:<div class='example line '${this.attrPattern}><span class='tag_e'><span class='tag_s'>${this.anyWordPattern}</span> <span class='dash'>&mdash;</span>&nbsp;<span class='tag_t'>${this.anyWordPattern}</span><span class='tag_e_end'></span></span></div>)+)?`, "g")
        ));
        for (let index in matchs) {
            const match = matchs[index];
            let isFeatured = match[1] === " featured";
            let translation: string = match[2];
            let type = match[3];
            let examplesMatchs = Array.from(match[4]?.matchAll(new RegExp(`<div class='example line '${this.attrPattern}><span class='tag_e'><span class='tag_s'>(${this.anyWordPattern})</span> <span class='dash'>&mdash;</span>&nbsp;<span class='tag_t'>(${this.anyWordPattern})</span><span class='tag_e_end'></span></span></div>`
                , "g")) ?? []);
            let examples: string[][] = [];
            for (let i = 0; i < examplesMatchs.length; i++) {
                examples.push(
                    [
                        examplesMatchs[i][1].replace(/&#039;/g, "'"),
                        examplesMatchs[i][2].replace(/&#039;/g, "'")
                    ]
                );
            }
            translation = translation.replace(/&#039;/g, "'");
            type = type?.replace(/&nbsp;/g, " ");
            // console.log(match);
            result.push(
                {
                    lang: this.lang,
                    translation,
                    isFeatured,
                    type,
                    examples
                }
            );
        }
        result.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) {
                return -1;
            } else if (!a.isFeatured && b.isFeatured) {
                return 1;
            } else {
                return 0;
            }
        });
        return result;
    }
}

export default DictDeepLParser;