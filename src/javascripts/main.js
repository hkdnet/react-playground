var React = require('react');
var converter = new Showdown.converter();
var dateFormat = require('dateformat');
var request = require('superagent');

var CommentHeader = React.createClass({
  render: function() {
    return (
      <div>
        <i className="fa fa-user" />
        <span className="author">{ this.props.author }</span>
      </div>
    )
  }
})
var CommentFooter = React.createClass({
  render: function() {
    return(
      <div className="commentFooter">
        <i className="fa fa-clock-o" />
        { dateFormat(this.props.postdate, "yyyy-mm-dd HH:MM") }
      </div>
    )
  }
})

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString())
    return (
      <div className="comment">
        <CommentHeader author={ this.props.author } />
        <div>
          <i className="fa fa-comment-o" />
          <div className="commentBody" dangerouslySetInnerHTML={{ __html: rawMarkup }} />
        </div>
        <CommentFooter postdate={ this.props.postdate } />
      </div>
    )
  }
});

var EditButton = React.createClass({
  handleClick: function(e) {
    console.log('edit is not implemented yet, sorry....')
  },
  render: function() {
    return(
      <button className="edit" onClick={ this.handleClick }>Edit</button>
    )
  }
})

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(c) {
      return (
        <Comment author={ c.author } postdate={ c.postdate }>
          { c.text }
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {comments}
      </div>
    )
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if(!author || !text) {
      return;
    }
    this.props.onCommentSubmit({author: author, text:text})
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={ this.handleSubmit }>
        <h2>New Comment</h2>
        <input type="text" ref="author" placeholder="name" /><br />
        <input type="text" ref="text" placeholder="say something..." />
        <input type="submit" value="Post" />
      </form>
    )
  }
});

var CommentBox = React.createClass({
  fetchComments: function() {
    return request.get(this.props.url);
  },
  loadCommentsFromServer: function() {
    this.fetchComments().end(function(err, res) {
        if (err) {
          console.log(err)
        } else {
          this.setState({data: res.body})
        }
      }.bind(this))
  },
  postComment: function(d) {
    return request.post(this.props.url).send(d)
  },
  handleCommentSubmit: function(d) {
    var s = this.state;
    s.data.push(d);
    this.setState(s);
    this.postComment(d).end(function(err, res) {
      if (err) {
        console.error(err)
      }
    })
  },
  getInitialState: function() {
    return { data: [] }
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.state.data }/>
        <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
      </div>
    )
  }
});

React.render(
  <CommentBox url="/comments" pollInterval={ 2000 } />,
  document.getElementById('content')
)
