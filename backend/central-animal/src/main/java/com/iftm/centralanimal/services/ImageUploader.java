package com.iftm.centralanimal.services;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;


public class ImageUploader {

    public static String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/central-animal.appspot.com/o/%s?alt=media";

    public static String uploadFile(String photo, String fileName) throws IOException {
        BlobId blobId = BlobId.of("central-animal.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("central-animal-private-key.json");

        Credentials credentials = GoogleCredentials.fromStream(is);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, photo.getBytes(StandardCharsets.UTF_8));

        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }
}
