import React from "react";

const ListGroup = ({
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect,
}) => {
    return (
        <ul className="list-group">
            {items.map(item => (
                <li
                    key={item[valueProperty]}
                    className={
                        selectedItem._id === item._id
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    onClick={() => onItemSelect(item)}
                    style={{ cursor: "pointer" }}
                >
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
};

export default ListGroup;

// function getGroupClasses(current_genre, group_name) {
//     let classes = "list-group-item";
//     if (current_genre === group_name) classes += " active";
//     return classes;
// }
