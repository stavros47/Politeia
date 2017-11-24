/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import gr.csd.uoc.cs359.winter2017.lq.model.User;

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
    public static void main(String[] args) throws ClassNotFoundException {

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
        turing.setBirthDate("1912 / 07 / 07");
        turing.setCountry("Science");
        turing.setTown("Computer Science");
        turing.setAddress("Computability");
        turing.setOccupation("Xompistas");
        turing.setGender("Male");
        turing.setInterests("Enigma, decyphering");
        turing.setInfo("You will have a job due to my work! :)");

        if (UserDB.checkValidUserName("turing")) {
            // Add turing to database
            UserDB.addUser(turing);
        } else {
            System.out.println("User already exists.... Not more Turings please!");
        }

        // Add a wish as info
        turing.setInfo("I hope you follow my path...");
        turing.setEmail("gnirut@csd.uoc.gr");
        UserDB.updateUser(turing);

        System.out.println(UserDB.getUser("turing"));

        UserDB.deleteUser("turing");

        if (UserDB.checkValidUserName("turing")) {
            // You can be a new Turing!
            System.out.println("Well, Turing is gone for a long time now!");
            System.out.println("Hope we find a new one in this 2017 class!");
        }
    }
}
