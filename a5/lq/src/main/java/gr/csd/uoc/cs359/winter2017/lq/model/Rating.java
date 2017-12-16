/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.model;

/**
 *
 * @author papadako
 */
public class Rating {
    private String userName;    // (unique)
    private int ID;
    private int initiativeID;
    private int rate;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ratingID) {
        this.ID = ratingID;
    }

    public int getInitiativeID() {
        return initiativeID;
    }

    public void setInitiativeID(int initiativeID) {
        this.initiativeID = initiativeID;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    /**
     * Method that checks that all mandatory fields are set
     *
     * @throws Exception
     */
    public void checkFields() throws Exception {
        // Check that everything is ok
        if ((userName == null || userName.trim().isEmpty())
                || (rate > 5) || (rate < 0)
                || (initiativeID < 0)) {
            throw new Exception("Missing fields!");  // Something went wrong with the fields
        }
    }

    /**
     * Returns a string representation of this object (use it only
     *
     * @return
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("ID: ").append(this.ID).append("\n")
                .append("User: ").append(this.userName).append("\n")
                .append("InitiativeID: ").append(this.initiativeID).append("\n")
                .append("Rate: ").append(this.rate).append("\n");

        return sb.toString();

    }

}
