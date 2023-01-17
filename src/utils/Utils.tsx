import {renderToString} from "react-dom/server";
import {CustomMark} from "../components/Note/CustomMark/CustomMark";

export function highlightTags(text: string, tags: string[], isTagRaw: boolean = false): string {
    tags.forEach((tag) => {
        tag = tag.trim().slice(1, tag.length)
        text = text.trim()
        let regEx = new RegExp(tag, "ig");
        const tagsInText = text.match(regEx) ?? []
        while (tagsInText.length) {
            let tagInText = tagsInText.pop()
            if (!tagInText) break;
            let index = text.indexOf(tagInText) - 1
            let symbolBeforeTag = text[index]
            if (isTagRaw && symbolBeforeTag === '#') {
                text = text.substring(0, index) + text.substring(index + 1, text.length);
                text = text + '&nbsp;'
            }
            regEx = new RegExp('\\b' + tagInText + '\\b', "g");
            let innerHtml = renderToString(<CustomMark>{tagInText}</CustomMark>)
            text = text.replaceAll(regEx, innerHtml)
        }
    })
    return text
}