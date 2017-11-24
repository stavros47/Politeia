/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author papadako
 */
public class CS359DB {

    private static final String URL = "jdbc:mariadb://83.212.108.176";
    private static final String DATABASE = "csd2962";
    private static final int PORT = 3306;
    private static final String UNAME = "csd2962";
    private static final String PASSWD = "SVc0Zhv8Cq";

    /**
     * Attempts to establish a database connection Using mariadb
       *
     * @return a connection to the database
     * @throws SQLException
     * @throws java.lang.ClassNotFoundException
     */
    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("org.mariadb.jdbc.Driver");
        return DriverManager.getConnection(URL + ":" + PORT + "/" + DATABASE, UNAME, PASSWD);
    }

}
