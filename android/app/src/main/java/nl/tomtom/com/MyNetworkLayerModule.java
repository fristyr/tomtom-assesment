package nl.tomtom.com;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MyNetworkLayerModule extends ReactContextBaseJavaModule {
    private final OkHttpClient client = new OkHttpClient();



    public MyNetworkLayerModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MyNetworkLayerModule";
    }

    @ReactMethod
    public void get(String url, Promise promise) {
        try {
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            try (Response response = client.newCall(request).execute()) {
                promise.resolve( response.body().string());
            }
        } catch(Exception e) {
            promise.reject(e);
        }
    }
}