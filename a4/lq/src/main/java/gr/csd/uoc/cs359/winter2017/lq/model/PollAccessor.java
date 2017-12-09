package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Kyriacos
 */
public class PollAccessor {
    
    public static Initiative createInitiative( HttpServletRequest request) throws ClassNotFoundException{
        try {
            Initiative initiative= new Initiative ();
            String category=request.getParameter("category-newPolicy");
            String title=request.getParameter("title-newPolicy");
            int status=Integer.parseInt(request.getParameter("status-newPolicy"));
            String description=request.getParameter("description-newPolicy");
            String expiration=(String)request.getParameter("expiration-newPolicy");
            String time = request.getParameter("expTime-newPolicy");
            //expiration=expiration;
            User user=(User)request.getSession(true).getAttribute("user");
            String creator= user.getUserName();
            if (user!=null){
                initiative.setCreator(creator);
                initiative.setTitle(title);
                initiative.setCategory(category);
                initiative.setDescription(description);
                initiative.setStatus(status);
                if (expiration != null && !expiration.isEmpty()) {
                    Date expDate = (Date) new SimpleDateFormat("yyyy-MM-dd").parse(expiration);
                    initiative.setExpires(expDate);
                }
                InitiativeDB.addInitiative(initiative);
            }
            else {
                System.out.println("No session found.");
            }
            
            
            return initiative;
        } catch (ParseException ex) {
            Logger.getLogger(PollAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
               
       
    }
    
     public static Initiative updateInitiative( HttpServletRequest request) throws ClassNotFoundException {
        try {
            Initiative initiative= new Initiative ();
            String category=request.getParameter("category-editPolicy");
            String title=request.getParameter("title-editPolicy");
            int status=Integer.parseInt(request.getParameter("status-editPolicy"));
            String description=request.getParameter("description-editPolicy");
            String expiration = (String) request.getParameter("expiration-editPolicy");

            User user=(User)request.getSession(true).getAttribute("user");
           
            String id = request.getParameter("policyId");
            id = id.substring(8);
            
            Date date = new Date();
            
             int intid=Integer.parseInt(id);
            if (user != null) {

                initiative = InitiativeDB.getInitiative(intid);

                if (category != null && !category.isEmpty()) {
                    initiative.setCategory(category);
                }
                if (description != null && !description.isEmpty()) {
                    initiative.setDescription(description);
                }
                if (expiration != null && !expiration.isEmpty()) {
                    Date expDate = (Date) new SimpleDateFormat("yyyy-MM-dd").parse(expiration);
                    initiative.setExpires(expDate);
                }

                if (request.getParameter("status-editPolicy") != null && !request.getParameter("status-editPolicy").isEmpty()) {
                    initiative.setStatus(status);
                }
                if (title != null && !title.isEmpty()) {
                    initiative.setTitle(title);
                }
                initiative.setModified(date);

                InitiativeDB.updateInitiative(initiative);

            }
            else {
                System.out.println("No session found.");
            }
            
            return initiative;
        } catch (ParseException ex) {
            Logger.getLogger(PollAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }
          return null;
    }

    public static void endExpiredPolicies() {
        Date today = new Date();
        try {
            List<Initiative> activeInitiatives = InitiativeDB.getInitiativesWithStatus(1);
            int count = 0;
            for (Initiative iterator : activeInitiatives) {

                if (iterator.getExpires() != null) {
                    if (iterator.getExpires().getTime() <= today.getTime()) {
                        iterator.setStatus(2);
                        InitiativeDB.updateInitiative(iterator);
                    }
                }

            }
            System.out.println("Count:" + count);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PollAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}