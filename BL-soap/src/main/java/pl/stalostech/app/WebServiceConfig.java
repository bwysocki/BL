package pl.stalostech.app;

import java.util.List;

import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.config.annotation.WsConfigurerAdapter;
import org.springframework.ws.server.EndpointInterceptor;
import org.springframework.ws.soap.server.endpoint.interceptor.PayloadValidatingInterceptor;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

@EnableWs
@Configuration
public class WebServiceConfig extends WsConfigurerAdapter {
	
	@Override
	public void addInterceptors(List<EndpointInterceptor> interceptors) {
		interceptors.add(validationInterceptor());
	}
	
	@Bean
	public ServletRegistrationBean messageDispatcherServlet(ApplicationContext applicationContext) {
		MessageDispatcherServlet servlet = new MessageDispatcherServlet();
		servlet.setApplicationContext(applicationContext);
		servlet.setTransformWsdlLocations(true);
		return new ServletRegistrationBean(servlet, "/ws/*");
	}

	@Bean(name = "configuration")
	public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema schema) {
		DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
		wsdl11Definition.setPortTypeName("ConfigurationPort");
		wsdl11Definition.setLocationUri("/ws/configuration");
		wsdl11Definition.setTargetNamespace("http://stalostech.pl/autogenerated/xsd/model");
		wsdl11Definition.setSchema(schema);
		return wsdl11Definition;
	}

	@Bean
	public XsdSchema schema() {
		return new SimpleXsdSchema(new ClassPathResource("schema.xsd"));
	}

	@Bean
	public PayloadValidatingInterceptor validationInterceptor() {
		final PayloadValidatingInterceptor payloadValidatingInterceptor = new PayloadValidatingInterceptor();
		payloadValidatingInterceptor.setSchema(new ClassPathResource("schema.xsd"));
		payloadValidatingInterceptor.setValidateRequest(true);
		payloadValidatingInterceptor.setValidateResponse(false);
		payloadValidatingInterceptor.setFaultStringOrReason("Request doesn't meet xsd rules.");
		return payloadValidatingInterceptor;
	}

}