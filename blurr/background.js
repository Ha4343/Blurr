chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            let wordsToBlur = [
                "spoiler", "violence", "NSFW", "trigger", "leak",
                "death", "gore", "blood", "disturbing", "graphic",
                "mature", "explicit", "sensitive", "horror", "crime",
                "attack", "scary", "dark web", "creepy", "unsettling",
                "gruesome", "trauma", "abuse", "harassment", "suicide",
                "self-harm", "drugs", "addiction", "paranormal", "killer",
                "nightmare", "accident", "injury", "murder", "pain",
                "fear", "sadistic", "toxic", "threat", "psychopath","suicide"
            ];
            
            function blurText(node) {
                if (node.nodeType === 3) { 
                    let text = node.nodeValue;
                    wordsToBlur.forEach((word) => {
                        let regex = new RegExp(`\\b${word}\\b`, "gi");
                        if (regex.test(text)) {
                            let span = document.createElement("span");
                            span.textContent = text;
                            span.style.backgroundColor = "black";
                            span.style.color = "black";
                            node.replaceWith(span);
                        }
                    });
                } else {
                    node.childNodes.forEach(blurText);
                }
            }
            blurText(document.body);
        }
    });
});
