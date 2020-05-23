package ru.aryhlinskaya;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Component
public class Score implements Serializable {

    private Integer id;
    private Integer user_id;
    private Integer sum;
    public Score(){
    }
    public Score(Integer id, Integer user_id, Integer sum){
        this.id = id;
        this.user_id = user_id;
        this.sum = sum;
    }

    public Integer getId() {
        return this.id;
    }

    public Integer getUser_id() {
        return this.user_id;
    }

    public Integer getSum() {
        return this.sum;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public String toString(){
        return "{" + "\"id\": " + id +
                ", \"user_id\": " + user_id
                + ", \"sum\": " + sum + "}";
    }

}

