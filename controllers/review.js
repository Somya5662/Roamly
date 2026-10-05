const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        console.log(newReview);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "New Review Created!");

        res.redirect(`/listings/${listing._id}`);
    };

module.exports.destroyReview = async (req, res) => {

        console.log("========== DELETE ROUTE HIT ==========");
        console.log("PARAMS:", req.params);

        let { id, reviewId } = req.params;
        console.log("DELETE PARAMS:", req.params);
        console.log("LISTING ID:", id);
        console.log("REVIEW ID:", reviewId);
        console.log("ID:", id);
        console.log("REVIEW ID:", reviewId);

        await Listing.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId }
        });

        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    };