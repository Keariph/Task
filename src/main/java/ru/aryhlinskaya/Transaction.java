package ru.aryhlinskaya;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Transaction {
    Integer id;
    String type;
    Integer sender;
    Integer receiver;
    Integer money;
    Date date_create;

    public Transaction(){

    }

    public Transaction(Integer id, String type, Integer sender, Integer receiver, Integer money, Date date_create){
        this.id = id;
        this.type = type;
        this.sender = sender;
        this.receiver = receiver;
        this.money = money;
        this.date_create = date_create;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSender() {
        return sender;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public Integer getReceiver() {
        return receiver;
    }

    public void setReceiver(Integer receiver) {
        this.receiver = receiver;
    }

    public Integer getMoney() {
        return money;
    }

    public Date getDate_create() {
        return date_create;
    }

    public void setDate_create(Date date_create) {
        this.date_create = date_create;
    }

    public void setMoney(Integer money) {
        this.money = money;
    }
    @Override
    public String toString(){
        return "{ \"id\": " + getId() + ", \"type\": \"" + getType() + "\", \"sender\": " + getSender() + ", \"receiver\": "
                + getReceiver() + ", \"money\": " + getMoney() + ", \"date_create\":\"" + getDate_create() + "\"}";
    }
}
