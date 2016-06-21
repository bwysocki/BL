package pl.stalostech.configuration.service;

import java.util.Arrays;
import java.util.List;

import javax.ejb.Stateless;

import org.dozer.DozerBeanMapper;

@Stateless
public class DozerMapper {
	
	public DozerBeanMapper getDozerMapper() {
		List<String> mappingFiles = Arrays.asList("dozer-mappings.xml");
		DozerBeanMapper mapper = new DozerBeanMapper();
		mapper.setMappingFiles(mappingFiles);
		return mapper;
	}
	
}
