
var supertest = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var server = require('../server/serverDev.js');
var supertest = require('supertest');

var User = require('../server/signup/signupModel.js');

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
  
  describe("POST /signup", function() {
    // Delete test user after it is created
    after(function() {
      User.findOneAndRemove({username: 'test123456'}, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('    >>> Test user deleted.');
        }
      });
    });

    it("should create and return a new user", function(done) {
      var testUser = {
        username: "test123456",
        password: 1234,
      };
      request
        .post('/signup')
        .send(testUser)
        .expect(201, {
          username: 'test123456', 
          symbol: []
        }, done);
    });
  });
  
  describe("POST /auth/login", function() {
    it("should return 200 status with username and symbols", function(done) {
      var userData = {
        username: 'test9',
        password: '1234'
      };
      request
        .post('/auth/login')
        .send(userData)
        .expect(200, {
          'username': 'test9',
          'stocks': ['E']
        }, done);
    });
    
    it("should return 404 status with wrong password error", function(done) {
      var userData = {
        username: 'test9',
        password: 'badpassword'
      };
      request
        .post('/auth/login')
        .send(userData)
        .expect(404, {
          error: 'password does not match'
        }, done);
    });
    
    it("should return 404 status with error message", function(done) {
      var userData = {
        username: 'asgeagobas;og',
        password: 'admin'
      };
      request
        .post('/auth/login')
        .send(userData)
        .expect(404, {
          error: 'User not found'
        }, done);
    });
    
  });
  
});