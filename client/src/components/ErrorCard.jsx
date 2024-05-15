import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

function ErrorCard() {
  return (
    <>
      <div className="card bg-indigo-950 w-96 shadow-xl w-fit">
        <div className="card-body">
          <h2 className="card-title gap-8"><FontAwesomeIcon icon={faWarning} size="2xl" />404 Not Found</h2>
          <p>Please report this bug to the developers!</p>
          <a href="https://youtu.be/dQw4w9WgXcQ" className="btn">bugreport@farmtotable.org</a>
        </div>
      </div>
    </>
  );
}

export default ErrorCard;
