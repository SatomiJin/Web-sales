import "./LikeButton.css";

function LikeButton(props) {
  const { dataHref = "sales.schwarzerritter.tech" } = props;
  return (
    <div className="fb-like-container">
      <div
        class="fb-like"
        data-href="https://sales.schwarzerritter.tech/"
        data-width=""
        data-layout=""
        data-action=""
        data-size=""
        data-share="true"
      ></div>
    </div>
  );
}

export default LikeButton;
