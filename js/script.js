//global variables
//where profile information will appear
const overview = document.querySelector(".overview");
const username = "hollyllama";
//var to select the unordered list to display repos
const reposList = document.querySelector(".repo-list");
//repos section
const repoSection = document.querySelector(".repos");
//repo data section
const repoDataSection = document.querySelector(".repo-data");

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

//click event for each repo
reposList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getSpecificRepoData(repoName);
  }
});

//function to fetch specific repo data
const getSpecificRepoData = async function (repoName) {
  const respo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); //pull info on specific repo
  const repoInfo = await respo.json();
  console.log(repoInfo);
  //languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  //put all the languages into an array
  for (let key in languageData) {
    languages.push(key);
    console.log(languages);
  }

  displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
  repoDataSection.innerHTML= "";
  const div = document.createElement("div");
  div.innerHTML = 
  `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
  repoDataSection.append(div);
  repoDataSection.classList.remove("hide");
  repoSection.classList.add("hide");
}
