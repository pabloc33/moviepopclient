import { Badge } from "@material-ui/core";
import { unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./singleContent.css";

const SingleContent = ({ id, poster, title, date, type, avarege }) => {
  return (
    <ContentModal id={id}>
      <Badge
        badgeContent={avarege}
        color={avarege > 6 ? "primary" : "secondary"}
      />
      <img className="poster" src={poster || unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className="subTitle">
        {type}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
