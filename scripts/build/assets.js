var copy = require('copy');


copy('{core/,objects/,}*.json', 'lib/', {
    ignore: [
        'jasmine*',
        'package*'
    ]
}, function(err) {
    if(err) {
        console.error('Unable to copy assets to the "lib/" directory', err);
        process.exit(1);
        return;
    }

    console.log('Copied assets to the "lib/" directory');
});
