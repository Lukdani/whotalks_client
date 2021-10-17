import axios from "axios";
import postRequest from "../utils/postRequest";

class TopicController {
  constructor(topicModel, topicView) {
    this.topicModel = topicModel;
    this.topicView = topicView;
    this.handleVote = this.handleVote.bind(this);
    this.fetchTopics();
  }

  async fetchTopics() {
    const topics = await (
      await fetch("http://localhost:3000/api/v1/topics")
    ).json();

    if (topics.data.length > 0) {
      console.log(topics.data);
      this.topicModel.setTopics(topics.data);
      this.topicView.addTopics(this.topicModel.data.topics);
      this.topicView.bindVote(this.handleVote);
    }
  }
  async handleVote(e) {
    const typeAndId = e.currentTarget.getAttribute("data-topicId").split("-");
    const type = typeAndId[0];
    const id = typeAndId[1];

    if (type && id) {
      const updatedTopic = await postRequest(
        `http://localhost:3000/api/v1/topics/${id}/${type}`,
        true,
        null
      );
      console.log(updatedTopic);
      if (updatedTopic)
        this.topicView.updateVotes(
          id,
          updatedTopic.data.data.topic.votes.length,
          updatedTopic.data.data.topic.downvotes.length
        );
    }
  }
}

export default TopicController;
