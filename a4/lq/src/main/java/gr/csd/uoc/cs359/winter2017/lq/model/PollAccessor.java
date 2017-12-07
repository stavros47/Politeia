package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Kyriacos
 */
public class PollAccessor {
    
    public static Initiative createInitiative( HttpServletRequest request) throws ClassNotFoundException{
        try {
            String category=request.getParameter("category-newPolicy");
            String title=request.getParameter("title-newPolicy");
            Initiative initiative= new Initiative ();
            int status=Integer.parseInt(request.getParameter("status-newPolicy"));
            String description=request.getParameter("description-newPolicy");
            String expiration=request.getParameter("expiration-newPolicy");
            
            
            Date expDate=new SimpleDateFormat("yyyy-MM-dd").parse(expiration);
            
            
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
                System.out.println("----------------------------------------------------------------------- " + initiative);
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