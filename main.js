// Packages
var Markdown = require('markdown-to-html').Markdown,
  fs = require('fs');

// Variables
var inputFile = 'ad.md',
  outputFile = 'ad.html';

// Render once on start
render();

// Start watching directory for changes to input file
fs.watch('./', function (event, filename) {
  if (filename == inputFile) render();
});

// Function to render output
function render() {
  // Begin logging progress
  console.log('===============================');
  console.log('Starting...');

  // Create new markdown instance
  var md = new Markdown();

  // To be called when done to finish logging
  md.once('end', function() {
    console.log('Done!');
    console.log('===============================');
  });

  // Render md -> html
  md.render(inputFile, {}, function(err) {
    console.log('Rendering ' + inputFile + ' -> ' + outputFile);
    if (err) {
      console.error('>>>' + err);
      process.exit();
    }
    md.pipe(fs.createWriteStream(outputFile));
  });
}
