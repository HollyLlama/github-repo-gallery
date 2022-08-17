//where profile information will appear
const overview = document.querySelector(".overview");
const username = "hollyllama";

//function to fetch my user data
const getUserInfo = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const info = await res.json();
  displayUserInfo(info);
};

getUserInfo();

//function to display my user data on the screen
const displayUserInfo = function (info) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
  <figure>
    <img alt="user avatar" src=${info.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${info.name}</p>
    <p><strong>Bio:</strong> ${info.bio}</p>
    <p><strong>Location:</strong> ${info.location}</p>
    <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
  </div> `;
  overview.append(div);
};