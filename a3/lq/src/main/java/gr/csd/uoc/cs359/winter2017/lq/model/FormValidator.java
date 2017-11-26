/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Stavr
 */
public class FormValidator {

    private HashMap<String, String> fieldRegexMap = new HashMap<>();
    private HashMap<String, String> optionalFieldRegexMap = new HashMap<>();
    private ArrayList<String> invalidFields = new ArrayList<>();

    public FormValidator() {

        this.fieldRegexMap.put("username", ".{8,}");
        this.fieldRegexMap.put("email", "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)");
        this.fieldRegexMap.put("password", "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
        this.fieldRegexMap.put("confirmPassword", "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
        this.fieldRegexMap.put("firstname", ".{1,20}");
        this.fieldRegexMap.put("lastname", ".{4,20}");
//      this.fieldRegexMap.put("DOB", "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$\\");
        this.fieldRegexMap.put("city", ".{2,20}");
        this.fieldRegexMap.put("profession", ".{2,20}");
        //This fields are not required - Can be empty
        this.optionalFieldRegexMap.put("address", ".{2,20}");
        this.optionalFieldRegexMap.put("interests", ".{,100}");
        this.optionalFieldRegexMap.put("moreinfo", ".{,500}");
    }

    public void ValidateRequired(HttpServletRequest request) {


        //Get all parameters from the request and validate them key:parametername value:regex
        for (Map.Entry<String, String> entry : this.fieldRegexMap.entrySet()) {
            if (request.getParameter(entry.getKey()) != null && (!request.getParameter(entry.getKey()).isEmpty())) {
                if (!(request.getParameter(entry.getKey()).matches(entry.getValue()))) {
                    this.invalidFields.add(entry.getKey());
                }
            } else {
                this.invalidFields.add("Empty" + entry.getKey());
            }
        }

    }

    //Same as validate, but it will not add anything to the invalid fields list if any of these fields are empty/do not exist
    public void ValidateOptional(HttpServletRequest request) {
        //Get all parameters from the request and validate them key:parametername value:regex
        for (Map.Entry<String, String> entry : this.optionalFieldRegexMap.entrySet()) {
            if (request.getParameter(entry.getKey()) != null && (!request.getParameter(entry.getKey()).isEmpty())) {
                if (!(request.getParameter(entry.getKey()).matches(entry.getValue()))) {
                    this.invalidFields.add(entry.getKey());
                }
            }
        }

    }

    public ArrayList<String> Validate(HttpServletRequest request) {
        ValidateOptional(request);
        ValidateRequired(request);


        return this.invalidFields;
    }
    // 0: username 1: email
    public ArrayList<String> checkDuplicate(String field, int flag) {

        try {
            if (flag == 0) {
                if (!UserDB.checkValidUserName(field)) {
                    this.invalidFields.add("Duplicateusername");
                }
            } else if (flag == 1) {
                if (!UserDB.checkValidEmail(field)) {
                    this.invalidFields.add("Duplicateemail");
                }
            }

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(FormValidator.class.getName()).log(Level.SEVERE, null, ex);
        }

        return this.invalidFields;
    }

}
