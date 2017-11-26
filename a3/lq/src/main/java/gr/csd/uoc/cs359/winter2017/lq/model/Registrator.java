/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Stavr
 */
public class Registrator {

    public void RegisterUser(HttpServletRequest request) {
        User newUser = new User();
        newUser.setUserName(request.getParameter("username"));
        newUser.setEmail(request.getParameter("email"));
        newUser.setPassword(request.getParameter("password"));
        newUser.setFirstName(request.getParameter("firstname"));
        newUser.setLastName(request.getParameter("lastname"));
        newUser.setBirthDate(request.getParameter("DOB"));
        newUser.setTown(request.getParameter("city"));

        String address = request.getParameter("address");
        String interests = request.getParameter("interests");
        String moreinfo = request.getParameter("moreinfo");
        if (address != null) {
            newUser.setAddress(address);
        }
        if (interests != null) {
            newUser.setInterests(interests);
        }
        if (moreinfo != null) {
            newUser.setInfo(moreinfo);
        }


        try {
            UserDB.addUser(newUser);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Registrator.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
}
