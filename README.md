# Тестовое задание

## Что нужно для запуска:

- Java
- Maven
- Apache Tomcat
- intelliJ IDEA
- Node.js & npm

всё желательно последних версий

## Запуск:

**0** Клонировать репозиторий

```shell
git clone https://github.com/Keariph/Task.git
```

**1** Собрать бэкенд
```shell
mvn clean-package
```

**2** Поместить полученный `.war` в Apache Tomcat

**3** Запустить локально фронтенд

```shell
cd /front
npm install
npm start
```
Дев сервер запустится в `localhost:3000`

**4** Вы прекрасны