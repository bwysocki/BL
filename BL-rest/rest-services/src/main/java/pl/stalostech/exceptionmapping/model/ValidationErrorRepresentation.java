package pl.stalostech.exceptionmapping.model;

import java.net.URI;
import java.util.Collection;
import java.util.Collections;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Specific error for signalling validation problems.
 */
@XmlRootElement
public class ValidationErrorRepresentation extends ErrorRepresentation {

	private Collection<Violation> violations;

	public ValidationErrorRepresentation(URI type, String message, Collection<Violation> violations) {
		super(type, message);
		this.violations = violations;
	}

	public Collection<Violation> getViolations() {
		return Collections.unmodifiableCollection(violations);
	}

	/**
	 * Representing a single violation.
	 */
	public static class Violation {
		private String message;
		private String invalidValue;
		private String validationPath;

		public Violation(String message, String invalidValue, String validationPath) {
			this.message = message;
			this.invalidValue = invalidValue;
			this.validationPath = validationPath;
		}

		public String getMessage() {
			return message;
		}

		public String getInvalidValue() {
			return invalidValue;
		}

		public String getValidationPath() {
			return validationPath;
		}
	}

}
