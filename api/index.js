import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import roleRoutes from "./server/routes/RoleRoutes";
import userRoutes from "./server/routes/UserRoutes";
import feedRoutes from "./server/routes/FeedRoutes";
import channelRoutes from "./server/routes/ChannelRoutes";
import contactRoutes from "./server/routes/ContactRoutes";

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/feeds", feedRoutes);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/contacts", contactRoutes);

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
