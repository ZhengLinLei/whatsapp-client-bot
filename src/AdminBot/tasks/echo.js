BOT.addTask('echo', (input, output) => {
    if (input.length >= 2) {
        input = input.slice(1).join(' ');

        // Send
        output(input);
    }
});