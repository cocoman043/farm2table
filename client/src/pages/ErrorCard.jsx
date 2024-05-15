function ErrorCard() {
  return (
    <>
      <div className="card bg-indigo-950 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">💀 404 Not Found</h2>
          <p>Please report this bug to the developers!</p>
          <a href="https://youtu.be/dQw4w9WgXcQ" className="btn">bugreport@farmtotable.org</a>
        </div>
      </div>
    </>
  );
}

export default ErrorCard;
