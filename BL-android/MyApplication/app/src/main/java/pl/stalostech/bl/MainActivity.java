package pl.stalostech.bl;

import android.content.Intent;
import android.os.Handler;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private static final String VERSION = "1.0";

    public void updateConfiguration(View view) {
        Toast confirmation = Toast.makeText(this, R.string.your_configuration_has_bee_updated, Toast.LENGTH_SHORT);
        confirmation.setGravity(Gravity.CENTER_VERTICAL, 0, 0);
        confirmation.show();
    }

    public void goToAboutActivity(View view) {
        Intent aboutIntent = new Intent(this, AboutActivity.class);
        aboutIntent.putExtra(AboutActivity.VERSION_EXTRA, VERSION);
        startActivity(aboutIntent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        restoreConfigurationState(savedInstanceState);
        watchConfiguration();
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    public void onSaveInstanceState(Bundle savedInstanceState) {
        System.out.print("save current (not saved) configuration");
        savedInstanceState.putString("A", "B");
    }

    private void restoreConfigurationState(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            System.out.println(savedInstanceState.getString("A"));
        }
    }

    private void watchConfiguration() {
        final Handler handler = new Handler();
        handler.post(new Runnable() {
            @Override
            public void run() {
                System.out.println("Get configuration check;");
                handler.postDelayed(this, 3000);
            }
        });
    }

}
