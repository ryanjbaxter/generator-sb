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
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var SbGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        //this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    // this.log(this.yeoman);
    this.log(chalk.green('\n'+                                                                                                                                                                       
"   _____            _                ____              __ "+"\n"+
"  / ___/____  _____(_____  ____ _   / __ )____  ____  / /_"+"\n"+
"  \\__ \\/ __ \\/ ___/ / __ \\/ __ `/  / __  / __ \\/ __ \\/ __/"+"\n"+
" ___/ / /_/ / /  / / / / / /_/ /  / /_/ / /_/ / /_/ / /_  "+"\n"+
"/____/ .___/_/  /_/_/ /_/\\__, /  /_____/\\____/\\____/\\__/  "+"\n"+
"    /_/                 /____/                            "));

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Scaffolds your Spring Boot application.'));

    var prompts = [
      {
        type: 'string',
        name: 'appName',
        message: 'What would you like to call this app?',
        default: 'my-app'
      },
      {
        type: 'string',
        name: 'springBootVersion',
        message: 'What version of Spring Boot would you like to use?',
        default: '1.1.8.RELEASE'
      },
      {
        type: 'string',
        name: 'packageName',
        message: 'What package name would you like to use for your app?',
        default: 'com.acme'
      },
      {
        type: 'checkbox',
        name: 'starters',
        message: 'Select which application starters you would like to use.',
        choices: [
          {
            name: 'Jetty (Tomcat will be uninstalled)',
            value: 'jetty'
          },
          {
            name: 'Actuator - Adds production ready features such as metrics and monitoring.',
            value: 'actuator'
          },
          {
            name: 'AOP - Support for aspect-oriented programming including spring-aop and AspectJ.',
            value: 'aop'
          },
          {
            name: 'Batch - Support for “Spring Batch” including HSQLDB database.',
            value: 'batch'
          },
          {
            name: 'JPA - Support for the “Java Persistence API” including spring-data-jpa, spring-orm and Hibernate.',
            value: 'jpa'
          },
          {
            name: 'Integration - Support for common spring-integration modules.',
            value: 'integration'
          },
          {
            name: 'JDBC - JDBC Database support.',
            value: 'jdbc'
          },
          {
            name: 'Security - Support for spring-security.',
            value: 'security'
          },
          {
            name: 'Facebook - Support for spring-social-facebook.',
            value: 'facebook'
          },
          {
            name: 'LinkedIn - Support for spring-social-linkedin.',
            value: 'linkedin'
          },
          {
            name: 'Twitter - Support for spring-social-twitter.',
            value: 'twitter'
          },
          {
            name: 'Websocket - Support for websocket development with Tomcat.',
            value: 'websocket'
          },
          {
            name: 'AMQP - Support for the “Advanced Message Queuing Protocol” via spring-rabbit.',
            value: 'amqp'
          },
          {
            name: 'MongoDB - Support for the MongoDB NoSQL Database, including spring-data-mongodb.',
            value: 'mongodb'
          },
          {
            name: 'Data-REST - Support for exposing Spring Data repositories over REST via spring-data-rest-webmvc.',
            value: 'rest'
          },
          {
            name: 'Mobile - Support for spring-mobile.',
            value: 'mobile'
          },
          {
            name: 'Redis - Support for the REDIS key-value data store, including spring-redis.',
            value: 'redis'
          },
          {
            name: 'Test - Support for common test dependencies, including JUnit, Hamcrest and Mockito along with the spring-test module.',
            value: 'test'
          },
          {
            name: 'Thymeleaf - Support for the Thymeleaf templating engine, including integration with Spring.',
            value: 'thymeleaf'
          },
          {
            name: 'Velocity - Support for the Velocity templating engine.',
            value: 'velocity'
          },
          {
            name: 'Web - Support for full-stack web development, including Tomcat and spring-webmvc.',
            value: 'web'
          },
          {
            name: 'Remote Shell - Adds remote ssh shell support.',
            value: 'shell'
          },
          {
            name: 'Log4j - Support the Log4J logging framework.',
            value: 'log4j'
          },
          {
            name: 'Elastic Search - Support for the Elasticsearch search and analytics engine including spring-data-elasticsearch.',
            value: 'search'
          },
          {
            name: 'GemFire - Support for the GemFire distributed data store including spring-data-gemfire.',
            value: 'gemfire'
          },
          {
            name: 'Solr - Support for the Apache Solr search platform, including spring-data-solr.',
            value: 'solr'
          },
          {
            name: 'FreeMaker - Support for the FreeMarker templating engine.',
            value: 'freemaker'
          },
          {
            name: 'Groovy Templating - Support for the Groovy templating engine.',
            value: 'groovytemplating'
          },
          {
            name: 'Hornetq - Support for “Java Message Service API” via HornetQ.',
            value: 'hornetq'
          },
          {
            name: 'Web Services - Support for Spring Web Services.',
            value: 'webservices'
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'inMemoryDB',
        message: 'Select the in-memory DB you want to use for development.',
        when: function(answers) {
          return answers.starters.indexOf('jpa') !== -1;
        },
        choices: [
          {
            name: 'H2',
            value: 'h2'
          },
          {
            name: 'HSQL',
            value: 'hsql'
          },
          {
            name: 'Derby',
            value: 'derby'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'cfDeployment',
        message: 'Do you want to deploy this app to Cloud Foundry?',
        default: false
      },
      {
        type: 'confirm',
        name: 'springCloud',
        message: 'Do you want to add the Spring Cloud Connectors to your app?',
        default: false,
        when: function(answers) {
          return answers.cfDeployment;
        }
      },
      {
        type: 'string',
        name: 'springCloudVersion',
        message: 'Which version of Spring Cloud would you like to use?',
        default: '1.1.0.RELEASE',
        when: function(answers) {
          return answers.springCloud;
        }
      },
      {
        type: 'checkbox',
        name: 'services',
        message: 'Select which cloud services you would like to configure.',
        when: function(answers) {
          return answers.springCloud;
        },
        choices: [
          {
            name: 'Data Source',
            value: 'dataSource'
          },
          {
            name: 'Mongo DB',
            value: 'mongodb'
          },
          {
            name: 'Redis',
            value: 'redis'
          },
          {
            name: 'Rabbit MQ',
            value: 'rabbitmq'
          }
        ]
      },
      {
        type: 'string',
        name: 'rabbitMQClientVersion',
        message: 'Which Rabbit MQ Client version would you like to use?',
        default: '3.0.3',
        when: function(answers) {
          return answers.springCloud && answers.services.indexOf('rabbitmq') !== -1;
        }
      },
      {
        type: 'confirm',
        name: 'mysqlDriver',
        message: 'Would you like to add the MySQL driver dependency for the cloud data source?',
        default: false,
        when: function(answers) {
          return answers.springCloud && answers.services.indexOf('dataSource') !== -1;
        }
      },
      {
        type: 'confirm',
        name: 'postgresDriver',
        message: 'Would you like to add the PostgreSQL driver dependency for the cloud data source?',
        default: false,
        when: function(answers) {
          return answers.springCloud && answers.services.indexOf('dataSource') !== -1  && !answers.mysqlDriver;
        }
      },
      {
        type: 'confirm',
        name: 'cloudMvnProfile',
        message: 'Would you like to add a Maven Profile to deploy your app to Cloud Foundry?',
        default: false,
        when: function(answers) {
          return answers.springCloud;
        }
      },
      {
        type: 'string',
        name: 'cfApi',
        message: 'What is the API endpoint of your Cloud Foundry installation?',
        default: 'https://api.cf.com',
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      },
      {
        type: 'confirm',
        name: 'embedCFCreds',
        message: 'Do you want to include your Cloud Foundry credentials in your POM?  If not you need to setup your server in your settings.xml, see https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-maven-plugin.',
        default: false,
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      },
      {
        type: 'string',
        name: 'cfServer',
        message: 'What is the Cloud Foundry server name you have configured in your settings.xml?',
        default: 'cfserver',
        when: function(answers) {
          return answers.cloudMvnProfile && !answers.embedCFCreds;
        }
      },
      {
        type: 'string',
        name: 'cfUserName',
        message: 'What user name do you use to log into your Cloud Foundry installation?',
        default: 'user@example.com',
        when: function(answers) {
          return answers.cloudMvnProfile && answers.embedCFCreds;
        }
      },
      {
        type: 'password',
        name: 'cfPassword',
        message: 'What password do you use to log into your Cloud Foundry installation?',
        default: 'mysecret',
        when: function(answers) {
          return answers.cloudMvnProfile && answers.embedCFCreds;
        }
      },
      {
        type: 'string',
        name: 'cfOrg',
        message: 'What organization do you want to deploy the app to?',
        default: 'myOrg',
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      },
      {
        type: 'string',
        name: 'cfSpace',
        message: 'What space do you want to deploy the app to?',
        default: 'mySpace',
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      },
      {
        type: 'string',
        name: 'cfInstances',
        message: 'How many instances do you want to deploy?',
        default: '1',
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      },
      {
        type: 'string',
        name: 'cfMemory',
        message: 'How much memory would you like to give each instance?',
        default: '512',
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      },
      {
        type: 'string',
        name: 'cfUrl',
        message: 'Which URL would you like to use for this app?',
        default: 'myapp.cf.com',
        when: function(answers) {
          return answers.cloudMvnProfile;
        }
      }
    ];

    this.prompt(prompts, function (props) {
      this.springBootVersion = props.springBootVersion;
      this.packageName = props.packageName;
      this.springCloud = props.springCloud;
      this.appName = props.appName;
      this.springCloudVersion = props.springCloudVersion;
      this.cloudMvnProfile = props.cloudMvnProfile;
      this.cfApi = props.cfApi;
      this.cfUserName = props.cfUserName;
      this.cfPassword = props.cfPassword;
      this.cfOrg = props.cfOrg;
      this.cfSpace = props.cfSpace;
      this.cfInstances = props.cfInstances;
      this.cfMemory = props.cfMemory;
      this.cfUrl = props.cfUrl;
      this.embedCFCreds = props.embedCFCreds;
      this.cfServer = props.cfServer;

      var hasStarter = function (starter) { return props.starters.indexOf(starter) !== -1; };
      this.jetty = hasStarter('jetty');
      this.actuator = hasStarter('actuator');
      this.aop = hasStarter('aop');
      this.batch = hasStarter('batch');
      this.jpa = hasStarter('jpa');
      this.integration = hasStarter('integration');
      this.jdbc = hasStarter('jdbc');
      this.security = hasStarter('security');
      this.websocket = hasStarter('websocket');
      this.amqp = hasStarter('amqp');
      this.mongodb = hasStarter('mongodb');
      this.rest = hasStarter('rest');
      this.mobile = hasStarter('mobile');
      this.redis = hasStarter('redis');
      this.test = hasStarter('test');
      this.thymeleaf = hasStarter('thymeleaf');
      this.web = hasStarter('web');
      this.shell = hasStarter('shell');
      this.log4j = hasStarter('log4j');
      this.elasticSearch = hasStarter('search');
      this.gemFire = hasStarter('gemFire');
      this.solr = hasStarter('solr');
      this.freeMaker = hasStarter('freemaker');
      this.groovyTemplates = hasStarter('groovytemplating');
      this.hornetq = hasStarter('hornetq');
      this.facebook = hasStarter('facebook');
      this.linkedin = hasStarter('linkedin');
      this.twitter = hasStarter('twitter');
      this.velocity = hasStarter('velocity');
      this.webServices = hasStarter('webservices');

      var hasService = function (service) { return props.services && props.services.indexOf(service) !== -1; };
      this.mongoDBService = hasService('mongodb');
      this.dataSourceService = hasService('dataSource');
      this.redisService = hasService('redis');
      this.rabbitMQService = hasService('rabbitmq');

      this.rabbitMQClientVersion = props.rabbitMQClientVersion;
      this.mysqlDriver = props.mysqlDriver;
      this.postgresDriver = props.postgresDriver;
      var hasDB = function(db) { return props.inMemoryDB && props.inMemoryDB.indexOf(db) !== -1; }
      this.h2 = hasDB('h2');
      this.hsql = hasDB('hsql');
      this.derby = hasDB('derby');

      done();
    }.bind(this));
  },

  app: function () {
    var packageFolder = 'src/main/java/' + this.packageName.replace(/\./g, '/');
    this.mkdir('src');
    this.mkdir('src/main');
    this.mkdir('src/main/java');
    this.mkdir('src/main/resources');
    this.mkdir('src/main/resources/static');
    this.mkdir('src/test');
    this.mkdir('src/test/java');
    this.mkdir(packageFolder);
    this.mkdir('src/test/resources');
    this.copy('_App.java', packageFolder + '/App.java');
    this.copy('_application.properties', 'src/main/resources/application.properties')

    if(this.springCloud) {
      this.copy('_Config.java', packageFolder + '/config' + '/Config.java');      
    }
  },

  projectfiles: function () {
    this.copy('.gitignore', '.gitignore');
    this.copy('_README.md', 'README.md');
    this.copy('_pom.xml', 'pom.xml');
    if(this.cloudMvnProfile) {
      this.copy('_manifest.yml', 'manifest.yml')
    }
  }
});

module.exports = SbGenerator;