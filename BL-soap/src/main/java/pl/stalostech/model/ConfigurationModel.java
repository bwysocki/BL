package pl.stalostech.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bl")
public class ConfigurationModel {

	@Id
	private String id;

	private int model;

	private int fps;

	private String logoColor;

	private int threshold;

	private boolean thresholdChecked;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getModel() {
		return model;
	}

	public void setModel(int model) {
		this.model = model;
	}

	public int getFps() {
		return fps;
	}

	public void setFps(int fps) {
		this.fps = fps;
	}

	public String getLogoColor() {
		return logoColor;
	}

	public void setLogoColor(String logoColor) {
		this.logoColor = logoColor;
	}

	public int getThreshold() {
		return threshold;
	}

	public void setThreshold(int threshold) {
		this.threshold = threshold;
	}

	public boolean isThresholdChecked() {
		return thresholdChecked;
	}

	public void setThresholdChecked(boolean thresholdChecked) {
		this.thresholdChecked = thresholdChecked;
	}

	@Override
	public String toString() {
		return "Configuration [id=" + id + ", model=" + model + ", fps=" + fps + ", logoColor=" + logoColor
				+ ", threshold=" + threshold + ", thresholdChecked=" + thresholdChecked + "]";
	}

}
