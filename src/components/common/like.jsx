import React from "react";

const Like = ({ liked, onClick }) => {
    let classes = "clickable fa fa-heart";
    classes += liked ? "" : "-o";

    return <i onClick={onClick} className={classes} arial-hidden="true"></i>;
};

export default Like;
