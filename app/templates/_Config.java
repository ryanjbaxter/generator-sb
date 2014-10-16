package <%= packageName %>.config;

import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.cloud.config.java.ServiceScan;
<% if(mongoDBService) { %>
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;<% } %><% if(rabbitMQService) { %>
import com.rabbitmq.client.ConnectionFactory;<% } %><% if(redisService) { %>
import org.springframework.data.redis.connection.RedisConnectionFactory;<% } %><% if(dataSourceService) { %>
import javax.sql.DataSource;<% } %>

public class Config {
  
  @Configuration
  @Profile("cloud")
  @ServiceScan
  static class CloudConfiguration extends AbstractCloudConfig {
    // If you don't want to rely on @ServiceScan finding bound services and creating
    // the right beans you can uncomment the methods below.
    <% if(mongoDBService) { %>
    // @Bean
    // public MongoDbFactory mongoDbFactory() {
    //   return connectionFactory().mongoDbFactory();
    // }
    
    // @Bean
    // public MongoTemplate mongoTemplate() {
    //     return new MongoTemplate(mongoDbFactory());
    // }<% } %><% if(dataSourceService) { %>

    // @Bean
    // public DataSource dataSource() {
    //   return connectionFactory().dataSource();
    // }<% } %><% if(redisService) { %>

    // @Bean
    // public RedisConnectionFactory redisConnectionFactory() {
    //   return connectionFactory().redisConnectionFactory();
    // }<% } %><% if(rabbitMQService) { %>
      
    // @Bean
    // public ConnectionFactory rabbitConnectionFactory() {
    //   return connectionFactory().rabbitConnectionFactory();
    // }<% } %>
  }
}