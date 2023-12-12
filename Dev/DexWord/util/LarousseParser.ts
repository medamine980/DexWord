import Parser from "./Parser";

class LarouseParser extends Parser {
    noBreakingSpace: string;
    numDefPattern: string;
    constructor(html: string) {
        super(html);
        this.noBreakingSpace = "\xA0";
        this.numDefPattern = "(\\d)+\\.";
    }

    parse(): SynonymData[] {
        let i = 18545; // 17445 + 1320
        `<span class="indicateurDefinition"> –${this.noBreakingSpace}Argotique${this.noBreakingSpace}: </span>;`
        //console.log(this.html.substring(i, i + 1620));
        const matchs = Array.from(this.html.matchAll(new RegExp(
            `<li class="DivisionDefinition"><span class="numDef">${this.numDefPattern}</span>(${this.anyWordPattern}) \x0D
\t\t\t<p class="LibelleSynonyme">Synonyme :</p>\x0D
\t\t\t(<p class="Synonymes">(?:${this.anyWordPattern})?(?:<a class="lienarticle"${this.attrPattern}>${this.anyWordPattern}</a>,?)+)`, "g")))
        //         console.log(this.html.match(new RegExp(`<li class="DivisionDefinition"><span class="numDef">4\\.</span>${this.anyWordPattern}
        // \t\t\t<p class="LibelleSynonyme">Synonyme :</p>\x0D
        // \t\t\t(<p class="Synonymes">(?:<a class="lienarticle"${this.attrPattern}>${this.anyWordPattern}</a>,?)+))`)));
        // console.log(Array.from(this.html.matchAll(new RegExp(`<li class="DivisionDefinition"><span class="numDef">${this.numDefPattern}</span>\xa0 ${this.anyWordPattern} \x0D
        // \t\t\t<p class="LibelleSynonyme">Synonyme :</p>\x0D
        // \t\t\t(<p class="Synonymes">(?:<a class="lienarticle"${this.attrPattern}>${this.anyWordPattern}</a>,?)+)`, "g"))));
        const result: SynonymData[] = [];
        for (let match of matchs) {
            const synonyms = Array.from(match[3].matchAll(new RegExp(`<a class="lienarticle"${this.attrPattern}>(${this.anyWordPattern})</a>,?`
                , "g"))
            );
            let cleanSynonyms: string[] = [];
            for (let synonym of synonyms) {
                cleanSynonyms.push(synonym[1].trim());
            }
            result.push({
                definition: match[2].trim(),
                synonyms: cleanSynonyms
            });
        }
        return result;
        //         console.log(this.html.match(new RegExp(`<li class="DivisionDefinition"><span class="numDef">1.</span>  Absorber un aliment.
        //         <p class="LibelleSynonyme">Synonyme :</p>
        //         <p class="Synonymes"><a class="lienarticle" href="/dictionnaires/synonymes/absorber/113">absorber</a>,<a class="lienarticle" href="/dictionnaires/synonymes/avaler/2051"> avaler</a>,<a class="lienarticle" href="/dictionnaires/synonymes/consommer/4976"> consommer</a>,<a class="lienarticle" href="/dictionnaires/synonymes/engloutir/8123"> engloutir</a>,<a class="lienarticle" href="/dictionnaires/synonymes/engouffrer/8130"> engouffrer</a>,<a class="lienarticle" href="/dictionnaires/synonymes/ing%C3%A9rer/11907"> ingérer</a>,<a class="lienarticle" href="/dictionnaires/synonymes/ingurgiter/11913"> ingurgiter.</a><span class="indicateurDefinition"> – Argotique : </span><a class="lienarticle" href="/dictionnaires/synonymes/briffer/3119">briffer.</a><span class="indicateurDefinition"> – Familier : </span><a class="lienarticle" href="/dictionnaires/synonymes/enfourner/8110">enfourner.</a><span class="indicateurDefinition"> – Populaire : </span><a class="lienarticle" href="/dictionnaires/synonymes/bouffer/2930">bouffer</a>,<a class="lienarticle" href="/dictionnaires/synonymes/boulotter/2971"> boulotter.</a></p>
        // </li>`)));

    }
}

export default LarouseParser;