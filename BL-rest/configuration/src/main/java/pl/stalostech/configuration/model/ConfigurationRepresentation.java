package pl.stalostech.configuration.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.xml.bind.annotation.XmlRootElement;

import io.swagger.annotations.ApiModel;

@XmlRootElement
@ApiModel(value="ConfigurationRepresentation", description="Represents configuration.")
public class ConfigurationRepresentation {

	@Pattern(regexp = "#[\\dA-F]{6}([\\dA-F][\\dA-F])?")
	private String color;

	@NotNull
	private ConfigurationModel model;

	@Min(5)
	@Max(45)
	private Integer fps;

	@Min(5)
	@Max(20)
	private Integer threshold;

	@NotNull
	private Boolean thresholdChecked;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public ConfigurationModel getModel() {
		return model;
	}

	public void setModel(ConfigurationModel model) {
		this.model = model;
	}

	public Integer getThreshold() {
		return threshold;
	}

	public void setThreshold(Integer threshold) {
		this.threshold = threshold;
	}

	public Boolean getThresholdChecked() {
		return thresholdChecked;
	}

	public void setThresholdChecked(Boolean thresholdChecked) {
		this.thresholdChecked = thresholdChecked;
	}

	public Integer getFps() {
		return fps;
	}

	public void setFps(Integer fps) {
		this.fps = fps;
	}

	@Override
	public String toString() {
		return "ConfigurationRepresentation [color=" + color + ", model=" + model + ", fps=" + fps + ", threshold="
				+ threshold + ", thresholdChecked=" + thresholdChecked + "]";
	}

}
