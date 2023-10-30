const wBot = (lang, tt = 10) => {

    function getProperties() {
        let pp = document.querySelector('div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs');
        let ll = pp.childNodes.length;
        let lt = pp.childNodes[ll-1].innerText;
        return [pp, ll, lt];
    }
    
    // Get DOM values
    let p, le, last;
    [p, le, last] = getProperties();

    setInterval(()=>{
        let msg;
        [p, le, msg] = getProperties();

        // Evaluate if msg != lastSaved(message) AND The message is from others
        if (last != msg && p.childNodes[le-1].querySelector(".message-in")) {
            
            // Get message | Remove timestamp (-6 length)
            let rutine = (

                    p.childNodes[le-1].querySelector('._11JPr.selectable-text.copyable-text').innerText  // ---> If Exist
                    ??
                    msg.split('\n').slice(-3)[0]                                                         // ---> Alternative

            ).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();                            // ---> Make it readable

            // Check if starts with content
            if (lang.startWith && !rutine.startsWith(lang.startWith))
                return;

            rutine = rutine.slice(lang.startWith.length);
            
            // Get all rutine
            let matches = [];

            for (const [key, value] of Object.entries(lang.language)) {
                if (rutine.match(`${key}`)) 
                    matches.push({
                        key,
                        value
                    });
            }

            // Check if there are more than one occurences
            if (matches.length > 1)
                console.warn("There many results with the same input. By default will choose the first one. [Please specify the order of priority and details of your language", matches);
            else 
            if (matches.length == 0 && lang.default && lang.default.active)
                matches.push({
                    key: "Default",
                    message: lang.default.message ?? "Unknow command",
                });
            
            // Send message
            enviarScript(matches[0].value);


            // Update message
            last = msg;
        }
    }, tt);
    
    // Write message and click event
    async function enviarScript(scriptText){
        const lines = scriptText.split("\r\n").map(line => line.trim()).filter(line => line);
        main = document.querySelector("#main"),
        textarea = main.querySelector(`div[contenteditable="true"]`)
    
        if(!textarea) throw new Error("You don't have any window opened!")
    
        for(const line of lines){
            console.log(line)
    
            textarea.focus();
            document.execCommand('insertText', false, line);
            textarea.dispatchEvent(new Event('change', {bubbles: true}));
    
            setTimeout(() => {
                (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
            }, 100);
        
            if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
        }
    
        return lines.length;
    }
}





// --------------------------------


// DO NOT COPY THE CODE BELOW
// CREATE ONE WITH YOUR OWN RULES OR WHATEVER YOU WANT TO ANSWER

wBot({
    startWith: "/",         // Can specify "null"
    default: {
        active: true,       // Can be disable
        message: "Sorry, I cannot understand what did you type"
    },
    language: {
        "hi$": "Hi, how are you?",
        "hi*": "Hi, hi, hi, hi, hiiii",
        "bye$": "Bye, see you", 
        "wBot$": "Servicing you \nHow can I help you?\n My Source Code is in: https://github.com/ZhengLinLei/whatsapp-client-bot",
        "hi(.*)": "Hi, what?",
        "fuck you$": "Don't say that",
        "[a-bA-Z]* is awesome": "I agree!",
        "[nya|miau]": "Nyaaaa!"
    }
});