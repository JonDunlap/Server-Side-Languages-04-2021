var http = require('http'); // fix htt to http
var myname = function () {
  // fix spelling of function
  return 'Here is my IP address'; // change to a return statement
};
async function callHttpbin() {
  // fix spelling from callHttpbi to callHttpbin // change to async function
  let promise = new Promise((resolve, reject) => {
    http.get('http://httpbin.org/ip', function (response) {
      var str = '';
      response.setEncoding('utf8');
      response.on('data', function (data) {
        str += data;
      });
      response.on('end', function () {
        var result = JSON.parse(str);
        myips = result.origin;
        resolve(myips); // send the myips variable as a result
      });
    });
  });

  let result = await promise;
  return result; // add return statement
}
(async function executeAsyncTask() {
  // change to async function
  const valueA = await callHttpbin();
  const valueB = myname();
  console.log(valueB + ' ' + valueA);
})(); // add closing bracket // make function IIFE so that it executes
// Output Here is my IP address 149.24.160.1, 149.24.160.1
