import { Card, Skeleton } from "@mui/material";
import React, { Fragment } from "react";

const SearchSkeleton = () => {
  return (
    <Fragment>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
      <Card elevation={4} sx={{ borderRadius: 10 }}>
        <Skeleton
          variant='rounded'
          sx={{ width: 240, borderRadius: 10 }}
          height={55}
        />
      </Card>
    </Fragment>
  );
};

export default SearchSkeleton;
