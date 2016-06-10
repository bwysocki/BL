package pl.stalostech.app;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.jms.Queue;
import javax.naming.NamingException;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.jndi.JNDIReferenceFactory;
import org.apache.activemq.network.jms.JndiLookupFactory;
import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;
import org.dozer.DozerBeanMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan("pl.stalostech")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean(name = "dozer")
	public DozerBeanMapper configDozer() throws IOException {
		List<String> mappingFiles = Arrays.asList("dozer-mappings.xml");
		DozerBeanMapper mapper = new DozerBeanMapper();
		mapper.setMappingFiles(mappingFiles);
		return mapper;
	}

	@Bean
	public TomcatEmbeddedServletContainerFactory tomcatFactory() {
		return new TomcatEmbeddedServletContainerFactory() {

			@Override
			protected TomcatEmbeddedServletContainer getTomcatEmbeddedServletContainer(Tomcat tomcat) {
				tomcat.enableNaming();
				return super.getTomcatEmbeddedServletContainer(tomcat);
			}

			@Override
			protected void postProcessContext(Context context) {
				context.getNamingResources().addResource(createConnectionFactory());
				context.getNamingResources().addResource(createQueue());
			}

			private ContextResource createConnectionFactory() {
				ContextResource cr = new ContextResource();
				cr.setDescription("Connection factory to ActiveMQ.");
				cr.setName("jms/ConnectionFactory");
				cr.setAuth("Container");
				cr.setType(ActiveMQConnectionFactory.class.getName());
				cr.setProperty("factory", JNDIReferenceFactory.class.getName());
				cr.setProperty("brokerURL", "tcp://localhost:61616");
				cr.setProperty("brokerName", "BLBroker");
				return cr;
			}

			private ContextResource createQueue() {
				ContextResource cr = new ContextResource();
				cr.setDescription("Queue in ActiveMQ.");
				cr.setName("jms/BLQueue");
				cr.setAuth("Container");
				cr.setType(ActiveMQQueue.class.getName());
				cr.setProperty("factory", JNDIReferenceFactory.class.getName());
				cr.setProperty("physicalName", "BLQueue");
				return cr;
			}

		};
	}

	@Bean
	public ActiveMQConnectionFactory jmsConnectionFactory() throws NamingException {
		return new JndiLookupFactory().lookup("java:comp/env/jms/ConnectionFactory", ActiveMQConnectionFactory.class);
	}
	
	@Bean
	public Queue dataSource() throws NamingException {
		return new JndiLookupFactory().lookup("java:comp/env/jms/BLQueue", ActiveMQQueue.class);
	}

}
