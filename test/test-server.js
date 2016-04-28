var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
});

// function(done) // allows use of done
// function (done()) //passes in result of done
