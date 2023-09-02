import { IBoard } from "@/interfaces/BoardInterface";
import { Box, Button, Card, Slide, Typography } from "@mui/material";
import React, { useRef } from "react";

const ViewOnlyBoard = ({
  board,
  handleClose,
}: {
  board: IBoard;
  handleClose: () => void;
}) => {
  const containerRef = useRef(null);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: "url(../../board-bg.jpg)",
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
          in={!!board}
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
                variant="h3"
                fontWeight={600}
                color="#fff"
                textAlign="center"
              >
                {board?.displayName}
              </Typography>
              <Box textAlign="center" mt={4}>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => handleClose()}
                  sx={{ fontSize: 20 }}
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
