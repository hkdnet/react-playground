var React = require('react');
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! Iam a CommentBox.
      </div>
    );
  }
})

React.render(
  <CommentBox />,
  document.getElementById('content')
)
