function Comments(props) {
  const { dataHref, width, numPosts = 5 } = props;
  return (
    <div className="fb-comments-container">
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts={numPosts}></div>
    </div>
  );
}

export default Comments;
