package pl.stalostech.bl;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.CheckBox;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import io.apptik.widget.MultiSlider;
import pl.stalostech.bl.rest.BLRestApi;
import pl.stalostech.bl.rest.ConfigurationModel;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    public static final int COLOR_REQ = 1;
    public static final String INIT_COLOR = "INIT_COLOR";

    private BLRestApi service;
    private TextView color;
    private MultiSlider fps;
    private TextView fpsValue;
    private MultiSlider threshold;
    private TextView thresholdValue;
    private Spinner model;
    private CheckBox thresholdEnabled;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        bindElements();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.1.112:7001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        service = retrofit.create(BLRestApi.class);

        if (savedInstanceState != null) {
            restoreConfigurationState(savedInstanceState);
        } else {
            Call<ConfigurationModel> r = service.getConfiguration();

            r.enqueue(new Callback<ConfigurationModel>() {
                @Override
                public void onResponse(Call<ConfigurationModel> call, Response<ConfigurationModel> response) {
                    transformModelToViewElements(response.body());
                }
                @Override
                public void onFailure(Call<ConfigurationModel> call, Throwable t) {
                    Log.e("GET CONF", t.getMessage(), t);
                }
            });
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case (COLOR_REQ): {
                if (resultCode == Activity.RESULT_OK) {
                    int colorInt = data.getIntExtra(ColorActivity.COLOR_IDENTIFIER, 0);
                    color.setBackgroundColor(colorInt);
                }
                break;
            }
        }
    }

    public void updateConfiguration(View view) {

        final Toast confirmation = Toast.makeText(this, R.string.your_configuration_has_bee_updated, Toast.LENGTH_SHORT);
        confirmation.setGravity(Gravity.CENTER_VERTICAL, 0, 0);

        Call<Void> r = service.putConfiguration(transformViewElementsToModel());
        r.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                confirmation.show();
            }
            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("SAVE CONF", t.getMessage(), t);
            }
        });
    }

    public void goToChangeColorActivity(View view) {
        Intent colorIntent = new Intent(this, ColorActivity.class);
        colorIntent.putExtra(INIT_COLOR, ((ColorDrawable) color.getBackground()).getColor());
        startActivityForResult(colorIntent, COLOR_REQ);
    }

    private void bindElements() {
        color = (TextView) this.findViewById(R.id.color);
        fps = (MultiSlider) this.findViewById(R.id.fps);
        fpsValue = (TextView) this.findViewById(R.id.fpsValue);
        threshold = (MultiSlider) this.findViewById(R.id.threshold);
        thresholdValue = (TextView) this.findViewById(R.id.thresholdValue);
        model = (Spinner) this.findViewById(R.id.model);
        thresholdEnabled = (CheckBox) this.findViewById(R.id.thresholdEnabled);

        listenForMultiSliderChanges(fps, fpsValue);
        listenForMultiSliderChanges(threshold, thresholdValue);
    }

    private void listenForMultiSliderChanges(MultiSlider multiSlider, final TextView textView) {
        multiSlider.setOnThumbValueChangeListener(new MultiSlider.OnThumbValueChangeListener() {
            @Override
            public void onValueChanged(MultiSlider multiSlider, MultiSlider.Thumb thumb, int thumbIndex, int value) {
                if (thumbIndex == 0) {
                    textView.setText(String.valueOf(value));
                }
            }
        });
    }

    private void transformModelToViewElements(ConfigurationModel configurationModel) {
        if (configurationModel != null) {
            color.setBackgroundColor(Color.parseColor(configurationModel.getColor()));
            fps.getThumb(0).setValue(configurationModel.getFps());
            fpsValue.setText(configurationModel.getFps().toString());
            threshold.getThumb(0).setValue(configurationModel.getThreshold());
            thresholdValue.setText(configurationModel.getThreshold().toString());
            model.setSelection(configurationModel.getModel().equals("CAR") ? 0 : 1);
            thresholdEnabled.setChecked(configurationModel.getThresholdChecked());
        }
    }

    private ConfigurationModel transformViewElementsToModel() {
        ConfigurationModel configurationModel = new ConfigurationModel();
        configurationModel.setColor(String.format("#%06X", 0xFFFFFF & ((ColorDrawable) color.getBackground()).getColor()));
        configurationModel.setFps(fps.getThumb(0).getValue());
        configurationModel.setThreshold(threshold.getThumb(0).getValue());
        configurationModel.setModel(((String)model.getSelectedItem()).toUpperCase());
        configurationModel.setThresholdChecked(thresholdEnabled.isChecked());
        return configurationModel;
    }

    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putInt("colorVal", ((ColorDrawable) color.getBackground()).getColor());
        savedInstanceState.putInt("fpsVal", fps.getThumb(0).getValue());
        savedInstanceState.putInt("thresholdVal", threshold.getThumb(0).getValue());
        savedInstanceState.putInt("modelVal", model.getSelectedItemPosition());
        savedInstanceState.putBoolean("thresholdCheckedVal", thresholdEnabled.isChecked());
    }

    private void restoreConfigurationState(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            color.setBackgroundColor(savedInstanceState.getInt("colorVal"));
            fps.getThumb(0).setValue(savedInstanceState.getInt("fpsVal"));
            fpsValue.setText(String.valueOf(savedInstanceState.getInt("fpsVal")));
            threshold.getThumb(0).setValue(savedInstanceState.getInt("thresholdVal"));
            thresholdValue.setText(String.valueOf(savedInstanceState.getInt("thresholdVal")));
            model.setSelection(savedInstanceState.getInt("modelVal"));
            thresholdEnabled.setChecked(savedInstanceState.getBoolean("thresholdCheckedVal"));
        }
    }

}
