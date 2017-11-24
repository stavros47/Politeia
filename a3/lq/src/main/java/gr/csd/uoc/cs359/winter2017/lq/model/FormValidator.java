/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Stavr
 */
public class FormValidator {

    private HashMap<String, String> fieldRegexMap = new HashMap<>();

    public FormValidator() {

        this.fieldRegexMap.put("username", ".{8,}");
        this.fieldRegexMap.put("email", "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)");
        this.fieldRegexMap.put("password", "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,10}$");
        this.fieldRegexMap.put("confirmPassword", "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,10}$");
        this.fieldRegexMap.put("firstname", ".{1,20}");
        this.fieldRegexMap.put("lastname", ".{4,20}");
//      this.fieldRegexMap.put("DOB", "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$\\");

        this.fieldRegexMap.put("city", ".{2,20}");
        this.fieldRegexMap.put("address", ".{2,20}");
        this.fieldRegexMap.put("profession", ".{2,20}");
        this.fieldRegexMap.put("interests", ".{,100}");
        this.fieldRegexMap.put("moreinfo", ".{,500}");
    }

    public ArrayList<String> Validate(HttpServletRequest request) {
        ArrayList<String> invalidFields = new ArrayList<>();

        try {
            //Get all parameters from the request and validate them key:parametername value:regex
            for (Map.Entry<String, String> entry : this.fieldRegexMap.entrySet()) {
                if (request.getParameter(entry.getKey()) != null) {
                    if (!(request.getParameter(entry.getKey()).matches(entry.getValue()))) {
                        invalidFields.add(entry.getKey());
                    }
                }

            }
        } catch (Exception e) {
        }


        return invalidFields;
    }
}
