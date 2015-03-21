var React = require('React');
var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString())
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          { this.props.author }
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(c) {
      return (
        <Comment author={c.author}>{c.text}</Comment>
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
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    )
  }
});

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.props.data }/>
        <CommentForm />
      </div>
    )
  }
});

var data = [
  {"author":"Nico Yazawa","text":"Nico nico nii~"},
  {"author":"Aoba Suzukaze","text":"zoi"}
];

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
)
