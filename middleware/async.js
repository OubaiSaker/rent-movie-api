module.exports = function (controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        }
        catch (error) {
            next(error);
        }
    }
}

// module.exports = function (handler) {
//     return async (req, res, next) => {
//         try {
//             await handler(req, res);
//         }
//         catch (ex) {
//             next(ex);
//         }
//     }
// };