
BOT.addTask('listen', (input, output) => {
    if (input.length >= 3) {

        // /listen {user} "{message}" {output}
        let user = input[1];
        // msg in quotes
        let rest = input.slice(2).join(' ');
        let msgU = rest.match(/"([^"]+)"/)[1];
        let outputMsg = rest.split('"')[2].trim();

        const wBot = (tt = 10) => {

            function getProperties() {
                let pp = document.querySelector('div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs');
                let ll = pp.childNodes.length;
                let lt = pp.childNodes[ll-1].innerText;
                return [pp, ll, lt];
            }
            
            // Get DOM values
            let p, le, last;
            [p, le, last] = getProperties();
        
            let service = setInterval(()=>{
                let msg;
                [p, le, msg] = getProperties();
                
                // Evaluate if msg != lastSaved(message) AND The message is from others
                if (last != msg && p.childNodes[le-1].querySelector(".message-in")) {
                    
                    // Get message | Remove timestamp (-6 length)
                    let rutine = (
        
                            p.childNodes[le-1].querySelector('._11JPr.selectable-text.copyable-text').innerText  // ---> If Exist
                            ??
                            msg.split('\n').slice(-3)[0]                                                         // ---> Alternative
        
                    )
                    
                    // Check if equals to user
                    if (msg.match(user)) {
                        // Check if starts with content
                        if (rutine.match(msgU)) {
                            // Stop service
                            clearInterval(service);
                            // Send message
                            output(outputMsg);
                        }
                    }
        
                    // Update message
                    last = msg;
                }
            }, tt);
        }

        // Call
        wBot();
    }
});
