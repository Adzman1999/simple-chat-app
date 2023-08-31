import { Chip, Card } from "@mui/material";
import React, { Fragment } from "react";

const AddUserCard = ({ groupAdmin, userData }) => {
  return (
    <Fragment>
      <Card elevation={0} sx={{ background: "transparent" }}>
        <Chip
          className='main-text-color'
          label={
            groupAdmin.admin === userData._id
              ? `${userData.name} (Admin)`
              : `${userData.name}`
          }
          variant='outlined'
          sx={{
            width: 120,
            maxWidth: 120,
          }}
        />
      </Card>
    </Fragment>
  );
};

export default AddUserCard;
