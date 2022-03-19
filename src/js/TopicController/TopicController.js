import postRequest from "../utils/postRequest";

class TopicController {
  constructor(topicModel, topicView, loginModel) {
    this.topicModel = topicModel;
    this.topicView = topicView;
    this.handleVote = this.handleVote.bind(this);
    this.loginModel = loginModel;
    this.fetchTopics();
    console.log(this.loggedInUser);
  }

  async fetchTopics() {
    console.log(this.loginModel.state.user);
    const topics = await (
      await fetch("http://localhost:3000/api/v1/topics")
    ).json();

    if (topics.data.length > 0) {
      this.topicModel.setTopics(topics.data);
      this.topicView.addTopics(this.topicModel.data.topics);
      this.topicView.bindVote(this.handleVote);
    }
  }
  async handleVote(e) {
    console.log(this.loggedInUser);
    const typeAndId = e.currentTarget.getAttribute("data-topicId").split("-");
    const type = typeAndId[0];
    const id = typeAndId[1];

    if (type && id) {
      const updatedTopic = await postRequest(
        `http://localhost:3000/api/v1/topics/${id}/${type}`,
        true,
        null
      );
      if (updatedTopic)
        this.topicView.updateVotes(
          id,
          updatedTopic.data.topic.votes.length,
          updatedTopic.data.topic.downvotes.length,
          updatedTopic.data.topic.votes.some(
            (voter) => voter._id === this.loginModel.state.user._id
          ),
          updatedTopic.data.topic.downvotes.some(
            (voter) => voter._id === this.loginModel.state.user._id
          )
        );
    }
  }
}

export default TopicController;
