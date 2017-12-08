package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
            Date expDate=(Date)new SimpleDateFormat("yyyy-MM-dd").parse(expiration);
            
            
            User user=(User)request.getSession(true).getAttribute("user");
            String creator= user.getUserName();
            if (user!=null){
                initiative.setCreator(creator);
                initiative.setTitle(title);
                initiative.setCategory(category);
                initiative.setDescription(description);
                initiative.setStatus(status);
                initiative.setExpires(expDate);
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
            String expiration=(String)request.getParameter("expiration-editPolicy");
            Date expDate=(Date)new SimpleDateFormat("yyyy-MM-dd").parse(expiration);
            User user=(User)request.getSession(true).getAttribute("user");
           
            String id = request.getParameter("policyId");
            id = id.substring(8);
            
            Date date = new Date();
            
             int intid=Integer.parseInt(id);
             if (user!=null){
                initiative= InitiativeDB.getInitiative(intid);
                initiative.setCategory(category);
                initiative.setDescription(description);
                initiative.setExpires(expDate);
                initiative.setModified(date);
                initiative.setTitle(title);
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
}