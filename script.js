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

    // code taken and modified from https://www.eddymens.com/blog/adding-a-copy-button-to-highlightjs-code-snippets
    var snippets = document.getElementsByTagName("pre");
    var numberOfSnippets = snippets.length;

    for (var i = 0; i < numberOfSnippets; i++) {
        code = snippets[i].getElementsByTagName("code")[0].innerText;
        snippets[i].classList.add("hljs"); // append copy button to pre tag
        snippets[i].innerHTML = "<button class=\"hljs-copy-button\">Copy</button>" + snippets[i].innerHTML; // append copy button
        snippets[i].getElementsByClassName('hljs-copy-button')[0].addEventListener("click", function () {
            this.innerText = 'Copying..';
            navigator.clipboard.writeText(code);
            this.dataset.copied = true;
            button = this;
            setTimeout(function () {
                button.dataset.copied = false;
            }, 1000)
        });
    }
}, false);