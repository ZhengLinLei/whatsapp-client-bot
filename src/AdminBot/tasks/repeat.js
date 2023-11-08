BOT.addTask('repeat', (input, output) => {
    if (input.length >= 2) {

        // /listen {user}
        let user = input[1];

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
        
                    )
                    
                    // Check if equals to user
                    if (msg.match(user)) {
                        // Send message
                        output(rutine);
                    }
        
                    // Update message
                    last = msg;
                }
            }, tt);
        }

        // Call
        wBot();
    }
}, 'repeat {user:regex}');