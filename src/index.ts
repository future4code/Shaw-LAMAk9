import { app } from "./controller/app";
import UserBusiness from "./business/UserBusiness";
import UserController from "./controller/UserController";
import UserData from "./data/UserData";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";
import BandController from "./controller/BandController";
import BandBusiness from "./business/BandBusiness";
import BandData from "./data/BandData";

const userController = new UserController(
  new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
  )
)

const bandController = new BandController(
  new BandBusiness(
    new BandData(),
    new UserData(),
    new IdGenerator(),
    new Authenticator()
  )
)

app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.post("/bands/register", bandController.register)
app.get("/bands", bandController.getBandByIdOrName)
