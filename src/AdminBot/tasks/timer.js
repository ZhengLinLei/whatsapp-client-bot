BOT.addTask('timer', (input, output) => {
    if (input.length >= 3) {
        let t = input.slice(2).join(' ');
        let i = parseInt(input[1]);

        setTimeout(() => {
            // Send
            output(t);
        }, i * 1000);
    }
}, 'timer {seconds:int} {message:any}');