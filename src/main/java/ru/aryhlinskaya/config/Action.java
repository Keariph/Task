package ru.aryhlinskaya.config;

import org.springframework.beans.factory.annotation.Autowired;
import ru.aryhlinskaya.Score;
import ru.aryhlinskaya.Transaction;
import ru.aryhlinskaya.User;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface Action {
    public void createUser(Integer id,String name, Integer age);
    public void createScore(Integer id, Integer user_id, Integer sum);
    public User getUser(Integer id);
    public List<User> listUser() throws SQLException;
    public Integer getCountUser();
    public Score getScore(Integer id);
    public List<Score> listScore(Integer id);
    public Integer getSumScore(Integer id);
    public Integer getCountScore();
    public void updateScore(Integer id, Integer sum);
    public void createTransaction(Integer id, String type, Integer sender, Integer receiver, Integer money, String date_create);
    public List<Transaction> listTransaction();
    public Integer getCountTransaction();
    public List<Transaction> transactionsBetween(String begin, String end);
    public List<Transaction> transactionsFrom(String name);
    public List<Transaction> transactionsFromBetween(String begin, String end, String name);
}
