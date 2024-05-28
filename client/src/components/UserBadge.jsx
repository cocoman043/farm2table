function UserBadge({ status }) {
    if (status === 'user') {
        return <span className="badge badge-warning">{status}</span>;
    } else if (status === 'admin') {
        return <span className="badge badge-success text-white">{status}</span>;
    } else {
        return <span className="badge">{status}</span>;
    }
}

export default UserBadge;
