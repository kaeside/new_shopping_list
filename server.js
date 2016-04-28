var express = require('express');
var bodyParser = require('body-parser'); // show the infos
var jsonParser = bodyParser.json(); // return i json format
var Storage = function() { // constructor
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) { // created a method .add to add items
    var item = {name: name, id: this.id}; // this select the specified item
    this.items.push(item); // this send the item added to the list
    this.id += 1; // increment item id by 1 whenever an item is added.
     return item;
};
// create prototype that deletes items from array
// this.items.splice(index of item that we wish to delete(must be dynamic), how many items we want deleted from array)


Storage.prototype.delete = function (id){ //created a delete method
    for (var arrayIndex in this.items) { //created a for in loop that loops through the this.items array

        if (id === this.items[arrayIndex].id){ // find proper id and delete it
            this.items.splice(arrayIndex, 1); // this line splice/deleting the item found
            return true;
        }
    }
};
Storage.prototype.modify = function(newObject){ //constructor
        for (var arrayIndex in this.items) {
            if (newObject.id === this.items[arrayIndex].id){ // find object to be modify
                this.items[arrayIndex] = newObject; // passing new value to same object
                var editedItem = this.items[arrayIndex];
                return true
            }
        }
};

var storage = new Storage(); // created an object
storage.add('Broad beans'); // using add method value to object
storage.add('Peppers');
storage.add('Cologne');



//storage.delete(1);
//console.log(storage);

var app = express(); // creating a set of setting
app.use(express.static('public')); // method .use which set the app to public

app.get('/items', function(req, res) { // .get add variable to URL
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400); // 400 bad request
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item); // 200 good request
});

app.delete('/items/:id', jsonParser, function(req, res) {

    var itemId = parseInt(req.params.id, 10);

    if (!storage.delete(itemId)) { // deleting an item not in storage will shout 400 msg
        return res.sendStatus(400);
    } else {
        res.status(201).json(storage.items);
    }
});

app.put('/items/:id', jsonParser, function(req, res) {
    if (!storage.modify(req.body)){
        return res.sendStatus(400);
    } else {
        res.status(201).json(storage.items[req.body.id]);
    }

    //.log(storage.items);

});


app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;
