// StatusBadge.js

function StatusBadge({ status }) {
  if (status === 'pending') {
    return <span className="badge badge-warning">{status}</span>;
  } else if (status === 'confirmed') {
    return <span className="badge badge-success text-white">{status}</span>;
  } else {
    return <span className="badge">{status}</span>;
  }
}

export default StatusBadge;
