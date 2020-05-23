package ru.aryhlinskaya.config;


import org.springframework.web.bind.annotation.*;
import ru.aryhlinskaya.Score;
import ru.aryhlinskaya.Transaction;
import ru.aryhlinskaya.User;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class WebConfig {

    ActionWithBD action = new ActionWithBD();

    @RequestMapping(value = "/user", produces = "application/json", method = RequestMethod.GET)
    public String getUser() {
        User user = action.getUser(1);
        return user.toString();
    }

    @GetMapping(value = "/users", produces = "application/json")
    public String getListUsers() {
        List<User> users = action.listUser();
        String str = "";
        if (users.size() > 0) {
            for (Integer i = 0; i < users.size() - 1; i++) {
                str += users.get(i).toString() + ",";
            }
            str += users.get(users.size() - 1);
            return "{\"users\": [ " + str + "]}";
        }
        return "{\"users\";[]}";
    }

    @PostMapping(value = "/users")
    public void addUser(@RequestBody User user) {
        Integer id = (Integer) action.getCountUser();
        action.createUser(id + 1, user.getName(), user.getAge());
    }

    @GetMapping(value = "/scores", produces = "application/json")
    public String getScore(@RequestParam("user_id") Integer id) {
        List<Score> scores = action.listScore(id);
        String str = "";
        if (scores.size() > 0) {
            for (Integer i = 0; i < scores.size() - 1; i++) {
                str += scores.get(i).toString() + ",";
            }
            str += scores.get(scores.size() - 1);
            return "{\"scores\": [ " + str + "]}";
        }
        return "{\"scores\":[]}";
    }

    @PostMapping(value = "/scores", produces = "application/json")
    public void addScore(@RequestParam("user_id") Integer user_id) {
        Integer id = (Integer) action.getCountScore();
        Integer sum = 0;
        action.createScore(id + 1, user_id, sum);
    }

    @GetMapping(value = "/transactions", produces = "application/json")
    public String getTransaction() {
        List<Transaction> transactions = action.listTransaction();
        String str = "";
        if (transactions.size() > 0) {
            for (Integer i = 0; i < transactions.size() - 1; i++) {
                str += transactions.get(i).toString() + ",";
            }
            str += transactions.get(transactions.size() - 1);
            return "{\"transactions\": [ " + str + "]}";
        }
        return "{\"transactions\":[]}";
    }

    @GetMapping(value = "/transactions", produces = "application/json", params = {"name"})
    public String getTransactions(@RequestParam String name) {
        List<Transaction> transactions = action.transactionsFrom(name);
        String str = "";
        if (transactions.size() > 0) {
            for (Integer i = 0; i < transactions.size() - 1; i++) {
                str += transactions.get(i).toString() + ",";
            }
            str += transactions.get(transactions.size() - 1);
            return "{\"transactions\": [ " + str + "]}";
        }
        return "{\"transactions\":[]}";
    }

    @GetMapping(value = "/transactions", produces = "application/json", params = {"begin", "end"})
    public String getTransactions(@RequestParam String begin, @RequestParam String end) {
        List<Transaction> transactions = action.transactionsBetween(begin, end);
        String str = "";
        if (transactions.size() > 0) {
            for (Integer i = 0; i < transactions.size() - 1; i++) {
                str += transactions.get(i).toString() + ",";
            }
            str += transactions.get(transactions.size() - 1);
            return "{\"transactions\": [ " + str + "]}";
        }
        return "{\"transactions\":[]}";
    }

    @GetMapping(value = "/transactions", produces = "application/json", params = {"name", "begin", "end"})
    public String getTransactions(@RequestParam String name, @RequestParam String begin, @RequestParam String end) {
        List<Transaction> transactions = action.transactionsFromBetween(begin, end, name);
        String str = "";
        if (transactions.size() > 0) {
            for (Integer i = 0; i < transactions.size() - 1; i++) {
                str += transactions.get(i).toString() + ",";
            }
            str += transactions.get(transactions.size() - 1);
            return "{\"transactions\": [ " + str + "]}";
        }
        return "{\"transactions\":[]}";
    }

    @PostMapping(value = "/transactions", produces = "application/json")
    public void addTransaction(@RequestBody Transaction transaction) {
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
        format.setTimeZone(tz);
        String str = format.format(new Date());
        switch (transaction.getType()) {
            case "accrual": {
                if (action.getScore(transaction.getReceiver()) != null) {
                Integer sum = action.getSumScore(transaction.getReceiver());
                action.updateScore(transaction.getReceiver(), sum + transaction.getMoney());
                Integer id =  action.getCountTransaction() + 1;
                String date_create = str;
                action.createTransaction(id, transaction.getType(),
                        transaction.getSender(), transaction.getReceiver(), transaction.getMoney(), format.format(new Date()));
                }
                break;
            }
            case "write_off": {
                if (action.getScore(transaction.getSender()) != null) {
                    Integer sum = action.getSumScore(transaction.getSender());
                    action.updateScore(transaction.getSender(), sum - transaction.getMoney());
                    Integer id = (Integer) action.getCountTransaction() + 1;
                    String date_create = str;
                    action.createTransaction(id, transaction.getType(),
                            transaction.getSender(), transaction.getReceiver(), transaction.getMoney(), date_create);
                }
                break;
            }
            case "transfer": {
                if (action.getScore(transaction.getSender()) != null && action.getScore(transaction.getReceiver()) != null) {
                    Integer sum = action.getSumScore(transaction.getSender());
                    action.updateScore(transaction.getSender(), sum - transaction.getMoney());
                    sum = action.getSumScore(transaction.getReceiver());
                    action.updateScore(transaction.getReceiver(), sum + transaction.getMoney());
                    Integer id = (Integer) action.getCountTransaction() + 1;
                    String date_create = str;
                    action.createTransaction(id, transaction.getType(),
                            transaction.getSender(), transaction.getReceiver(), transaction.getMoney(), date_create);
                }
                break;
            }
        }

    }
}

