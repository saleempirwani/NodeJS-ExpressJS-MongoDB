var fs = require('fs')

function appendFile(path, data) {
    fs.appendFile(path, data, function (err) {
        if (err) throw err
        console.log("Saved...")
    })
}

function writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
        if (err) throw err
        console.log("Saved...")
    })
}

function deleteFile(path) {
    fs.unlink(path, function (err) {
        if (err) throw err
        console.log("Deleted...")
    })
}

function rename(oldPath, newPath) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log("Renamed...")
    })
}


appendFile('abc.txt', 'Hello World')
// writeFile('abc.txt', 'Hello World 22')
// deleteFile('abc.txt')
rename('abc.txt', 'xyz.txt')