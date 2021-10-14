import createElement from "./js/utils/createElement.js";

const fetchTopics = async () => {
  const topics = await (
    await fetch("http://localhost:3000/api/v1/topics")
  ).json();

  console.log(topics.data);
  if (topics.data.length > 0) {
    topics.data.forEach((element) => {
      console.log(element.title);
      const createdHeader = createElement("h3", null, null);
      createdHeader.textContent = element.title;
      document.getElementById("topics").appendChild(createdHeader);
    });
  }
};

export default fetchTopics;
