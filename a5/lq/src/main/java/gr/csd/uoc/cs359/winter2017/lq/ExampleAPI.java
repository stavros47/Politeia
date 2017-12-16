/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.db.CommentDB;
import gr.csd.uoc.cs359.winter2017.lq.db.DelegatedDB;
import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.db.RatingDB;
import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import gr.csd.uoc.cs359.winter2017.lq.db.VoteDB;
import gr.csd.uoc.cs359.winter2017.lq.model.Comment;
import gr.csd.uoc.cs359.winter2017.lq.model.Delegated;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import gr.csd.uoc.cs359.winter2017.lq.model.Rating;
import gr.csd.uoc.cs359.winter2017.lq.model.User;
import gr.csd.uoc.cs359.winter2017.lq.model.Vote;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 *
 * @author papadako
 */
public class ExampleAPI {

    /**
     * An example of adding a new member in the database. Turing is a user of
     * our system
     *
     * @param args the command line arguments
     * @throws ClassNotFoundException
     */
    public static void main(String[] args) throws ClassNotFoundException, InterruptedException {

        // O Turing έσπασε τον κώδικα enigma που χρησιμοποιούσαν οι Γερμανοί
        // στον Παγκόσμιο Πόλεμο ΙΙ για να κρυπτογραφήσουν την επικοινωνία τους.
        // Άρα είναι πιθανό να χρησιμοποιούσε σαν passwd τη λέξη enigma, κάπως
        // τροποποιημένη :)
        // http://en.wikipedia.org/wiki/Enigma_machine
        // md5 της λέξης 3n!gm@ είναι e37f7cfcb0cd53734184de812b5c6175
        User turing = new User();
        turing.setUserName("turing");
        turing.setEmail("turing@csd.uoc.gr");
        turing.setPassword("e37f7cfcb0cd53734184de812b5c6175");
        turing.setFirstName("Alan");
        turing.setLastName("Turing");
        turing.setBirthDate("07/07/1912");
        turing.setCountry("Science");
        turing.setTown("Computer Science");
        turing.setAddress("Computability");
        turing.setOccupation("Xompistas");
        turing.setGender("Male");
        turing.setInterests("Enigma, decyphering");
        turing.setInfo("You will have a job due to my work! :)");

        if (UserDB.checkValidUserName("papadako")) {
            // Add turing to database
            UserDB.addUser(turing);
        } else {
            System.out.println("User already exists.... Not more Turings please!");
        }

        List<User> users = UserDB.getUsers();

        int i = 0;
        for (User user : users) {
            System.out.println("user:" + i++);
            System.out.println(user);
        }

        // Add a wish as info
        turing.setInfo("I hope you follow my path...");
        turing.setEmail("gnirut@csd.uoc.gr");
        UserDB.updateUser(turing);

        System.out.println(UserDB.getUser("turing"));

        // Check initiatives
        Initiative initiative = new Initiative();
        initiative.setCreator("turing");
        initiative.setTitle("Halting Problem");
        initiative.setCategory("Computability");
        initiative.setDescription("In computability theory, the halting problem is the problem of determining, from a description of an arbitrary computer program and an input, whether the program will finish running or continue to run forever.");
        initiative.setStatus(0);
        InitiativeDB.addInitiative(initiative);

        System.out.println(initiative.toString());

        //UserDB.deleteUser("turing");

        if (UserDB.checkValidUserName("turing")) {
            // You can be a new Turing!
            System.out.println("Well, Turing is gone for a long time now!");
            System.out.println("Hope we find a new one in this 2017 class!");
        }

        initiative.setStatus(1);
        InitiativeDB.updateInitiative(initiative);
        System.out.println(initiative.toString());

        int initID = initiative.getId();

        Vote vote = new Vote();
        vote.setUser("papadako");
        vote.setInitiativeID(initID);
        System.out.println(vote);
        VoteDB.addVote(vote);

        /* // Get upvotes from users (i.e. non delegators)
        List<Vote> votes = VoteDB.getVotedBy(1);
        i = 0;
        for (Vote current : votes) {
            System.out.println("vote:" + i++);
            System.out.println(current);
        }*/
        System.out.println("Created" + vote.getCreatedAsString());

        vote.setVote(false, true);

        System.out.println("NEWWWW!");
        System.out.println(VoteDB.getVote("", initiative.getId()));

        InitiativeDB.deleteInitiative(initiative.getId());
        //VoteDB.deleteVote(vote.getId());

        initiative.setExpires(new Date());
        InitiativeDB.updateInitiative(initiative);

        TimeUnit.SECONDS.sleep(2);
        vote.setDelegator("turing");

        VoteDB.updateVote(vote);
        System.out.println(vote);
        System.out.println("Modified" + vote.getModifiedAsString());

        // Get Initiatives
        List<Initiative> initiatives = InitiativeDB.getInitiativesWithStatus(1);
        i = 0;
        for (Initiative current : initiatives) {
            System.out.println("initiative:" + i++);
            System.out.println(current);
        }

        Comment comment = new Comment();
        comment.setComment("lala");
        comment.setInitiativeID(initID);
        comment.setUserName("papadako");

        CommentDB.addComment(comment);

        comment.setComment("llaladfasdfs");
        CommentDB.updateComment(comment);
        System.out.println(comment.toString());

        Rating rating = new Rating();
        rating.setRate(2);
        rating.setInitiativeID(initID);
        rating.setUserName("turing");

        RatingDB.addRating(rating);
        rating.setRate(5);
        RatingDB.updateRating(rating);
        System.out.println(rating.toString());

        Delegated deleg = new Delegated();
        deleg.setInitiativeID(initID);
        deleg.setDelegator("turing");
        deleg.setUserName("turing");
        DelegatedDB.addDelegated(deleg);
        deleg.setUserName("turing");
        DelegatedDB.updateDelegated(deleg);
        System.out.println(deleg.toString());


    }
}
