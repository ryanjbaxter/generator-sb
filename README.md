# generator-sb - Spring Boot [Yeoman](http://yeoman.io) Generator

## About
Scaffolds a basic Spring Boot app.  It is similar
to [start.spring.io](http://start.spring.io) but has some extra features and functionality.

* If you select the Spring Data JPA starter dependency it will give you the 
option to include a dependency for an in memory database as well.
* It creates a Maven profile you can use to run the application.  Simply run
```$ mvn -P run``` to start the application.
* It includes a sub-generator to scaffold out rest APIs and database repositories.
* If you are going to deploy the application to Cloud Foundry it has several other
additional benefits.
    * It includes the 
    [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/) 
    dependencies which you can use to help access services bound to your application.
    * If you include the Spring Cloud Connectors dependencies it will also create a
    configuration class which extends AbstractCloudConfig for your application.
    * It will include the 
    [Cloud Foundry Maven Plugin](https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-maven-plugin) 
    in your POM file and setup a
    Maven profile using this plugin to deploy your Spring Boot app to Cloud Foundry.
    Deploying your Spring Boot app is as simple as ```mvn -P deploy```.


## Getting Started

Install Yeoman (you will need NPM installed)

```
$ npm install -g yo
```

Clone this Git repo

```
$ git clone https://github.com/ryanjbaxter/generator-sb
```

Link the Yoeman generator

```
$ cd generator-sb
$ npm install
$ npm link
```

Once linked you should now be able to run the generator from anywhere on your command line,
just run

```
$ yo sb
```

## Adding A REST API
This generator can also scaffold out a basic CRUD REST API for domain objects within
your application.
As an optional part of scaffolding out the REST API you can also generate a Spring
Data Repository interface if your REST API will be interfacing with data from a database.
To use this sub-generator you need to have previously created the domain object you want to
create a CRUD API for.

To run the sub-generator just run

```
$ yo sb:restcontroller <complete package name of rest controller class>
```

For example

```
$ yo sb:restcontroller com.acme.AnvilRestController
```

# Limitations

Currently this generator will only generate a Spring Boot Maven project, there is no
support for Gradle at this time.

# License

This code is licensed under Apache v2. See the LICENSE file in the root of the repository.

# Dependencies

For a list of 3rd party dependencies that are used see the package.json file in the root of the repository.