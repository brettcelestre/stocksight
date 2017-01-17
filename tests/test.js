
var supertest = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var server = require('../server/serverDev.js');
var supertest = require('supertest');

// this will handle our HTTP requests
var request = supertest.agent(server);

describe("Server Routes", function() {
  
  describe("GET /", function() {
    it("should return the content of index.html", function(done) {
      request
        .get('/')
        .expect(200, /<div/, done);
    });
  });
  
  describe("POST /auth", function() {
    it("should return username and symbols", function(done) {
      var userData = {
        username: 'test9',
        password: '1234'
      };
      request
        .post('/auth/login')
        .send(userData)
        .expect(function(res) {
          res.username = 'test9';
          res.stocks = ['E']
        })
        .expect(200, {
          'username': 'test9',
          'stocks': ['E']
        }, done);
    });
  });
  
});