import { IBoard } from "@/interfaces/BoardInterface";
import { Box, Button, Card, Slide, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const ViewOnlyBoard = ({
  board,
  handleClose,
}: {
  board: IBoard;
  handleClose: () => void;
}) => {
  const containerRef = useRef(null);
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setPlayAnimation(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  });
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: "url(../../board-bg.jpg)",
        padding: "0 16px",
      }}
    >
      <Box
        sx={{
          height: "95%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={containerRef}
      >
        <Slide
          direction="up"
          in={playAnimation}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 800 }}
          container={containerRef.current}
        >
          <Card
            raised
            sx={{
              width: 600,
              maxWidth: 600,
              minHeight: 300,
              backgroundColor: "#8bbab3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              padding: 4,
            }}
          >
            <Box>
              <Typography
                fontWeight={600}
                color="#fff"
                textAlign="center"
                fontSize={{ xs: "30px", sm: "36px" }}
              >
                {board?.displayName}
              </Typography>
              <Box textAlign="center" mt={4}>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => handleClose()}
                  sx={{ fontSize: 18 }}
                >
                  View Kudoboard
                </Button>
              </Box>
            </Box>
          </Card>
        </Slide>
      </Box>
    </Box>
  );
};

export default ViewOnlyBoard;
