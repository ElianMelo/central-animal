package com.iftm.centralanimal.services;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.iftm.centralanimal.models.interfaces.EntityWithImage;
import com.iftm.centralanimal.models.Animal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ImageUploader {

    public static String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/central-animal.appspot.com/o/%s?alt=media";

    public static String uploadFile(String photo, String fileName, String folderName, String credentials) throws IOException {
        if(photo != null) {
            if(!IsUrl(photo)) {
                InputStream streamCredentials = new ByteArrayInputStream(credentials.getBytes());
                BlobId blobId = BlobId.of("central-animal.appspot.com", folderName +"/" + fileName);
                BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();

                String base64Image = photo.split(",")[1];
                byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
                Credentials googleCredentials = ServiceAccountCredentials.fromStream(streamCredentials);

                Storage storage = StorageOptions.newBuilder().setCredentials(googleCredentials).build().getService();
                storage.create(blobInfo, imageBytes);
                return String.format(DOWNLOAD_URL, URLEncoder.encode(folderName + "/" + fileName, StandardCharsets.UTF_8));
            }
            return photo;
        }
        return null;
    }

    public static void setImage(EntityWithImage ent, boolean isUpdate, String currentFileName, String credentials) {
        boolean isAnimal = ent instanceof Animal;

        String folderName = isAnimal ? "animal" : "institution";
        String fileName = UUID.randomUUID().toString();

        try{
            if(isUpdate) {
                DeleteImage(currentFileName, folderName, credentials);
            }
            String url = uploadFile(ent.getImage(), fileName, folderName, credentials);
            ent.setImage(url);
        } catch (Exception ex) {
            ex.printStackTrace();
            ent.setImage(null);
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public static String ExtractImageNameFromUrl(String url, boolean isUpload) {
        String BASE_UUID_REGEX = "\\p{XDigit}{8}-\\p{XDigit}{4}-\\p{XDigit}{4}-\\p{XDigit}{4}-\\p{XDigit}{12}";
        String fileName = "";
        try {
            Pattern pairRegex = Pattern.compile(BASE_UUID_REGEX);
            Matcher matcher = pairRegex.matcher(url);
            while (matcher.find()) {
                fileName = matcher.group(0);
            }
            if(fileName == "" && isUpload) {
                fileName = UUID.randomUUID().toString();
            }
        } catch (Exception ex) {
            fileName = isUpload ? UUID.randomUUID().toString() : null;
            ex.printStackTrace();
        }
        return fileName;
    }

    public static void DeleteImage(String fileName, String folderName, String credentials) throws IOException {
        InputStream credentialsStream = new ByteArrayInputStream(credentials.getBytes());
        if(fileName != null) {
            String extractedFileName = ExtractImageNameFromUrl(fileName, false);
            BlobId blobId = BlobId.of("central-animal.appspot.com", folderName + "/" + extractedFileName);
            Credentials googleCredentials = GoogleCredentials.fromStream(credentialsStream);
            Storage storage = StorageOptions.newBuilder().setCredentials(googleCredentials).build().getService();
            storage.delete(blobId);
        }
    }

    public static boolean IsUrl(String urlString) {
        try {
            URL url = new URL(urlString);
            url.toURI();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
