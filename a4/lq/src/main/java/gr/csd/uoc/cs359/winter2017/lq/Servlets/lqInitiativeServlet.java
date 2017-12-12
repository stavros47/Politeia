package gr.csd.uoc.cs359.winter2017.lq.Servlets;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.model.FormValidator;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import static gr.csd.uoc.cs359.winter2017.lq.model.JsonResponse.initiativeResponse;
import gr.csd.uoc.cs359.winter2017.lq.model.PollAccessor;
import gr.csd.uoc.cs359.winter2017.lq.model.User;
import gr.csd.uoc.cs359.winter2017.lq.model.VoteAccessor;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
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
@WebServlet(name = "lqInitiativeServlet", urlPatterns = {
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
    throws ServletException, IOException, ClassNotFoundException, ParseException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
             List<Initiative> myPollsList=null;
             List<Initiative> activePollsList=null;
             List<Initiative> endedPollsList=null;
             String status = "";
            User currentUser= (User)request.getSession(true).getAttribute("user");
            ArrayList< String> invalidFields = new ArrayList<>();
            FormValidator validator = new FormValidator();
            Initiative initiative = null;
            //VoteAccessor voteAccessor = new VoteAccessor();
            System.out.println("Poll Process");
            
            if (request.getParameter("poll") != null) {
                System.out.println("POLL REQUEST:" + request.getParameter("poll"));
                switch (request.getParameter("poll")) {

                     case "new":
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
                         myPollsList=InitiativeDB.getInitiatives(currentUser.getUserName());
                         activePollsList=InitiativeDB.getInitiativesWithStatus(1);
                         endedPollsList=InitiativeDB.getInitiativesWithStatus(2);
                         break;
                     case "mypolls":
                         status="my_polls";
                         response.setStatus(200);
                         PollAccessor.endExpiredPolicies();
                         myPollsList = InitiativeDB.getInitiatives(currentUser.getUserName());
                         activePollsList=InitiativeDB.getInitiativesWithStatus(1);
                         endedPollsList=InitiativeDB.getInitiativesWithStatus(2);
                         break;
                     case "allpolls":
                         status = "all_polls";
                         response.setStatus(200);
                         PollAccessor.endExpiredPolicies();
                         myPollsList = InitiativeDB.getInitiatives(currentUser.getUserName());
                         activePollsList = InitiativeDB.getInitiativesWithStatus(1);
                         endedPollsList = InitiativeDB.getInitiativesWithStatus(2);
                         break;
                     case "vote":
                         status = "vote_success";
                         response.setStatus(200);
                         myPollsList = InitiativeDB.getInitiatives(currentUser.getUserName());
                         activePollsList=InitiativeDB.getInitiativesWithStatus(1);
                         endedPollsList = InitiativeDB.getInitiativesWithStatus(2);
                         VoteAccessor.voteAction(request);

                         break;
                     case "update":
                         status="update_polls";
                         response.setStatus(200);
                         invalidFields = validator.ValidatePollEditFields(request);
                         if (invalidFields.isEmpty()) {
                             initiative=PollAccessor.updateInitiative(request);
                             status="update_success";
                             response.setStatus(200);
                             PollAccessor.endExpiredPolicies();
                             myPollsList=InitiativeDB.getInitiatives(currentUser.getUserName());
                             activePollsList=InitiativeDB.getInitiativesWithStatus(1);
                             endedPollsList=InitiativeDB.getInitiativesWithStatus(2);
                         }
                         else{
                             status = "update_polls_failed";
                             response.setStatus(409);
                         }   
                         break;
                     default:
                         break;
                 }
               
            }
            
            String jsonResponse = initiativeResponse(invalidFields, myPollsList, activePollsList, endedPollsList, currentUser, status);
           
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
        } catch (ParseException ex) {
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
        } catch (ParseException ex) {
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