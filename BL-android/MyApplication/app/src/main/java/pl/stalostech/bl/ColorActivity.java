package pl.stalostech.bl;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.larswerkman.holocolorpicker.ColorPicker;

public class ColorActivity extends AppCompatActivity {

    public static final String COLOR_IDENTIFIER = "COLOR_IDENTIFIER";
    private ColorPicker picker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.color);

        picker = (ColorPicker) findViewById(R.id.picker);
        initStartColor();
    }

    public void selectColor(View view) {
        Intent resultIntent = new Intent();
        resultIntent.putExtra(COLOR_IDENTIFIER, picker.getColor());
        setResult(Activity.RESULT_OK, resultIntent);
        finish();
    }

    private void initStartColor() {
        int colorInt = getIntent().getIntExtra(MainActivity.INIT_COLOR, 0);
        picker.setOldCenterColor(colorInt);
        picker.setColor(colorInt);
    }

}
