import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import login from "./server/routes/Login";
import roleRoutes from "./server/routes/RoleRoutes";
import userRoutes from "./server/routes/UserRoutes";
import feedRoutes from "./server/routes/FeedRoutes";
import channelRoutes from "./server/routes/ChannelRoutes";
import channelContactsRoutes from "./server/routes/ChannelContactsRoutes";
import channelMessagesRoutes from "./server/routes/ChannelMessagesRoutes";
import commentRoutes from "./server/routes/CommentRoutes";
import contactRoutes from "./server/routes/ContactRoutes";
import messageRoutes from "./server/routes/MessageRoutes";
import messageCommentsRoutes from "./server/routes/MessageCommentsRoutes";
import userFeedRoutes from "./server/routes/UserFeedRoutes";
import userChannelRoutes from "./server/routes/UserChannelRoutes";
import cors from "cors";

config.config();

const app = express();

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

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use("/api/v1/login", login);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/feeds", feedRoutes);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/channel-messages", channelMessagesRoutes);
app.use("/api/v1/channel-contacts", channelContactsRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/message-comments", messageCommentsRoutes);
app.use("/api/v1/user-feeds", userFeedRoutes);
app.use("/api/v1/user-channels", userChannelRoutes);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API."
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
