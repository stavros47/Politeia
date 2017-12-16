/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.Servlets;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import gr.csd.uoc.cs359.winter2017.lq.model.FormValidator;
import gr.csd.uoc.cs359.winter2017.lq.model.JsonResponse;
import gr.csd.uoc.cs359.winter2017.lq.model.User;
import gr.csd.uoc.cs359.winter2017.lq.model.UserAccessor;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Stavr
 */

@WebServlet(name = "userServlet", urlPatterns = {"/userServlet"})
@MultipartConfig
public class userServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            User currentUser = (User) request.getSession(true).getAttribute("user");
         
            ArrayList<String> invalidFields = null;
            JsonResponse responder = new JsonResponse();
            String status = "";
            String jsonResponse = "";
            FormValidator validator = new FormValidator();
         

            if (request.getParameter("button") != null) {
              
                String button = (String) request.getParameter("button");

                if (button.equals("edit")) {
                    status = "Edit_user";
                    response.setStatus(200);

                } else if (button.equals("update")) {
                    //Check fields and respond accordingly
                     invalidFields = validator.ValidateUpdatedFields(request);

                    //check for not matching passwords
                    if (request.getParameter("confirmPassword-edit") != null && request.getParameter("password-edit") != null) {
                        if (!request.getParameter("confirmPassword-edit").equals(request.getParameter("password-edit"))) {
                            invalidFields.add("NoMatchpassword");
                        }
                    }

                    if (request.getParameter("oldPassword-edit") != null) {
                        if (!request.getParameter("oldPassword-edit").equals(currentUser.getPassword())) {
                            invalidFields.add("invalidoldPassword-edit");
                        }
                    }

                    if (invalidFields.isEmpty()) {
                        status = "Update_success";
                        response.setStatus(200);
                        //Now go and update the user in the database And update the session attribute
                       UserAccessor accessor = new UserAccessor();
                        currentUser = accessor.updateUserData(request, currentUser);
                        request.getSession(true).setAttribute("user", currentUser);

                    } else {
                        status = "update_failed";
                        response.setStatus(409);
                    }
                } else if (button.equals("checkSession")) {
                    if (request.getSession().getAttribute("user") != null) {
                        status = "session_valid";
                        response.setStatus(200);
                    } else {
                        status = "session_invalid";
                        response.setStatus(409);
                    }
                    System.out.println(status);
                } else if (button.equals("cancel")) {
                    status = "Cancel";
                    response.setStatus(200);
                } else if (button.equals("signout")) {
                    status = "signout";
                    request.getSession(true).invalidate();
                    response.setStatus(200);

                } else if (button.equals("showUsers")) {
                    status = "all_users";
                    response.setStatus(200);
                    try {
                        List<User> allUsers = UserDB.getUsers();
                        jsonResponse = responder.userPageResponseAll(invalidFields, allUsers, status);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(userServlet.class.getName()).log(Level.SEVERE, null, ex);
                    }

                }

            }
            System.out.println("Json response1: " + jsonResponse);
            if (jsonResponse == "") {

                jsonResponse = responder.userPageResponse(invalidFields, currentUser, status);
            }


                //send json response
                System.out.println("Json response2: " + jsonResponse);
                out.println(jsonResponse);


        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
