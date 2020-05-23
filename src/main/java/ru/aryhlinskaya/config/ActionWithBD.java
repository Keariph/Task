package ru.aryhlinskaya.config;

import ru.aryhlinskaya.Score;
import ru.aryhlinskaya.Transaction;
import ru.aryhlinskaya.User;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ActionWithBD implements Action {
    protected BDConfig bdconfig = new BDConfig();
    public ActionWithBD() {

    }

    @Override
    public void createUser(Integer id, String name, Integer age) {
        String sql = "INSERT INTO public.\"Client\""
                + "(ID, AGE, NAME) " + "VALUES"
                + "( " + id + ", " + age + ", \'" + name + "\')";
        bdconfig.update(sql);

    }

    @Override
    public void createScore(Integer id, Integer user_id, Integer sum) {
        String sql = "insert into public.\"score\"(id, user_id, money) values(" + id + ", " + user_id + ", " + sum + ")";
        bdconfig.update(sql);
    }

    @Override
    public void createTransaction(Integer id, String type, Integer sender, Integer receiver, Integer money, String date_create) {
        String sql = "INSERT INTO public.\"Transaction\"(id, type, receiver, sender, money, date_create) " +
                "VALUES ("+ id +", \'" + type +"\', " + receiver + ", " + sender + ", "  + money + ", \'" + date_create + "\');";
        bdconfig.update(sql);
    }

    @Override
    public User getUser(Integer id) {
        String sql = "select * from public.\"Client\" where id= "+id;
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        Integer idUser = 0, ageUser = 0;
        String nameUser = "";
        for(Integer i=0;i<resultList.size();i++){
            idUser = (Integer) resultList.get(i).get("id");
            nameUser = (String) resultList.get(i).get("name");
            ageUser = (Integer) resultList.get(i).get("age");
        }
        return new User(idUser,nameUser,ageUser);
    }

    @Override
    public List<User> listUser(){
        String sql = "select * from public.\"Client\";";
        ArrayList<User> user = new ArrayList<User>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer id = (Integer) resultList.get(i).get("id");
            String name = (String) resultList.get(i).get("name");
            Integer age = (Integer) resultList.get(i).get("age");
            user.add(new User(id, name, age));
        }
        return user;
    }

    @Override
    public Integer getCountUser() {
        String sql = "select count(*) from public.\"Client\"";
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        Integer count = 0;
        for(Integer i=0;i<resultList.size();i++){
            count = (int)(long) resultList.get(i).get("count");
        }
        return count;
    }

    @Override
    public Score getScore(Integer id) {
        String sql = "select * from public.\"score\" where id= " + id;
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        Integer idScore = 0, idUser = 0, sumScore = 0;
        for(Integer i=0;i<resultList.size();i++){
            idScore = (Integer) resultList.get(i).get("id");
            idUser = (Integer) resultList.get(i).get("user_id");
            sumScore = (Integer) resultList.get(i).get("money");
        }
        return new Score(idUser,idUser,sumScore);
    }

    @Override
    public List<Score> listScore(Integer id) {
        String sql = "select * from public.\"score\" where user_id = " + id;
        ArrayList<Score> score = new ArrayList<Score>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer idScore = (Integer) resultList.get(i).get("id");
            Integer idUser = (Integer) resultList.get(i).get("user_id");
            Integer sumScore = (Integer) resultList.get(i).get("money");
            score.add(new Score(idScore, idUser, sumScore));
        }
        return score;
    }

    @Override
    public Integer getSumScore(Integer id) {
        String sql = "select money from public.\"score\" where id = " + id;
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        Integer sum = 0;
        for(Integer i=0;i<resultList.size();i++){
            sum = (Integer) resultList.get(i).get("money");
        }
        return sum;
    }

    @Override
    public Integer getCountScore() {
        String sql = "select count(*) from public.score";
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        Integer count = 0;
        for(Integer i=0;i<resultList.size();i++){
            count = (int)(long) resultList.get(i).get("count");
        }
        return count;
    }

    @Override
    public void updateScore(Integer id, Integer sum) {
        String sql = "UPDATE public.score SET money=" + sum + " where id=" + id;
        bdconfig.update(sql);
    }


    @Override
    public List<Transaction> listTransaction() {
        String sql = "select * from public.\"Transaction\"";
        ArrayList<Transaction> score = new ArrayList<Transaction>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer idTran = (Integer) resultList.get(i).get("id");
            String type = (String) resultList.get(i).get("type");
            Integer receiver = (Integer) resultList.get(i).get("receiver");
            Integer sender = (Integer) resultList.get(i).get("sender");
            Integer money = (Integer) resultList.get(i).get("money");
            Date date_create = (Date) resultList.get(i).get("date_create");
            score.add(new Transaction(idTran, type, sender, receiver,  money, date_create));
        }
        return score;
    }

    @Override
    public Integer getCountTransaction() {
        String sql = "select count(*) from public.\"Transaction\"";
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        Integer count = 0;
        for(Integer i=0;i<resultList.size();i++){
            count = (int)(long) resultList.get(i).get("count");
        }
        return count;
    }

    @Override
    public List<Transaction> transactionsFrom(String name) {
        String getIdUser = "select id from public.\"Client\" where name = \'" + name +"\'";
        String getIdScore = "select id from public.\"score\" where user_id = (" + getIdUser + ")";
        String sql = "select * from public.\"Transaction\" where receiver in (" + getIdScore + ") or sender in (" + getIdScore +")";
        ArrayList<Transaction> score = new ArrayList<Transaction>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer idTran = (Integer) resultList.get(i).get("id");
            String type = (String) resultList.get(i).get("type");
            Integer receiver = (Integer) resultList.get(i).get("receiver");
            Integer sender = (Integer) resultList.get(i).get("sender");
            Integer money = (Integer) resultList.get(i).get("money");
            Date date_create = (Date) resultList.get(i).get("date_create");
            score.add(new Transaction(idTran, type, sender, receiver, money, date_create));
        }
        return score;
    }

    @Override
    public List<Transaction> transactionsBetween(String begin, String end) {
        String sql = "select * from public.\"Transaction\" where date_create between \'" + begin + "\' and \'" + end + "\'";
        ArrayList<Transaction> score = new ArrayList<Transaction>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer idTran = (Integer) resultList.get(i).get("id");
            String type = (String) resultList.get(i).get("type");
            Integer receiver = (Integer) resultList.get(i).get("receiver");
            Integer sender = (Integer) resultList.get(i).get("sender");
            Integer money = (Integer) resultList.get(i).get("money");
            Date date_create = (Date) resultList.get(i).get("date_create");
            score.add(new Transaction(idTran, type, sender, receiver,  money, date_create));
        }
        return score;
    }


    @Override
    public List<Transaction> transactionsFromBetween(String begin, String end, String name) {
        String getIdUser = "select id from public.\"Client\" where name = \'" + name +"\'";
        String getIdScore = "select id from public.\"score\" where user_id = (" + getIdUser + ")";
        String sql = "select * from public.\"Transaction\" where date_create between \'" + begin + "\' and \'" + end + "\'"
        + " and receiver in (" + getIdScore + ") or sender in (" + getIdScore +")";
        ArrayList<Transaction> score = new ArrayList<Transaction>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer idTran = (Integer) resultList.get(i).get("id");
            String type = (String) resultList.get(i).get("type");
            Integer receiver = (Integer) resultList.get(i).get("receiver");
            Integer sender = (Integer) resultList.get(i).get("sender");
            Integer money = (Integer) resultList.get(i).get("money");
            Date date_create = (Date) resultList.get(i).get("date_create");
            score.add(new Transaction(idTran, type, sender, receiver,  money, date_create));
        }
        return score;
    }
}
