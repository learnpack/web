const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export default [
    { 'text': 'npm install -g learnpack', 'cmd': true, delay: 250 },
    {
        'text': 'Successfully installed 😀',
        'cmd': false
    },
    { 'text': 'learnpack download react.js', 'cmd': true, delay: 250 },
    {
        text: '💻 downloading interactive exercises',
        cmd: false,
        repeat: true,
        repeatCount: 2,
        frames: spinner.map(function (spinner) {
            return {
                text: spinner + ' downloading interactive tutorial',
                delay: 40
            }
        })
    },
    {
        'text': '🎊 Done! Type "$ learnpack start" to start learning',
        'cmd': false
    },
    { 'text': 'learnpack start', 'cmd': true, delay: 250 },
    { 'text': '🔥 Your tutorial is live on http://localhost:8080', 'cmd': false }
]