'use-strict';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};

export const getInfo = async () => {
  const response = await getUsers();

  const sortedTable = [...response].sort((user1, user2) =>
    user2.name.localeCompare(user1.name)
  );

  sortedTable.forEach(person => {

    const personString = document.getElementById("0");
    personString.insertAdjacentHTML('afterend',
      `<tr id="${person.id}">
        <td>${person.name}</td>
        <td>${person.username}</td>
        <td>${person.email}</td>
        <td>${person.website}</td>
      </tr>`
    );
  });
};
getInfo();

export const extraUserInfo = async () => {
  const response = await getUsers();

  [...response].forEach(person => {

    const { street, city, suite, zipcode, geo } = person.address;

    if (person.id) {
      const personInfo = document.getElementById(`${person.id}`);

      personInfo.onclick = () => alert(`
        Street: ${street}
        City: ${city}
        Suite: ${suite}
        Zipcode: ${zipcode}
        Geolocation:
          - latitude: ${geo.lat}
          - longitude: ${geo.lng}
      `);
    }
  })
};
extraUserInfo();
