import createElement from "../utils/createElement";

class TopicView {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  addTopics(topics) {
    if (topics && topics.length > 0) {
      topics.forEach((topicElement) => {
        // CONTAINER
        const topicContainer = createElement(
          "div",
          ["topicContainer", "row"],
          null
        );
        topicContainer.setAttribute("data-topic", topicElement._id);
        this.rootElement.appendChild(topicContainer);

        // HEADER
        const topicHeader = createElement("h2", ["col-12"], null);
        topicHeader.textContent = topicElement.title;
        topicContainer.appendChild(topicHeader);

        // BODY
        const topicDescription = createElement("p", ["col-12"], null);
        topicDescription.textContent = topicElement.description;

        topicContainer.appendChild(topicDescription);

        // ARGUMENTS;
        const topicArguments = createElement(
          "div",
          ["topic-arguments-container", "row"],
          null
        );
        topicContainer.appendChild(topicArguments);

        const argumentsFor = createElement("div", [
          "topic-arguments",
          "topic-arguments-for",
          "col-12",
          "col-lg-6",
        ]);
        if (topicElement.argumentsFor && topicElement.argumentsFor.length > 0) {
          this.renderArguments(topicElement.argumentsFor, argumentsFor, "for");
        }
        topicArguments.appendChild(argumentsFor);

        // PERSPECTIVE;
        const argumentsAgainst = createElement("div", [
          "topic-arguments",
          "topic-arguments-against",
          "col-12",
          "col-lg-6",
        ]);
        if (
          topicElement.argumentsAgainst &&
          topicElement.argumentsAgainst.length > 0
        ) {
          this.renderArguments(
            topicElement.argumentsAgainst,
            argumentsAgainst,
            "against"
          );
        }
        topicArguments.appendChild(argumentsAgainst);

        const perspective = createElement(
          "p",
          ["topic-perspective", "col-12"],
          null
        );
        perspective.textContent = topicElement.perspective;
        topicContainer.appendChild(perspective);

        // VOTES
        const votesContainer = createElement("div", ["votes-container"], null);
        topicContainer.appendChild(votesContainer);
        this.renderVotes(
          topicElement.votes.length,
          votesContainer,
          "vote",
          topicElement._id
        );

        this.renderVotes(
          topicElement.downvotes.length,
          votesContainer,
          "downvote",
          topicElement._id
        );
      });
    }
  }

  renderArguments(passedArguments, containerElement, type) {
    const argumentsUl = createElement("ul", ["topic-argument-list"], null);
    containerElement.appendChild(argumentsUl);

    passedArguments.forEach((argumentElement) => {
      const argumentIcon = createElement(
        "i",
        [
          `${type === "for" ? "for" : "against"}`,
          "fas",
          `fa-${type === "for" ? "smile-beam" : "sad-cry"}`,
        ],
        null
      );
      const argument = createElement("li", ["topic-argument-item"], null);
      const textContent = createElement("span", null, null);
      textContent.textContent = argumentElement;
      argumentsUl.appendChild(argument);
      argument.appendChild(argumentIcon);
      argument.appendChild(textContent);
    });
  }

  renderVotes(numberOfVotes, containerElement, type, topicId) {
    const votesItemButton = createElement(
      "button",
      ["votes-item-button", "btn", "btn-transparent"],
      null
    );
    votesItemButton.setAttribute("data-topicId", `${type}-${topicId}`);
    containerElement.appendChild(votesItemButton);

    const votesIcon = createElement(
      "i",
      [
        `${type === "vote" ? "vote" : "downvote"}`,
        "fas",
        `fa-thumbs-${type === "vote" ? "up" : "down"}`,
      ],
      null
    );
    votesItemButton.appendChild(votesIcon);

    const voteCount = createElement("span", null, null);
    voteCount.textContent = numberOfVotes;

    votesItemButton.appendChild(votesIcon);
    votesItemButton.appendChild(voteCount);
  }

  updateVotes(topicId, votesNumber, downvotesNumber, hasVoted, hasDownVoted) {
    // VOTE
    const votesCounter = document.querySelector(
      `button[data-topicId='vote-${topicId}'] span`
    );
    if (votesCounter) {
      votesCounter.textContent = votesNumber;
      if (hasVoted) {
        if (hasDownVoted) votesCounter.classList.add("active");
      }
    }
    // DOWNVOTE
    const downvotesCounter = document.querySelector(
      `button[data-topicId='downvote-${topicId}'] span`
    );
    if (downvotesCounter) {
      downvotesCounter.textContent = downvotesNumber;
    }

    this.updateVoteButtonActiveState(topicId, hasVoted, hasDownVoted);
  }

  updateVoteButtonActiveState(topicId, hasVoted, hasDownVoted) {
    console.log(hasVoted);
    // VOTE;
    const voteButton = document.querySelector(
      `button[data-topicId='vote-${topicId}']`
    );
    if (hasVoted) {
      !voteButton.classList.contains("active") &&
        !voteButton.classList.add("active");
    } else if (!hasVoted) {
      voteButton.classList.remove("active");
    }

    // DOWNVOTE;
    const downvoteButton = document.querySelector(
      `button[data-topicId='downvote-${topicId}']`
    );
    if (hasDownVoted) {
      !downvoteButton.classList.contains("active") &&
        !downvoteButton.classList.add("active");
    } else if (!hasDownVoted) {
      downvoteButton.classList.remove("active");
    }
  }

  bindVote(callback) {
    const voteButtons = document.querySelectorAll(".votes-item-button");
    if (voteButtons.length > 0 && callback) {
      voteButtons.forEach((voteButtonElement) => {
        voteButtonElement.addEventListener("click", callback);
      });
    }
  }
}

export default TopicView;
