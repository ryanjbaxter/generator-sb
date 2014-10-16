//------------------------------------------------------------------------------
// Copyright IBM Corp. 2014
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

function getPackage(clazz, separator) {
  var parts = clazz.split('.');
  parts.splice(parts.length - 1, 1);
  return parts.join(separator);
}

function getPackageString(clazz) {
  return getPackage(clazz, '.');
}

function getPackagePath(clazz) {
  return getPackage(clazz, '/');
}

function getClassName(clazz) {
   var parts = clazz.split('.');
   return parts[parts.length - 1];
}

var RestcontrollerGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the restcontroller subgenerator with the argument ' + this.name + '.');
  },
  askFor: function () {
    var done = this.async();
  	var prompts = [
      {
        type: 'string',
        name: 'domainClass',
        message: 'What domain class would you like to use?',
        default: 'com.acme.domain.MyClass'
      },
      {
        type: 'string',
        name: 'endpoint',
        message: 'What is the REST endpoint you would like to create?',
        default: '/api/foo'
      },
      {
        type: 'confirm',
        name: 'createRepo',
        message: 'Would you like to create a repository to interface with a database?',
        default: false
      },
      {
        type: 'rawlist',
        name: 'repositoryType',
        message: 'Select the type of repository you would like to create.',
        choices: [
          {
            name: 'CrudRepository',
            value: 'CrudRepository'
          },
          {
            name: 'PagingAndSortingRepository',
            value: 'PagingAndSortingRepository'
          },
          {
            name: 'JpaRepository',
            value: 'JpaRepository'
          },
          {
            name: 'MongoRepository',
            value: 'MongoRepository'
          }
        ],
        when: function(answers) {
          return answers.createRepo;
        }
      },
      {
        type: 'string',
        name: 'idType',
        message: 'Enter the Java type for the ID in the domain class.',
        default: 'Long',
        when: function(answers) {
          return answers.createRepo;
        }
      }
    ];
    this.prompt(prompts, function (props) {
      this.domainClassName = getClassName(props.domainClass);
      this.domainClass = props.domainClass;
      this.controllerClassName = getClassName(this.name);
      this.controllerPackage = getPackageString(this.name);
      this.endpoint = props.endpoint;
      this.createRepo = props.createRepo;
      this.repositoryType = props.repositoryType;
      this.idType = props.idType;
      this.repoClassName = this.domainClassName + 'Repo';
      done();
    }.bind(this));
  },

  files: function () {
    console.log('Name: ' + this.name);
    var controllerPath = 'src/main/java/' + getPackagePath(this.name);
    console.log('Controller Path: ' + controllerPath);
    this.mkdir(controllerPath);
    this.copy('_Controller.java', controllerPath + '/' + this.controllerClassName + '.java');
    if(this.createRepo) {
      this.copy('_Repo.java', controllerPath + '/' + this.repoClassName + '.java');
    }
    //this.copy('somefile.js', 'somefile.js');
  }
});

module.exports = RestcontrollerGenerator;