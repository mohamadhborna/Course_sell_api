const {Router} = require("express");

const homeController = require("../../controllers/api/v1/homeController");
const adminCourseController = require("../../controllers/api/v1/admin/courseController");
const adminEpisodeController = require("../../controllers/api/v1/admin/episodeController");
const courseController = require("../../controllers/api/v1/courseController")
const authController = require("../../controllers/api/v1/authController");
const userController = require("../../controllers/api/v1/userController");

const apiAuth = require("./middlewares/apiAuth")
const {uploadImage} = require("./middlewares/uploadMiddleWare")
const router = new Router();

router.get("/" , homeController.index);
router.get("/courses" , courseController.index.bind(courseController));

router.post("/register" , authController.register.bind(authController));
router.post("/login" , authController.login.bind(authController));

router.get("/users" , apiAuth,userController.index.bind(userController));
router.post("/users/image" ,uploadImage.single('image'),userController.uploadImage.bind(userController))

























const adminRouter = new Router();
adminRouter.get('/courses' , adminCourseController.getAllCourses.bind(adminCourseController));
adminRouter.get('/courses/:id' ,adminCourseController.getCourseById.bind(adminCourseController));
adminRouter.post("/courses" , adminCourseController.createCourse.bind(adminCourseController));
adminRouter.put("/courses/:id" , adminCourseController.updateCourse.bind(adminCourseController));
adminRouter.delete("/courses/:id" ,adminCourseController.deleteCourse.bind(adminCourseController));

adminRouter.get('/episodes',adminEpisodeController.getAllEpisodes.bind(adminEpisodeController));
adminRouter.get('/episodes/:id',adminEpisodeController.getEpisodeById.bind(adminEpisodeController));
adminRouter.post('/episodes',adminEpisodeController.createEpisode.bind(adminEpisodeController));
adminRouter.put('/episodes/:id' , adminEpisodeController.updateEpisode.bind(adminEpisodeController));
adminRouter.delete('/episodes/:id',adminEpisodeController.deleteEpisode.bind(adminEpisodeController));

router.use('/admin' , adminRouter);

module.exports =  router