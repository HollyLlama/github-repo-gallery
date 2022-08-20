//global variables
//where profile information will appear
const overview = document.querySelector(".overview");
const username = "hollyllama";
//var to select the unordered list to display repos
const reposList = document.querySelector(".repo-list");

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
  getRepos();
};



//function to fetch my repos
const getRepos = async function () {
  const resp = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`); //sort by recently updated and limit to 100 per page
  const repos = await resp.json();
  displayRepoInfo(repos);
};

//function to display my repos
const displayRepoInfo = function(repos) {
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `
    <h3>${repo.name}</h3>`;
    reposList.append(li);
  }
}


