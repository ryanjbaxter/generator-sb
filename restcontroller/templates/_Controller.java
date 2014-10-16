package <%= controllerPackage %>;

import <%= domainClass %>;

<% if(!createRepo) { %>import java.util.ArrayList; <% } %>
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("<%= endpoint %>")
public class <%= controllerClassName %> {
  <% if(createRepo) { %>
  @Autowired
  private <%= repoClassName %> repo;<% } %>
  
  @RequestMapping(value="{id}", method=RequestMethod.DELETE)
  public void delete(@PathVariable <%= idType %> id) {
    <% if(createRepo) { %>repo.delete(id);<% } %>
    <% if(!createRepo) { %>//TODO Implement me<% } %>
  }
  
  @RequestMapping(method=RequestMethod.POST)
  public <%= domainClassName %> create(@RequestBody <%= domainClassName %> domain) {
    <% if(createRepo) { %>return repo.save(domain);<% } %>
    <% if(!createRepo) { %>//TODO Implement me
    return null;<% } %>
  }
  
  @RequestMapping(value="{id}", method=RequestMethod.PUT)
  public <%= domainClassName %> update(@RequestBody <%= domainClassName %> domain, @PathVariable <%= idType %> id) {
    <% if(createRepo) { %><%= domainClassName %> update = repo.findOne(id);
    //TODO Implement logic to update object from DB
    return repo.save(update);<% } %>
    <% if(!createRepo) { %>//TODO Implement me
    return null;<% } %>
  }
  
  @RequestMapping(method=RequestMethod.GET)
  public List<<%= domainClassName %>> list() {
    <% if(createRepo) { %>return repo.findAll();<% } %>
    <% if(!createRepo) { %>return new ArrayList<<%= domainClassName %>>();<% } %>
  }
}