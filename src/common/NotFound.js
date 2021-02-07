import React from 'react';
import Typography from "@material-ui/core/Typography";

class NotFound extends React.Component {
    render() {
        return (
            <Typography
                variant="h1"
                align={"center"}
            > 404 Not Found
            </Typography>
        );
    }
}

export default NotFound;
