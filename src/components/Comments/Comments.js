function Comments(props) {
  const { dataHref, width } = props;
  return (
    <div className="fb-comments-container">
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts={5}></div>
    </div>
  );
}

export default Comments;
