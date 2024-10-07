
import Book from '../models/Book.js';
import ErrorResponse from '../utils/errorResponse.js';
import upload from '../config/upload.js';
import User from '../models/User.js';




// Create Listing Endpoint with Multer Middleware
export const createBook = async (req, res, next) => {
  try {
    // Handle file upload
    upload.array('images', 6)(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      
      // Collect image URLs
      const imageUrls = req.files ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];

      // Create listing document
      const book = await Book.create({
        imageUrls,
        ...req.body
      }
      );

      return res.status(201).json(book);
    });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = (req, res) => {
  
  try {

    const imageUrls = req.files ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];
    res.json({ urls: imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};


export const deleteBook = async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse('book not found!', 404));
  }
  const admin = await User.findById(req.user.id)
  const isAdmin = admin.isAdmin


  if (req.user.id !== book.userRef && !isAdmin ) {
    return next(new ErrorResponse('You can only delete your own listings!', 401));
  }

  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorResponse('book not found!', 404));
  }
  const admin = await User.findById(req.user.id)
  const isAdmin = admin.isAdmin

  if (req.user.id !== book.userRef && !isAdmin) {
    return next(new ErrorResponse('You can only update your own listings!', 401));
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateBook);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new ErrorResponse('book not found!', 404));
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined) {
      offer = { $in: [false, true] };
    } else {
      offer = offer === 'true';
    }
    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const books = await Book.find({
      title: { $regex: searchTerm, $options: 'i' },
      offer,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      const totalPosts = await Book.countDocuments();

      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Book.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      return res.status(200).json({
        posts:books,
        totalPosts,
        lastMonthPosts,
      });

    // return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
