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

            ArrayList<String> results;
//            out.println("<h1>Servlet lqRegisterServlet at " + request.getContextPath() + "</h1>");
//            out.println("<h2>Method: " + request.getMethod() + "</h2>");

            FormValidator validator = new FormValidator();

            results = validator.Validate(request);
            //check for not matching passwords
            if (request.getParameter("confirmPassword") != null && request.getParameter("password") != null) {
                if (request.getParameter("confirmPassword").equals(request.getParameter("password"))) {

                } else {
                    results.add("passwordsDoNotMatch");
                }
            } else {
                results.add("passwordsEmpty");
            }
            if (!results.isEmpty()) {
                // out.println("No Null Results");
                Gson gson = new GsonBuilder().create();
                //create json response
                String test = "\"fields\":" + gson.toJson(results) + "";
                String status = "\"status\":\"invalid-fields\"";
                String jsonResponse = "{" + status + "," + test + "}";
                //send json response
                out.println(jsonResponse);
//                for (String result : results) {
//
//                   // String json = new Gson().toJson(results);
//                }
            } else {
                out.println("No invalid fields");
            }

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
