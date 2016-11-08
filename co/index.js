
var co = require('co');
var fs = require('fs')
co(function* () {
    var result = yield Promise.resolve(true);
    return result;
}).then(function (value) {
    console.log(value);
}, function (err) {
    console.error(err.stack);
});
//
// co(function *(){
//     // yield any promise
//     var result = yield Promise.resolve(true);
// }).catch(function () {
//     console.log(11)
// });

// co(function *(){
//     // resolve multiple promises in parallel
//     var a = Promise.resolve(1);
//     var b = Promise.resolve(2);
//     var c = Promise.resolve(3);
//     var res = yield [a, b, c];
//     console.log(res);
//     // => [1, 2, 3]
// }).catch(function () {
//     console.log(11)
// });

function readFile(filename, enc){
    return new Promise(function (fulfill, reject){
        fs.readFile(filename, enc, function (err, res){
            if (err) reject(err);
            else fulfill(res.toString());
        });
    });
}

// co(function *(){
//     // resolve multiple promises in parallel
//     var a = yield readFile(__dirname+"/a.txt");
//     console.log(a)
//     var b =  yield readFile(__dirname+"/a.txt");
//     console.log(b)
//     var c =  yield readFile(__dirname+"/b.txt");
//     console.log(c)
//
//     // var res = yield [a, b, c];
//     // console.log(res);
//     // => [1, 2, 3]
// }).catch(function (ex) {
//     console.log(ex.toString())
//     console.log(11)
// });

co(function *(){
    // resolve multiple promises in parallel
    var a =  readFile(__dirname+"/a.txt");

    var b =   readFile(__dirname+"/a.txt");

    var c =   readFile(__dirname+"/b.txt");


    var res = yield [a, b, c];
    console.log(res);
    // => [1, 2, 3]
}).catch(function (ex) {
    console.log(ex.toString())
    console.log(11)
});