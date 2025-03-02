import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewComponent.scss";
import SkeletonLoader from "../../hooks/skeletonloader/skeletonloader";

interface Review {
  _id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  images?: Array<{ data: string; contentType: string }>; // Array of images with base64 encoded data
}

const ReviewComponent: React.FC<{ productId: string; userId: string; username: string; isShopkeeper: boolean }> = ({ productId, userId, username, isShopkeeper }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // To hold image previews
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For fullscreen image
  const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen mode
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission loading state
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion loading state
  const [imagePosition, setImagePosition] = useState<{ top: number; left: number } | null>(null); // Position of the clicked image

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://vk-electronics-backend.onrender.com/reviews?productId=${productId}`);
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load Reviews. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return alert("Please add a rating and comment.");

    setIsSubmitting(true); // Start loading state
    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("comment", comment);
    formData.append("productId", productId);
    formData.append("userId", userId);
    formData.append("username", username);
    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post("https://vk-electronics-backend.onrender.com/reviews", formData);
      fetchReviews();
      setRating(0);
      setComment("");
      setImages([]);
      setImagePreviews([]); // Clear previews after upload
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false); // Stop loading state
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          setImagePreviews([...previews]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDelete = async (reviewId: string) => {
    setIsDeleting(true); // Start loading state

    if (!isShopkeeper) {
      const reviewToDelete = reviews.find((review) => review._id === reviewId);
      if (reviewToDelete && reviewToDelete.userId !== userId) {
        setIsDeleting(false); // Hide loading if user is trying to delete someone else's review
        return alert("You can only delete your own reviews.");
      }
    }

    try {
      await axios.delete(`https://vk-electronics-backend.onrender.com/reviews/${reviewId}`);
      fetchReviews(); // Refresh the reviews list after successful deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setIsDeleting(false); // Stop loading state
    }
  };

  const openFullscreenImage = (image: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    setImagePosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const closeFullscreenImage = () => {
    setSelectedImage(null);
    setIsFullscreen(false);
  };


  return (
    <div className="review-container">
      <h2>Customer Reviews</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={rating >= star ? "filled" : ""} onClick={() => setRating(star)}>
              ★
            </span>
          ))}
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="image-preview"
                onClick={(e) => openFullscreenImage(preview, e)} // Open image in fullscreen on click
              />
            ))}
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {loading && <SkeletonLoader variant="gadget" items={8} />}
      {error && <p className="error">{error}</p>}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review._id} className="review-item">
            <h4>{review.username}</h4>
            <div className="star-rating">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p>{review.comment}</p>

            <div className="review-images">
              {review.images && review.images.length > 0 ? (
                review.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.data}
                    alt={`Review image ${index + 1}`}
                    className="Review-image"
                    onClick={(e) => openFullscreenImage(img.data, e)} // Open image in fullscreen on click
                  />
                ))
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>

            {(userId === review.userId || isShopkeeper) && (
              <button onClick={() => handleDelete(review._id)} className="delete-btn" disabled={isDeleting}>
                {isDeleting ? "Processing..." : "Delete Review"}
              </button>
            )}
          </div>
        ))}
      </div>

      {isFullscreen && selectedImage && imagePosition && (
        <div className="fullscreen-modal">
          <div className="blur-background" onClick={closeFullscreenImage}></div>
          <div
            className="fullscreen-image-container"
            style={{
              top: `${imagePosition.top}px`,  // Position the modal just above the clicked image
              left: `${imagePosition.left}px`, // Position horizontally where clicked image was
            }}
          >
            <img src={selectedImage} alt="Fullscreen view" className="fullscreen-image" />
            {/* <button onClick={closeFullscreenImage} className="close-btn">✖</button> */}
          </div>
        </div>
      )}

    </div>
  );
};

export default ReviewComponent;
