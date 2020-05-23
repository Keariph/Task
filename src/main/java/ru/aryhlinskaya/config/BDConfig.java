package ru.aryhlinskaya.config;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BDConfig {

    String url = "jdbc:postgresql://localhost:5432/Test";
    String login = "postgres";
    String password = "admin";

    public BDConfig() {
    }

    public Connection connectPostgreSQL() {
        Connection connection = null;
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Test", login, password);
            return connection;
        }
        catch (SQLException | ClassNotFoundException ex) {
        }
        return connection;

    }
    public List<Map<String, Object>> query(String sql)  {
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        Map<String, Object> row = null;
        try(Connection dbconnection = connectPostgreSQL(); Statement statement = dbconnection.createStatement()) {
            ResultSet resultSet = statement.executeQuery(sql);
            ResultSetMetaData metaData = resultSet.getMetaData();
            Integer columnCount = metaData.getColumnCount();
            while (resultSet.next()) {
                row = new HashMap<String, Object>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnName(i), resultSet.getObject(i));
                }
                resultList.add(row);
            }
            statement.close();
            return resultList;
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;

    }
    public void update(String sql){
        try(Connection dbconnection = connectPostgreSQL(); Statement statement = dbconnection.createStatement()){
            statement.executeUpdate(sql);
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}