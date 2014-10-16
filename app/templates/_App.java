package <%= packageName %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class App implements EmbeddedServletContainerCustomizer {

  public static void main(String[] args) throws Exception {
      SpringApplication.run(App.class, args);
  }

  @Override
  public void customize(ConfigurableEmbeddedServletContainer container) {
    //Enabled UTF-8 as the default character encoding for static HTML resources.
    //If you would like to disable this comment out the 3 lines below or change
    //the encoding to whatever you would like.
    MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
    mappings.add("html", "text/html;charset=utf-8");
    container.setMimeMappings(mappings );
  }
}