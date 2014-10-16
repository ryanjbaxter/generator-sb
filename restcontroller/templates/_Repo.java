package <%= controllerPackage %>;

import <%= domainClass %>;
<% if(repositoryType == 'MongoRepository') { %>
import org.springframework.data.mongodb.repository.MongoRepository;<% } %><% if(repositoryType == 'JpaRepository') { %>
import org.springframework.data.jpa.repository.JpaRepository;<% } %><% if(repositoryType == 'PagingAndSortingRepository') { %>
import org.springframework.data.repository.PagingAndSortingRepository;<% } %><% if(repositoryType == 'CrudRepository') { %>
import org.springframework.data.repository.CrudRepository;<% } %>

public interface <%= domainClassName%>Repo extends <%= repositoryType %><<%= domainClassName %>, <%= idType %>> {
  //You may add other methods here to create queries to execute on the repository
}