const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

// try catch one
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);        
//     } catch (error) {
//         res.status(error.code || 404).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

export default asyncHandler;