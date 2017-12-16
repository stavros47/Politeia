/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import com.google.gson.Gson;
import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Stavr
 */
public class JsonResponse {

    public String userPageResponse(ArrayList < String > invalidFields, User currentUser, String status) {
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

    public static String initiativeResponse(ArrayList< String> invalidFields, List< Initiative> initiative, List< Initiative> activeInitiatives, List< Initiative> endedPollsList, User currentUser, String status) {
        String jsonResponseString = "";
        VoteAccessor voteAccessor = new VoteAccessor();
        HashMap<Integer, Integer> userVotesMap = voteAccessor.generateUsersVoteIndicationMap(currentUser);
        Gson gson = new Gson();

        String invalidFieldsResponse = "";
        //create json response
        String statusObject = "\"status\":\"" + status + "\"";

        if (invalidFields == null || invalidFields.isEmpty()) {
            if (initiative != null) {
                String userVoteMapArray = "\"userVotes\":" + gson.toJson(userVotesMap);
                String voteCountArray = "\"voteCount\":" + gson.toJson(voteAccessor.generateCountMap());
                String initiativeResult = "\"initiative\":" + gson.toJson(initiative);
                String endedInitiativeResult = "\"endedInitiatives\":" + gson.toJson(endedPollsList);
                String activeIni = "\"activeInitiatives\":" + gson.toJson(activeInitiatives);
                jsonResponseString = "{" + statusObject + "," + initiativeResult + "," + activeIni + "," + endedInitiativeResult + "," + voteCountArray + "," + userVoteMapArray + "" + "}";//","
                return jsonResponseString;
            }

        }
        invalidFieldsResponse = "\"fields\":" + gson.toJson(invalidFields) + "";
        jsonResponseString = "{" + statusObject + "," + invalidFieldsResponse + "}";


        return jsonResponseString;
    }
    
    public static String userInitiativeResponse(List< Initiative> UserActiveInitiatives,List< Initiative> UserEndedInitiatives , String status, String username) throws ClassNotFoundException {
        String jsonResponseString = "";
        VoteAccessor voteAccessor = new VoteAccessor();
        User user = UserDB.getUser(username);
        HashMap<Integer, Integer> userVotesMap = voteAccessor.generateUsersVoteIndicationMap(user);
        Gson gson = new Gson();

        
        //create json response
        String statusObject = "\"status\":\"" + status + "\"";

        
            
                String userVoteMapArray = "\"userVotes\":" + gson.toJson(userVotesMap);
                String voteCountArray = "\"voteCount\":" + gson.toJson(voteAccessor.generateCountMap());
                String activeInitiatives = "\"active initiatives\":" + gson.toJson(UserActiveInitiatives);
                String endedInitiatives = "\"ended initiatives\":" + gson.toJson(UserEndedInitiatives);
                jsonResponseString = "{" + statusObject + "," + activeInitiatives + "," + endedInitiatives+"," + voteCountArray + "," + userVoteMapArray + "" + "}";//","
                return jsonResponseString;
          
       
      
    }

    public String userPageResponseAll(ArrayList < String > invalidFields, List < User > allUsers, String status) {
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