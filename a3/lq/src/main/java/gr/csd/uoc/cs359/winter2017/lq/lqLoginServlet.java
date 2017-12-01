/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import static gr.csd.uoc.cs359.winter2017.lq.db.UserDB.checkValidUserName;
import static gr.csd.uoc.cs359.winter2017.lq.db.UserDB.getUser;
import gr.csd.uoc.cs359.winter2017.lq.model.FormValidator;
import gr.csd.uoc.cs359.winter2017.lq.model.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Stavr
 */
@WebServlet(name = "lqLoginServlet", urlPatterns = {"/lqLoginServlet"})
@MultipartConfig
public class lqLoginServlet extends HttpServlet {

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
        response.setContentType("application/json;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            String status = "";
            User resultUser = null;
            ArrayList<String> invalidFields = null;
            FormValidator validator = new FormValidator();
            System.out.println("Login Process");

            //Validator perfoms a Regular expression check on the fields first.
            invalidFields = validator.ValidateLogin(request);

            if (invalidFields.isEmpty()) {
                try {
                    //response.setStatus(200);
                    if (!checkValidUserName(request.getParameter("lgnUsername"))) {
                        resultUser = getUser(request.getParameter("lgnUsername"));
                        if (resultUser != null) {
                            if (resultUser.getPassword().equals(request.getParameter("lgnPassword"))) {
                                status = "Login_success";
                                response.setStatus(200);
                                //Return user to redirect to user page
                                //send the request to the user servlet to create a new session

                                HttpSession session = request.getSession(true);
                                session.setAttribute("user", resultUser);
                                session.setMaxInactiveInterval(3600);

                            } else {
                                invalidFields.add("invalidlgnPassword");
                                resultUser = null;
                            }
                        }

                    } else {
                        status = "user_unknown";
                        response.setStatus(409);
                    }
                } catch (ClassNotFoundException ex) {
                    Logger.getLogger(lqLoginServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            if (!invalidFields.isEmpty()) {
                status = "Invalid_login";
                response.setStatus(409);
            }

            System.out.println("Invalid Array:" + invalidFields);

            Gson gson = new GsonBuilder().create();
            String jsonResponse;
            String invalidFieldsResponse;
            //create json response
            String statusObject = "\"status\":\"" + status + "\"";

            if (resultUser != null) {
                String userResult = "\"user\":" + gson.toJson(resultUser);
                jsonResponse = "{" + statusObject + "," + userResult + "}";
            } else {
                invalidFieldsResponse = "\"fields\":" + gson.toJson(invalidFields) + "";
                jsonResponse = "{" + statusObject + "," + invalidFieldsResponse + "}";
            }

            //send json response
            System.out.println("Json response: " + jsonResponse);
            out.println(jsonResponse);

        }//End of Try
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
