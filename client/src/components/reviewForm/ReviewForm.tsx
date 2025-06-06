
import { useState } from "react";
import axios from "axios";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";

interface ReviewFormProps {
  imdbID: string;
  movieTitle: string;
  onReviewSubmit: () => void;
}

const ReviewForm = ({ imdbID, movieTitle, onReviewSubmit }: ReviewFormProps) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/reviews`, {
        imdbID,
        movie: movieTitle,
        user,
        rating,
        comment,
      });

      setUser('');
      setRating(null);
      setComment('');
      onReviewSubmit();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#1e1e1e",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600,
        width: "100%",
        margin: "0 auto",
        color: "white"
      }}
    >
      <Typography variant="h6" mb={2}>Leave a Review</Typography>

      <TextField
        placeholder="Your Name"
        fullWidth
        value={user}
        onChange={(e) => setUser(e.target.value)}
        sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
      />

      <Rating
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        sx={{
          mb: 2,
          color: "#FFD700",
          "& .MuiRating-iconEmpty": {
            color: "#CCCCCC"
          }
        }}
      />

      <TextField
        placeholder="Your Review"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!user || !rating || comment.trim() === ""}
        fullWidth
        sx={{
          bgcolor: "#007BFF",
          color: "white",
          "&:hover": {
            bgcolor: "#0056b3"
          },
          "&.Mui-disabled": {
            bgcolor: "#007BFF",
            color: "white",
            opacity: 0.6,
          }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ReviewForm;
