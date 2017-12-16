/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    private HashMap < String, String > fieldRegexMap = new HashMap < > ();
    private HashMap < String, String > updateFieldRegexMap = new HashMap < > ();
    private HashMap < String, String > optionalFieldRegexMap = new HashMap < > ();
    private ArrayList < String > invalidFields = new ArrayList < > ();

    public FormValidator() {
        //Registration Fields
        this.fieldRegexMap.put("username", ".{8,}");
        this.fieldRegexMap.put("email", "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)");
//        this.fieldRegexMap.put("password", "(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}");
//        this.fieldRegexMap.put("confirmPassword", "(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}");
        this.fieldRegexMap.put("firstname", ".{1,20}");
        this.fieldRegexMap.put("lastname", ".{4,20}");
        // this.fieldRegexMap.put("DOB", "(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)");
        this.fieldRegexMap.put("city", ".{2,20}");
        this.fieldRegexMap.put("profession", ".{2,20}");
        //These fields are not required - Can be empty
        this.optionalFieldRegexMap.put("address", ".{2,20}");
        this.optionalFieldRegexMap.put("interests", ".{0,100}");
        this.optionalFieldRegexMap.put("moreinfo", ".{0,500}");

        //Update Info fields
        this.updateFieldRegexMap.put("oldPassword-edit", "(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}");
        this.updateFieldRegexMap.put("password-edit", "(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}");
        this.updateFieldRegexMap.put("confirmPassword-edit", "(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}");
        this.updateFieldRegexMap.put("email-edit", "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)");
        this.updateFieldRegexMap.put("firstname-edit", ".{1,20}");
        this.updateFieldRegexMap.put("lastname-edit", ".{4,20}");
        // this.updateFieldRegexMap.put("DOB", "(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)");
        this.updateFieldRegexMap.put("town-edit", ".{2,20}");
        this.updateFieldRegexMap.put("occupation-edit", ".{2,20}");
        this.updateFieldRegexMap.put("address-edit", ".{2,20}");
        this.updateFieldRegexMap.put("interests-edit", ".{0,100}");
        this.updateFieldRegexMap.put("moreInfo-edit", ".{0,500}");

    }

    public void ValidateRequired(HttpServletRequest request) {
        //Get all parameters from the request and validate them key:parametername value:regex
        for (Map.Entry < String, String > entry: this.fieldRegexMap.entrySet()) {
            //Check if the parameter exists
            if (request.getParameter(entry.getKey()) != null && (!request.getParameter(entry.getKey()).isEmpty())) {
                //Patern to check gets added in the Pattern object

                if (!request.getParameter(entry.getKey()).matches(entry.getValue())) {
                    this.invalidFields.add(entry.getKey());
                }
            } else { // We need to indicate that the field is Empty
                this.invalidFields.add("Empty" + entry.getKey());
            }
        }

    }

    //Same as validate, but it will not add anything to the invalid fields list if any of these fields are empty/do not exist
    public void ValidateOptional(HttpServletRequest request) {

        //Get all parameters from the request and validate them key:parametername value:regex
        for (Map.Entry < String, String > entry: this.optionalFieldRegexMap.entrySet()) {
            //Check if the parameter exists
            if (request.getParameter(entry.getKey()) != null && (!request.getParameter(entry.getKey()).isEmpty())) {
                //Patern to check gets added in the Pattern object

                //check if the patter does not match the regular expression and if not then add the fields name to the arraylist
                if (!request.getParameter(entry.getKey()).matches(entry.getValue())) {
                    this.invalidFields.add(entry.getKey());
                }
            }
        }

    }

    public ArrayList < String > Validate(HttpServletRequest request) {
        ValidateOptional(request);
        ValidateRequired(request);

        return this.invalidFields;
    }

    public ArrayList < String > ValidateLogin(HttpServletRequest request) {
        String username = (String) request.getParameter("lgnUsername");
        String password = (String) request.getParameter("lgnPassword");
        String usernameRegex = ".{8,}";
        String passwordRegex = "(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}";

        if (username != null && !username.isEmpty()) {
            if (!username.matches(usernameRegex)) {
                this.invalidFields.add("lgnUsername");
            }
        } else {
            this.invalidFields.add("EmptylgnUsername");
        }

        if (password == null || password.isEmpty()) {
            this.invalidFields.add("EmptylgnPassword");
        }


        return this.invalidFields;
    }

    // 0: username 1: email
    public ArrayList < String > checkDuplicate(String field, int flag, String name) {

        try {
            if (flag == 0) {
                if (!UserDB.checkValidUserName(field)) {
                    this.invalidFields.add("Duplicate" + name);
                }
            } else if (flag == 1) {
                if (!UserDB.checkValidEmail(field)) {
                    this.invalidFields.add("Duplicate" + name);
                }
            }

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(FormValidator.class.getName()).log(Level.SEVERE, null, ex);
        }

        return this.invalidFields;
    }

    public ArrayList < String > ValidateUpdatedFields(HttpServletRequest request) {
        //Get all parameters from the request and validate them key:parametername value:regex
        for (Map.Entry < String, String > entry: this.updateFieldRegexMap.entrySet()) {
            //Check if the parameter exists
            if (request.getParameter(entry.getKey()) != null && (!request.getParameter(entry.getKey()).isEmpty())) {
                //Patern to check gets added in the Pattern object

                //check if the patter does not match the regular expression and if not then add the fields name to the arraylist
                if (!request.getParameter(entry.getKey()).matches(entry.getValue())) {
                    this.invalidFields.add(entry.getKey());
                }
            }
        }
        return this.invalidFields;
    }

    /**
     *
     * @param request
     * @return
     * @throws java.text.ParseException
     */
    public ArrayList < String > ValidatePollFields(HttpServletRequest request) throws ParseException {
        Date today = new Date();
        String description = (String) request.getParameter("description-newPolicy");
        String category = (String) request.getParameter("category-newPolicy");
        String title = (String) request.getParameter("title-newPolicy");
        String expDate = (String) request.getParameter("expiration-newPolicy");
        String status = (String) request.getParameter("status-newPolicy");
        String time = (String) request.getParameter("expTime-newPolicy");
        String timeregex = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
        String dateTime = expDate + " " + time;
       
      
       if (status.equals("1")) {
            if (time==null){
                this.invalidFields.add("EmptyexpTime-newPolicy");
            }
            else{
                if (!time.matches(timeregex)){
                         time = null;
                    this.invalidFields.add("expTime-newPolicy");
                }    
            }
            if (expDate==null || expDate.trim().isEmpty()) {
                this.invalidFields.add("expiration-newPolicy");
            } else {
                 if (expDate.length()>10){
                    this.invalidFields.add("expiration-newPolicy");
                 }
                 else if (time!=null){
                    Date expiration = (Date) new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(dateTime);
                    if (expiration.getTime() < today.getTime()) {
                        this.invalidFields.add("badDateexpiration-newPolicy");
                    }
                }
            }
        }
        if (description == null || description.trim().isEmpty()) {
            this.invalidFields.add("Emptydescription-newPolicy");
        }
        if (category == null || category.trim().isEmpty()) {
            this.invalidFields.add("Emptycategory-newPolicy");
        }
        if (title == null || title.trim().isEmpty()) {
            this.invalidFields.add("Emptytitle-newPolicy");
        }
      
        return this.invalidFields;
    }


    public ArrayList < String > ValidatePollEditFields(HttpServletRequest request) throws ParseException {
        Date today = new Date();
        String time = (String) request.getParameter("expTime-editPolicy");
        String status = (String) request.getParameter("status-editPolicy");
        String expDate = (String) request.getParameter("expiration-editPolicy");
        String timeregex = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
        String dateTime = expDate + " " + time;
        
        if (status.equals("1")) {
            if (time==null){
                this.invalidFields.add("EmptyexpTime-editPolicy");
            }
            else{
                if (!time.matches(timeregex)){
                         time = null;
                    this.invalidFields.add("expTime-editPolicy");
                }    
            }
            if (expDate==null || expDate.trim().isEmpty()) {
                this.invalidFields.add("expiration-editPolicy");
            } else {
                 if (expDate.length()>10){
                    this.invalidFields.add("expiration-editPolicy");
                 }
                 else if (time!=null){
                    Date expiration = (Date) new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(dateTime);
                    if (expiration.getTime() < today.getTime()) {
                        this.invalidFields.add("badDateexpiration-editPolicy");
                    }
                }
            }
        }
       

        return this.invalidFields;
    }

}