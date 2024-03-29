package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.db.RatingDB;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
            String expDate=(String)request.getParameter("expiration-newPolicy");
            String time = request.getParameter("expTime-newPolicy");
            String timeregex = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
            String dateTime= expDate + " " + time; 
             if (time!=null){
                if (!time.matches(timeregex)){
                    time=null;
                }
             }
            User user=(User)request.getSession(true).getAttribute("user");
            String creator= user.getUserName();
            if (user!=null){
                initiative.setCreator(creator);
                initiative.setTitle(title);
                initiative.setCategory(category);
                initiative.setDescription(description);
                initiative.setStatus(status);
               if (expDate!=null && time!=null){
                 Date expiration = (Date) new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(dateTime);
                    initiative.setExpires(expiration);
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
    
     public static Initiative updateInitiative( HttpServletRequest request) throws ClassNotFoundException, ParseException {
       try{
            Initiative initiative= new Initiative ();
            String category=request.getParameter("category-editPolicy");
            String title=request.getParameter("title-editPolicy");
            int status=Integer.parseInt(request.getParameter("status-editPolicy"));
            String description=request.getParameter("description-editPolicy");
            String expDate = (String) request.getParameter("expiration-editPolicy");
            String time = request.getParameter("expTime-editPolicy");
            String dateTime= expDate + " " + time; 
            String timeregex = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
            
            User user=(User)request.getSession(true).getAttribute("user");
            String id = request.getParameter("policyId");
            id = id.substring(8);
            Date date = new Date();
            int intid=Integer.parseInt(id);
            if (time!=null){
                 if (!time.matches(timeregex)){
                    time=null;
                }
            }
            if (user != null) {

                initiative = InitiativeDB.getInitiative(intid);

                 if (category != null && !category.trim().isEmpty()){
                    initiative.setCategory(category);
                }
                if (description != null && !description.trim().isEmpty()) {
                    initiative.setDescription(description);
                }
              
                if (request.getParameter("status-editPolicy") != null && !request.getParameter("status-editPolicy").isEmpty()) {
                    initiative.setStatus(status);
                }
                if (title != null && !title.trim().isEmpty()) {
                    initiative.setTitle(title);
                }
                if (expDate!=null && time!=null){
                 Date expiration = (Date) new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(dateTime);
                    initiative.setExpires(expiration);
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
            
            for (Initiative iterator : activeInitiatives) {

                if (iterator.getExpires() != null) {
                    if (iterator.getExpires().getTime() <= today.getTime()) {
                        iterator.setStatus(2);
                        InitiativeDB.updateInitiative(iterator);
                    }
                }

            }
           
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PollAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
    
    public static void deleteInitiative(HttpServletRequest request) {
        String id = request.getParameter("id");
        id = id.substring(8);
        int initiativeId=Integer.parseInt(id);
        try {
            
            InitiativeDB.deleteInitiative(initiativeId);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PollAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }
      
    }
     public static ArrayList<Initiative> showUserActiveInitiatives(HttpServletRequest request) throws ClassNotFoundException {
      
         String username = request.getParameter("username");
         System.out.println("username is "+ username);
        
            List<Initiative> initiatives = InitiativeDB.getInitiatives(username);
            ArrayList<Initiative> activeInitiatives=new ArrayList();
            
             for (Initiative iterator : initiatives) {
                
                if (iterator.getStatus()==1) {
                   activeInitiatives.add(iterator);
                }
              }
            
            return activeInitiatives;
    }
     public static ArrayList<Initiative> showUserEndedInitiatives(HttpServletRequest request) throws ClassNotFoundException {
      
         String username = request.getParameter("username");
         System.out.println("username is "+ username);
        
            List<Initiative> initiatives = InitiativeDB.getInitiatives(username);
            ArrayList<Initiative> endedInitiatives=new ArrayList();
            
             for (Initiative iterator : initiatives) {
                
                if (iterator.getStatus()==2) {
                   endedInitiatives.add(iterator);
                }
              }
            
            return endedInitiatives;
} 
      public static Initiative showInitiativeInfo(HttpServletRequest request) throws ClassNotFoundException{
       
          
          int initiativeId = Integer.parseInt(request.getParameter("id").substring(8));

         
           Initiative initiative= InitiativeDB.getInitiative(initiativeId);
           return initiative;
      }
     
    public static void createRating(HttpServletRequest request) throws ClassNotFoundException{
        User user=(User)request.getSession().getAttribute("user");
         String username=user.getUserName();
//int id= Integer.parseInt(request.getParameter("id"));
         int initiativeID= Integer.parseInt(request.getParameter("id").substring(8));
         int rate= Integer.parseInt(request.getParameter("rating"));
         Rating rating= new Rating();
         
         rating.setInitiativeID(initiativeID);
         rating.setRate(rate);
         rating.setUserName(username);
         //rating.setID(id);
         RatingDB.addRating(rating);
   
    }
}