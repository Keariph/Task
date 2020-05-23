package ru.aryhlinskaya;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;

import java.io.Serializable;


public class User implements Serializable {
    @JsonProperty("id") Integer id;
    @JsonProperty("name") String name;
    @JsonProperty("age") Integer age;
    public User(){

    }
    @JsonCreator
    public User(@JsonProperty("id") Integer id, @JsonProperty("name") String name, @JsonProperty("age") Integer age){

        this.id = id;
        this.name = name;
        this.age = age;
    }
    public void setId(Integer id){
        this.id = id;
    }
    public Integer getId(){
        return id;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setAge(Integer age){
        this.age = age;
    }
    public Integer getAge(){
        return age;
    }

    @Override
    public String toString(){
        return "{" + "\"id\": " + getId() + ", \"name\": \"" + getName().toString()
        + "\", \"age\": " + getAge() + "}";
    }

}
