package com.iftm.centralanimal.services;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


public class ImageUploader {

    public static String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/central-animal.appspot.com/o/%s?alt=text";

    public static String uploadFile(String photo, String fileName) throws IOException {
        BlobId blobId = BlobId.of("central-animal.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();

        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream("/../../../resources/central-animal-private-key.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, photo.getBytes(StandardCharsets.UTF_8));

        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }
}
