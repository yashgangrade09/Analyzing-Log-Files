// This file should be used if you want to test on the localhost server
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var resolve = require('path').resolve

// function to sort the table in decreasing order
function sortProperties(obj)
{
  var sortable=[];
  for(var key in obj)
    if(obj.hasOwnProperty(key))
      sortable.push([key, obj[key]]);

  sortable.sort(function(a, b)
  {
    var x=a[1]
      y=b[1]
    return x<y ? 1 : x>y ? -1 : 0;
  });
  return sortable; 
}

// function to parse the files and make a stylized table containing all the entries from the data
function parseFiles(filepath, res){
  var user_record = {};
  var myTable = "<table><tr><td style='width: 100px; color: black; text-align: left;'>User Name</td>";
  var lineReader = require('readline').createInterface({
    input: fs.createReadStream(filepath)
  });
  
  lineReader.on('line', function (line) {
    user_name = line.split(' ')[6];
    if (user_name != undefined && user_name != 'c-ip') {
      if (user_name in user_record){
        user_record[user_name] += 1;
      }
      else{
        user_record[user_name] = 1;
      } 
    }
  })
  .on('close', function(){
    record_arr = sortProperties(user_record)
    log = fs.readFile('logstats.html', "utf8", function(error, data){
      if (error){
        res.writeHead(404);
        res.write('Page not found');
      }
      else {
        display_data = '';
        chart_data = '';
        for (var i=0; i < record_arr.length; i++){
          var name = record_arr[i][0];
          var views = record_arr[i][1];
          display_data += "<td>" + name + "</td>";
          display_data += "<td>" + views + "</td></tr>";
          chart_data += '{y: ' + views + ', label: "' + name + '"}, '; 
        }
        res.write(data.replace('display_data', display_data).replace('chart_data', chart_data));
        res.end();
      }
    })
  });
}

// Setting up the environment to run on the localhost
http.createServer(function (req, res) {
  if (req.url == '/logstats.html') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '../files/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        parseFiles(newpath, res);
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    landing = fs.readFileSync('index.html')
    res.write(landing)
    res.end();
  }
}).listen(8080);