import { $api } from './fakeApi';

const apiUrl = 'http://localhost:8080/Task';

/**
 * Ф-ия возращает объект класса URL с прописанными query параметрами
 * @param {*} url url строкой
 * @param {*} query объект вида {
 *  queryParam1: значение1,
 *  queryParam2: значение2,
 *  ...
 * }
 * необязательный параметр
 */
function getUrlWithQuery(url, query) {
  const result = new URL(url);
  if (typeof query === 'object') {
    Object.entries(query)
      .forEach(
        ([key, value]) => value && result.searchParams.append(key, `${value}`),
      );
  }
  return result;
}

class Api {
  users = {
    /**
     * user - объект: {
     *  name: строка,
     *  age: число
     * }
     */
    getAll: () => {
      return fetch(`${apiUrl}/users`, {
        mode: 'cors',
      }).then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response.json();
      });
    },
    create: (user) => {
      return fetch(`${apiUrl}/users`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response;
      });;
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
      return fetch(`${apiUrl}/scores?user_id=${userId}`, {
        mode: 'cors',
      }).then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response.json();
      });
    },
    create: (userId) => {
      return fetch(`${apiUrl}/scores?user_id=${userId}`, {
        mode: 'cors',
        method: 'POST',
      }).then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response;
      });;
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
  transactions = {
    /**
     * необязательный параметр
     * @param {*} query объект вида: {
     *  begin: дата начала,
     *  end: дата окончания,
     *  name: имя клиента, необязательный
     * }
     */
    lookup: (query) => {
      const url = getUrlWithQuery(`${apiUrl}/transactions`, query);
      return fetch(url.toString(), {
        mode: 'cors',
      }).then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response.json();
      });
    },
    /**
     * @param {*} query объект вида: {
     *  type: 'accrual' | 'write_off' | 'transfer',
     *  каких-то полей может не быть в зависимости от типа
     *  sender: число, id счёта отправителя,
     *  receiver: число, id счёта получателя,
     *  money: число, деньги
     * }
     */
    create: (query) => {
      return fetch(`${apiUrl}/transactions`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      }).then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response;
      });
    },
  };
}

let api = new Api();

// раскомментировать чтобы использовать фейковое апи
// api = $api;

// положим ссылку на инстанс класса в глобальный объект window для дебаггинга в консоли браузера
window.api = api;

export {
  api,
};
