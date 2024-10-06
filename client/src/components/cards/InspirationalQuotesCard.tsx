import React from "react";
import { Button } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { Link } from "react-router-dom";
const InspirationalQuotesCard = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center mb-4">
        <FormatQuoteIcon style={{ fontSize: 40, color: "#4A90E2" }} />
        <h2 className="text-2xl font-bold ml-2 text-gray-900">
          Inspirational Quotes
        </h2>
      </div>
      <p className="mt-2 text-gray-700 italic">
        "The journey of a thousand miles begins with a single step."
      </p>
      <div className="flex items-center mt-4">
        <EmojiObjectsIcon style={{ fontSize: 30, color: "#FF9800" }} />
        <p className="ml-2 text-gray-600">
          Find motivation and encouragement to stay strong on your journey to
          recovery.
        </p>
      </div>

      <Link to="/qoutes" className="mt-4 w-full">
        <Button
          variant="contained"
          color="primary"
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 w-full"
        >
          Explore More Quotes
        </Button>
      </Link>
    </div>
  );
};

export default InspirationalQuotesCard;
