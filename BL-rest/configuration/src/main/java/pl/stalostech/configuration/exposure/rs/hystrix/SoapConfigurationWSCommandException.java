package pl.stalostech.configuration.exposure.rs.hystrix;

import javax.ejb.ApplicationException;

@ApplicationException(rollback=false)
public class SoapConfigurationWSCommandException extends RuntimeException{
	
	private static final long serialVersionUID = -6115008677030740989L;

	public SoapConfigurationWSCommandException(Exception e) {
		super(e);
	}
	
}
