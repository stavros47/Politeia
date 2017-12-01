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
public class UserAccessor {

    public User RegisterUser(HttpServletRequest request) {
        User newUser = new User();
        newUser.setUserName(request.getParameter("username"));
        newUser.setEmail(request.getParameter("email"));
        newUser.setPassword(request.getParameter("password"));
        newUser.setFirstName(request.getParameter("firstname"));
        newUser.setLastName(request.getParameter("lastname"));
        newUser.setGender(request.getParameter("gender"));
        newUser.setBirthDate(request.getParameter("DOB"));
        newUser.setCountry(request.getParameter("country"));
        newUser.setTown(request.getParameter("city"));
        newUser.setOccupation(request.getParameter("profession"));

        String address = request.getParameter("address");
        String interests = request.getParameter("interests");
        String moreinfo = request.getParameter("moreinfo");
        if (address != null && !address.isEmpty()) {

            newUser.setAddress(address);
        }
        if (interests != null && !interests.isEmpty()) {

            newUser.setInterests(interests);
        }
        if (moreinfo != null && !moreinfo.isEmpty()) {
            newUser.setInfo(moreinfo);
        }


        try {

            UserDB.addUser(newUser);


        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserAccessor.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(UserAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }

        return newUser;
    }

    public User updateUserData(HttpServletRequest request, User updatedUser) {

        String email = request.getParameter("email-edit");
        String address = request.getParameter("address-edit");
        String interests = request.getParameter("interests-edit");
        String moreinfo = request.getParameter("moreInfo-edit");
        String password = request.getParameter("password-edit");
        String firstname = request.getParameter("firstname-edit");
        String lastname = request.getParameter("lastname-edit");
        String gender = request.getParameter("gender");
        String birthdate = request.getParameter("birthdate-edit");
        String country = request.getParameter("country");
        String town = request.getParameter("town-edit");
        String occupation = request.getParameter("occupation-edit");

        if (email != null && !email.isEmpty()) {
            updatedUser.setEmail(email);
        }
        if (password != null && !password.isEmpty()) {
            updatedUser.setPassword(password);
        }
        if (firstname != null && !firstname.isEmpty()) {
            updatedUser.setFirstName(firstname);
        }
        if (lastname != null && !lastname.isEmpty()) {
            updatedUser.setLastName(lastname);
        }
        if (gender != null && !gender.isEmpty()) {
            updatedUser.setGender(gender);
        }
        if (birthdate != null && !birthdate.isEmpty()) {
            updatedUser.setBirthDate(birthdate);
        }
        if (country != null && !country.isEmpty()) {
            updatedUser.setCountry(country);
        }
        if (town != null && !town.isEmpty()) {
            updatedUser.setTown(town);
        }
        if (occupation != null && !occupation.isEmpty()) {
            updatedUser.setOccupation(occupation);
        }

        if (address != null && !address.isEmpty()) {
            updatedUser.setAddress(address);
        }
        if (interests != null && !interests.isEmpty()) {

            updatedUser.setInterests(interests);
        }
        if (moreinfo != null && !moreinfo.isEmpty()) {
            updatedUser.setInfo(moreinfo);
        }

        try {
            UserDB.updateUser(updatedUser);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }

        return updatedUser;
    }

}
