/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Stavr
 */
public class JsonResponse {

    public String userPageResponse(ArrayList<String> invalidFields, User currentUser, String status) {
        String jsonResponseString = "";
        // Gson gson = new GsonBuilder().create();
        Gson gson = new Gson();

        String invalidFieldsResponse = "";
        //create json response
        String statusObject = "\"status\":\"" + status + "\"";

        if (invalidFields == null || invalidFields.isEmpty()) {
            if (currentUser != null) {
                String userResult = "\"user\":" + gson.toJson(currentUser);
                jsonResponseString = "{" + statusObject + "," + userResult + "}";
                return jsonResponseString;
            }

        }
            invalidFieldsResponse = "\"fields\":" + gson.toJson(invalidFields) + "";
            jsonResponseString = "{" + statusObject + "," + invalidFieldsResponse + "}";


        return jsonResponseString;
    }

    public String userPageResponseAll(ArrayList<String> invalidFields, List<User> allUsers, String status) {
        String jsonResponseString = "";
        // Gson gson = new GsonBuilder().create();
        Gson gson = new Gson();

        String invalidFieldsResponse = "";
        //create json response
        String statusObject = "\"status\":\"" + status + "\"";

        if (invalidFields == null || invalidFields.isEmpty()) {
            if (allUsers != null) {

                String userResult = "\"user\":" + gson.toJson(allUsers);
                jsonResponseString = "{" + statusObject + "," + userResult + "}";
            }

        } else {
            invalidFieldsResponse = "\"fields\":" + gson.toJson(invalidFields) + "";
            jsonResponseString = "{" + statusObject + "," + invalidFieldsResponse + "}";
        }

        return jsonResponseString;
    }

}
