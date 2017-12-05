/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import java.util.HashSet;
import java.util.Set;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Kyriacos
 */
public class PollAccessor {
    
    public static Initiative createInitiative( HttpServletRequest request) throws ClassNotFoundException{
               String category=request.getParameter("category-newPolicy");
               String title=request.getParameter("title-newPolicy");
               Initiative initiative= new Initiative ();
               int status=Integer.parseInt(request.getParameter("status-newPolicy"));
               String description=request.getParameter("description-newPolicy");
               User user=(User)request.getSession(true).getAttribute("user");
               String creator= user.getUserName();
               if (user!=null){
                   initiative.setCreator(creator);
                   initiative.setTitle(title);
                   initiative.setCategory(category);
                   initiative.setDescription(description);
                   initiative.setStatus(status);
                   System.out.println("Initiative: "+ initiative.toString());
                   InitiativeDB.addInitiative(initiative);
                   
               }
               else {
                   System.out.println("No session found.");
               }
            
               
               return initiative;
               
       
    }
}
