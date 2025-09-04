hljs.addPlugin(new CopyButtonPlugin({
    autohide: false,
}));

const { Marked } = window.marked;
const { markedHighlight } = window.markedHighlight;

const markdownInput = document.getElementById("markdown");
const markdownOutput = document.getElementById("preview-content");

const marked = new Marked(
    markedHighlight({
        emptyLangClass: "hljs",
        langPrefix: "hljs language-",
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        }
    })
);

markdownInput.addEventListener("input", function() {
    markdownOutput.innerHTML = marked.parse(markdownInput.value);
}, false);