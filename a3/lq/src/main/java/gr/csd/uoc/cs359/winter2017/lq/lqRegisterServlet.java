/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.model.FormValidator;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import gr.csd.uoc.cs359.winter2017.lq.model.Registrator;
import gr.csd.uoc.cs359.winter2017.lq.model.User;

/**
 *
 * @author Stavr
 */
@WebServlet(name = "lqRegisterServlet", urlPatterns = {"/mainServlet"})
@MultipartConfig
public class lqRegisterServlet extends HttpServlet {

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
            User resultUser = null;
            ArrayList<String> invalidFields = null;
            //Invalid_fields/Registration_Success
            String status;

            //Todo: Form Validator should check for already existing username and email
            FormValidator validator = new FormValidator();

            if (request.getParameter("check") != null) {
                System.out.println("Checking. . . ");
                if (request.getParameter("check").equals("username")) {
                    invalidFields = validator.checkDuplicate(request.getParameter("username"), 0);
                } else if (request.getParameter("check").equals("email")) {
                    invalidFields = validator.checkDuplicate(request.getParameter("email"), 1);
                }

                if (invalidFields.isEmpty()) {
                    status = request.getParameter("check") + "_available";
                    response.setStatus(200);

                } else {
                    status = request.getParameter("check") + "_unavailable";
                    response.setStatus(409);
                }

            } else {
                System.out.println("Registration Process");
                //Validator checks for Empty Required Fields and perfoms a Regular expression check
                invalidFields = validator.Validate(request);
                //check for not matching passwords
                if (request.getParameter("confirmPassword") != null && request.getParameter("password") != null) {
                    if (request.getParameter("confirmPassword").equals(request.getParameter("password"))) {
                    } else {
                        invalidFields.add("NoMatchpassword");
                    }
                }

                if (invalidFields.isEmpty()) {
                    status = "Registration_Success";
                    response.setStatus(200);
                    //Now go and add the user to the database
                    Registrator userRegistrator = new Registrator();

                    resultUser = userRegistrator.RegisterUser(request);

                } else {
                    status = "Invalid_fields";
                    response.setStatus(409);
                }
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

        }//End of Try block
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
