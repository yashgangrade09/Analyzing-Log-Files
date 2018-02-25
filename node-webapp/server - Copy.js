var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

function tableCreate() {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            if (i == 2 && j == 1) {
                break
            } else {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode('\u0020'))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

function sortProperties(obj)
{
  // convert object into array
  var sortable=[];
  for(var key in obj)
    if(obj.hasOwnProperty(key))
      sortable.push([key, obj[key]]); // each item is an array in format [key, value]
  
  // sort items by value
  sortable.sort(function(a, b)
  {
    var x=a[1]
      y=b[1]
    return x<y ? 1 : x>y ? -1 : 0;
  });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function parseFiles(filepath, res){
  var user_record = {};

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
    for (var i=0; i < record_arr.length; i++){
      // console.log(user_record.toString());
      res.write(record_arr[i][0] + ' ' + record_arr[i][1] + '\n');
    }
    res.end();
  });
}

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'files/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        parseFiles(newpath, res);
      });

 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);