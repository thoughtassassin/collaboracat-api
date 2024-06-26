import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import login from "./server/routes/Login";
import feedRoutes from "./server/routes/FeedRoutes";
import channelRoutes from "./server/routes/ChannelRoutes";
import channelContactsRoutes from "./server/routes/ChannelContactsRoutes";
import channelMessagesRoutes from "./server/routes/ChannelMessagesRoutes";
import channelUsersRoutes from "./server/routes/ChannelUsersRoutes";
import commentRoutes from "./server/routes/CommentRoutes";
import contactRoutes from "./server/routes/ContactRoutes";
import messagesByUserRoutes from "./server/routes/messagesByUserRoutes";
import messageRoutes from "./server/routes/MessageRoutes";
import messageCommentsRoutes from "./server/routes/MessageCommentsRoutes";
import notificationRoutes from "./server/routes/NotificationRoutes";
import pdfReportRoutes from "./server/routes/PDFReportRoutes";
import providerRoutes from "./server/routes/ProviderRoutes";
import rateLimit from "express-rate-limit";
import reportRoutes from "./server/routes/ReportRoutes";
import requestChannelRoutes from "./server/routes/RequestChannelRoutes";
import resetPasswordRoutes from "./server/routes/ResetPasswordRoutes";
import roleRoutes from "./server/routes/RoleRoutes";
import userFeedRoutes from "./server/routes/UserFeedRoutes";
import userChannelRoutes from "./server/routes/UserChannelRoutes";
import userMessagesRoutes from "./server/routes/UserMessagesRoutes";
import userRoutes from "./server/routes/UserRoutes";
import warehouseRoutes from "./server/routes/WarehouseRoutes";
import xss from "xss-clean";
import cors from "cors";

config.config();

const app = express();

// Force https
app.enable("trust proxy"); //needed if you're behind a load balancer
app.use(function (req, res, next) {
  if (req.secure) {
    return next();
  }
  res.redirect("https://" + req.headers.host + req.url);
});

/*
  var whitelist = ["http://localhost:0000", "http://example2.com"];
  var corsOptions = {
  origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  };
 */

// limit body payload
app.use(express.json({ limit: "10kb" }));

// rate limit
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: "Too many requests", // message to send
});
app.use(limit);

app.use(cors());
app.options("*", cors());
app.use(xss());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use("/api/v1/login", login);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/channel-messages", channelMessagesRoutes);
app.use("/api/v1/channel-contacts", channelContactsRoutes);
app.use("/api/v1/channel-users", channelUsersRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/feeds", feedRoutes);
app.use("/api/v1/messages-by-user", messagesByUserRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/message-comments", messageCommentsRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/pdfreports", pdfReportRoutes);
app.use("/api/v1/providers", providerRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/reset-password", resetPasswordRoutes);
app.use("/api/v1/request-channel", requestChannelRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/user-channels", userChannelRoutes);
app.use("/api/v1/user-feeds", userFeedRoutes);
app.use("/api/v1/user-messages", userMessagesRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/warehouses", warehouseRoutes);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
