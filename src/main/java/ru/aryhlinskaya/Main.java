package ru.aryhlinskaya;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import ru.aryhlinskaya.config.ActionWithBD;
import ru.aryhlinskaya.config.BDConfig;

import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

public class Main {
    public static void main(String[] args) throws ClassNotFoundException, SQLException, ParseException {
        SpringApplication.run(Main.class, args);
        ActionWithBD action = new ActionWithBD();
        BDConfig bdconfig = new BDConfig();
        String getIdUser = "select id from public.\"Client\" where name = \'" + "Pavel" +"\'";
        String getIdScore = "select id from public.\"score\" where user_id = (" + getIdUser + ")";
        String sql = "select * from public.\"Transaction\" where date_create between \'" + "2020-05-23 00:00:00.0" + "\' and \'" + "2020-05-23 21:16:00.0" + "\'"
                + " and receiver in (" + getIdScore + ") or sender in (" + getIdScore +")";
        ArrayList<Transaction> score = new ArrayList<Transaction>();
        List<Map<String, Object>> resultList = bdconfig.query(sql);
        for(Integer i=0;i<resultList.size();i++){
            Integer idTran = (Integer) resultList.get(i).get("id");
            String type = (String) resultList.get(i).get("type");
            Integer receiver = (Integer) resultList.get(i).get("reciver");
            Integer sender = (Integer) resultList.get(i).get("sender");
            Integer money = (Integer) resultList.get(i).get("money");
            Date date_create = (Date) resultList.get(i).get("date_create");
            score.add(new Transaction(idTran, type, sender, receiver,  money, date_create));
        }
        System.out.println(action.getCountUser());
    }
}
