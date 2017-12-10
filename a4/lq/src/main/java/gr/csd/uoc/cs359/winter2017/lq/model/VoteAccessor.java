/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

import gr.csd.uoc.cs359.winter2017.lq.db.VoteDB;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Stavr
 */
public class VoteAccessor {

    private HashMap<Integer, Integer> countMap = new HashMap<>();

    public static void voteAction(HttpServletRequest request) {
        User currentUser = (User) request.getSession(true).getAttribute("user");
        String id = request.getParameter("policyId");
        int policyID = Integer.parseInt(id);
        String userVoteString = request.getParameter("vote");
        Boolean userVote = userVoteString.equals("UpVote") ? true : false;

        try {
            List<Vote> voteList = VoteDB.getVotes(currentUser.getUserName());
            int countLoop = 0;
            Vote currentVote = null;
            for (Vote vote : voteList) {
                if (vote.getInitiativeID() == policyID) {

                    currentVote = vote;
                }
            }

            if (currentVote != null) {
                System.out.println("current vote:" + currentVote.getVoteAsString());
                System.out.println("user vote:" + userVoteString);
                if (!currentVote.getVoteAsString().equals(userVoteString)) {
                    System.out.println("hello!");
                    currentVote.setVote(userVote, true);
                    VoteDB.addVote(currentVote);
                }
            } else {
                currentVote = new Vote(currentUser.getUserName(), "", policyID, userVote, true);
                VoteDB.addVote(currentVote);
                countLoop++;
            }
            System.out.println("Count" + countLoop);



        } catch (ClassNotFoundException ex) {
            Logger.getLogger(VoteAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public HashMap<Integer, Integer> generateCountMap() {
        try {
            List<Vote> voteList = VoteDB.getAllVotes();

            for (Vote vote : voteList) {
                if (vote != null) {
                    addToCountMap(vote);
                }

            }

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(VoteAccessor.class.getName()).log(Level.SEVERE, null, ex);
        }
        return this.countMap;
    }

    public void addToCountMap(Vote vote) {

        if (this.countMap.get(vote.getInitiativeID()) != null) {
            if (vote.getVote() == 1) {
                this.countMap.put(vote.getInitiativeID(), this.countMap.get(vote.getInitiativeID()) + 1);
            } else {
                this.countMap.put(vote.getInitiativeID(), this.countMap.get(vote.getInitiativeID()) - 1);
            }
        } else {
            if (vote.getVote() == 1) {
                this.countMap.put(vote.getInitiativeID(), 1);
            } else {
                this.countMap.put(vote.getInitiativeID(), -1);
            }
        }

    }
}
