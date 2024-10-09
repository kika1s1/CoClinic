import dotenv from "dotenv";
import ErrorResponse from "../utils/errorResponse.js";
dotenv.config();

export const aiChat = async (req, res, next) => {
  const personalMesssage = "Give me General advice and tell me what measure i should take to prevent it from happening again do i need to talk to doctor or take any medication I know you are not a doctor but i need your help to get me through this situation please help me out with this";
  const { message } = req.body;

  if (!message) {
    return next(new ErrorResponse("Please provide a message", 400));    
  }

  // Create the payload for the Gemini API
  const payload = {
    contents: [
      {
        parts: [{ text: personalMesssage + " " +message }],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    // console.log(response)
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const aiMessage = data?.candidates[0]?.content.parts[0]?.text || "No response from AI.";
   


    const finalResponse = {
      userMessage: message,
      aiResponse: aiMessage,
      timestamp: new Date(),
    };

    res.json(finalResponse);
  } catch (error) {
    next(error);
  }
};
