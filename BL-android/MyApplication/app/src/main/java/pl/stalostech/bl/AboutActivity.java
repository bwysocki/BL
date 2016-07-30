package pl.stalostech.bl;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class AboutActivity extends AppCompatActivity {

    public static final String VERSION_EXTRA = "VERSION_EXTRA";

    public void recommendProject(View view){
        Intent sendIntent = new Intent(Intent.ACTION_SEND);
        sendIntent.setType("text/plain");
        sendIntent.putExtra(Intent.EXTRA_TITLE, "BL project");
        sendIntent.putExtra(Intent.EXTRA_TEXT, "Recommend me descripton.");
        startActivity(sendIntent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.about);
        setVersionExtra();
    }

    private void setVersionExtra() {
        Intent aboutIntent = getIntent();
        TextView version = (TextView) findViewById(R.id.version);
        version.setText(aboutIntent.getStringExtra(VERSION_EXTRA));
    }
}
