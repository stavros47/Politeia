/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.model.FormValidator;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import static gr.csd.uoc.cs359.winter2017.lq.model.JsonResponse.initiativeResponse;
import gr.csd.uoc.cs359.winter2017.lq.model.PollAccessor;
import gr.csd.uoc.cs359.winter2017.lq.model.User;
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
 * @author Kyriacos
 */
@WebServlet(name = "lqPollServlet", urlPatterns = {
    "/lqInitiativeServlet"
})@MultipartConfig
public class lqInitiativeServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws java.lang.ClassNotFoundException
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException, ClassNotFoundException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
             List<Initiative> list;
            String status = "";
            User curentUser= (User)request.getSession(true).getAttribute("user");
            ArrayList < String > invalidFields = null;
            FormValidator validator = new FormValidator();
            Initiative initiative = null;
            System.out.println("Poll Process");
            
            if (request.getParameter("poll") != null) {
                if (request.getParameter("poll").equals("new")) {
                    invalidFields = validator.ValidatePollFields(request);
                    if (invalidFields.isEmpty()){
                        initiative=PollAccessor.createInitiative(request);  
                        status="initiative_success";
                        response.setStatus(200);
                    }
                    else{
                        status="initiative_failed";
                        response.setStatus(409);
                    }
                }
            }
            list=InitiativeDB.getInitiatives(curentUser.getUserName());
        
            String jsonResponse = initiativeResponse(invalidFields, list, status);
           
            out.print(jsonResponse);
           
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(lqInitiativeServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(lqInitiativeServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    } // </editor-fold>

}