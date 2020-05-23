function delay(callback) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(callback()), 1000);
  });
}

class Api {
  usersArray = [
    {
      name: 'Адам',
      age: 18,
    },
    {
      name: 'Eва',
      age: 18,
    },
    {
      name: 'Стасян Петрович',
      age: 44,
    },
    {
      name: 'Виктор Васильевич',
      age: 56,
    },
  ];
  scoresArray = [
    {
      user_id: 1,
      money: 666,
    },
    {
      user_id: 2,
      money: 6666,
    },
    {
      user_id: 3,
      money: 444321,
    },
    {
      user_id: 4,
      money: 1234,
    }
  ];

  users = {
    /**
     * user - объект: {
     *  name: строка,
     *  age: число
     * }
     */
    getAll: () => {
      const data = {
        users: this.usersArray.map((user, index) => ({
          id: index + 1,
          ...user,
        })),
      };
      return delay(() => data);
    },
    create: (user) => {
      return delay(() => {
        this.usersArray.push(user);
        return '200 OK';
      });
    },
  };
  scores = {
    /**
     * score - объект вида: {
     *  id: число,
     *  user_id: число,
     *  money: число
     * }
     */
    /**
     * userId - id пользователя, число
     */
    get: (userId) => {
      const data = {
        scores: this.scoresArray
          .filter((score) => score.user_id === userId)
          .map((score, index) =>({
            id: index + 1,
            ...score,
          })),
      };
      return delay(() => data);
    },
    create: (userId) => {
      return delay(() => {
        this.scoresArray.push({
          user_id: userId,
          money: 0,
        });
        return '200 OK';
      });
    }
  };
  /**
   * transactions - массив объектов вида: {
   *  id: строка,
   *  type: строка,
   *  date_create: строка, время создания в формате ISO
   *  sender: строка,
   *  receiver: строка,
   *  money: число,
   * }
   */

}

const $api = new Api();

export {
  $api,
};
