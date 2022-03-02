package com.iftm.centralanimal.services;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;


public class ImageUploader {

    public static String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/central-animal.appspot.com/o/%s?alt=media";

    public static String uploadFile(String photo, String fileName, String folderName) throws IOException {
        if(photo != null){
            BlobId blobId = BlobId.of("central-animal.appspot.com", folderName +"/" + fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            InputStream is = classloader.getResourceAsStream("central-animal-private-key.json");

            String base64Image = photo.split(",")[1];
            byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

            Credentials credentials = GoogleCredentials.fromStream(is);
            Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
            storage.create(blobInfo, imageBytes);
            return String.format(DOWNLOAD_URL, URLEncoder.encode(folderName + "/" + fileName, StandardCharsets.UTF_8));
        }
        return null;
    }

    public static void setImage(Object obj) {
        boolean isAnimal = obj instanceof Animal;
        String fileName = UUID.randomUUID().toString();
        try{
            if(isAnimal) {
                Animal entity = (Animal) obj;
                String url = uploadFile(entity.getAnimalImage(), fileName, "animal");
                entity.setAnimalImage(url);
            } else {
                Institution entity = (Institution) obj;
                String url = uploadFile(entity.getInstitutionImage(), fileName, "institution");
                entity.setInstitutionImage(url);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
