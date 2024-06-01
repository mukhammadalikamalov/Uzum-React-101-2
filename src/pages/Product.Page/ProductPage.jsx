import { Breadcrumbs, Grid, Link, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import SearchAppBar from "../../component/Layout/Header";
import GetGoods from "../../hooks/getGoods";

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = JSON.parse(searchParams.get("id"));
  const { Goods } = GetGoods();
  const myProd = Goods && Goods.find((good) => +good.id === id);

  const leftImages = myProd && myProd.media.slice(0, 3);
  const rightImage = myProd && myProd.media[1];

  return (
    <>
      <SearchAppBar />
      <Grid container spacing={2} pl={3} pt={3}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="/">
                Bosh sahifa
              </Link>
              <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                {myProd.type}
              </Link>
              <Typography>{myProd.title}</Typography>
            </Breadcrumbs>
          </Stack>
        </Grid>
        {/* Main Content */}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            {/* Left Side Images */}
            <Stack spacing={2}>
              {leftImages && leftImages.map((image, index) => (
                <img key={index} src={image} alt={myProd && myProd.title} style={{ width: "150px", height: "180px" }} />
              ))}
            </Stack>
            {/* Big Image */}
            {rightImage && (
              <img src={rightImage} alt={myProd && myProd.title} style={{ width: "600px", height: "700px" }} />
            )}
            {/* Rating */}
            <Stack>
              <Stack direction="row" alignItems="center">
                <Rating name="product-rating" value={myProd.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="textSecondary">
                  {myProd.rating.toFixed(1)} (501 baholar)
                </Typography>
              </Stack>
              {/* Title of Product */}
              <Typography variant="h5" style={{ paddingTop: "20px" }}>{myProd.title}</Typography>
              {/* Price of Product */}
              <Typography variant="h6">{myProd.price} so'm</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
